import { eq } from "drizzle-orm";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import { getDbClient } from "@/lib/db";
import { productFaqs, productSpecifications, products } from "@/db/schema";
import {
  cleanFaqs,
  cleanSpecifications,
  createRelatedRows,
} from "../helpers";

export async function updateProductService(productId, payload) {
  const db = getDbClient();
  if (!db) {
    throw new Error("Database is not configured. Product management is unavailable.");
  }

  const {
    name,
    description,
    categorySlug,
    imageFileUri,
    faqs = [],
    specifications = [],
  } = payload;

  const [existing] = await db
    .select()
    .from(products)
    .where(eq(products.id, productId))
    .limit(1);

  if (!existing) {
    throw new Error("Product not found.");
  }

  let imageUrl = existing.imageUrl;
  let imagePublicId = existing.imagePublicId;

  if (imageFileUri?.startsWith("data:image")) {
    const upload = await uploadToCloudinary(imageFileUri);
    if (!upload.success) {
      throw new Error(upload.error || "Image upload failed.");
    }
    if (imagePublicId) {
      await deleteFromCloudinary(imagePublicId).catch(() => {});
    }
    imageUrl = upload.url;
    imagePublicId = upload.publicId;
  }

  const faqRows = createRelatedRows(cleanFaqs(faqs), productId, ["question", "answer"]);
  const specificationRows = createRelatedRows(cleanSpecifications(specifications), productId, [
    "property",
    "value",
  ]);

  await db.transaction(async (tx) => {
    await tx.delete(productFaqs).where(eq(productFaqs.productId, productId));
    await tx
      .delete(productSpecifications)
      .where(eq(productSpecifications.productId, productId));
    await tx
      .update(products)
      .set({
        name: name.trim(),
        categorySlug,
        description,
        imageUrl,
        imagePublicId,
        updatedAt: new Date(),
      })
      .where(eq(products.id, productId));

    if (faqRows.length) {
      await tx.insert(productFaqs).values(faqRows);
    }
    if (specificationRows.length) {
      await tx.insert(productSpecifications).values(specificationRows);
    }
  });

  return {
    slug: existing.slug,
    categorySlug,
    productName: name.trim(),
  };
}

