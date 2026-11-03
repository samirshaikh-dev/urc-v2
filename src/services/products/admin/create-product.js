import { randomUUID } from "node:crypto";
import { eq } from "drizzle-orm";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { getDbClient } from "@/lib/db";
import { productFaqs, productSpecifications, products } from "@/db/schema";
import { slugify } from "@/lib/utils";
import {
  cleanFaqs,
  cleanSpecifications,
  createRelatedRows,
} from "../helpers";

export async function createProductService(payload) {
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

  let imageUrl = imageFileUri;
  let imagePublicId = null;

  if (imageFileUri && imageFileUri.startsWith("data:image")) {
    const upload = await uploadToCloudinary(imageFileUri);
    if (!upload.success) {
      throw new Error(upload.error || "Image upload failed.");
    }
    imageUrl = upload.url;
    imagePublicId = upload.publicId;
  }

  const baseSlug = slugify(name);
  let slug = baseSlug;
  let suffix = 1;

  while (
    (
      await db
        .select({ id: products.id })
        .from(products)
        .where(eq(products.slug, slug))
        .limit(1)
    ).length
  ) {
    slug = `${baseSlug}-${suffix}`;
    suffix++;
  }

  const productId = randomUUID();
  const faqRows = createRelatedRows(cleanFaqs(faqs), productId, ["question", "answer"]);
  const specificationRows = createRelatedRows(cleanSpecifications(specifications), productId, [
    "property",
    "value",
  ]);

  const [product] = await db.transaction(async (tx) => {
    const [created] = await tx
      .insert(products)
      .values({
        id: productId,
        slug,
        name: name.trim(),
        description,
        categorySlug,
        imageUrl,
        imagePublicId,
      })
      .returning();

    if (faqRows.length) {
      await tx.insert(productFaqs).values(faqRows);
    }
    if (specificationRows.length) {
      await tx.insert(productSpecifications).values(specificationRows);
    }

    return [created];
  });

  return {
    product,
    slug,
    categorySlug,
    productName: product.name,
  };
}

