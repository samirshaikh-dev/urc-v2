import { notFound, permanentRedirect } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
} from "@/services/products/public/get-product";
import {
  getProductCanonicalPath,
  getProductIndexability,
} from "@/lib/seo";

// Cache Components requires at least one static param. When the catalog is
// unavailable at build time this placeholder is handled with notFound().
const BUILD_PLACEHOLDER_SLUG = "__catalog_unavailable__";

export async function generateStaticParams() {
  try {
    const products = (await getAllProducts()) || [];
    const params = products
      .filter((product) => getProductIndexability(product).visible)
      .map((product) => ({ slug: product.slug }))
      .filter(({ slug }) => Boolean(slug));

    return params.length ? params : [{ slug: BUILD_PLACEHOLDER_SLUG }];
  } catch {
    return [{ slug: BUILD_PLACEHOLDER_SLUG }];
  }
}

export default async function ProductRedirectPage({ params }) {
  const { slug } = await params;

  if (slug === BUILD_PLACEHOLDER_SLUG) {
    notFound();
  }

  let product = null;
  try {
    product = await getProductBySlug(slug);
  } catch {
    notFound();
  }

  if (!product || !getProductIndexability(product).visible) {
    notFound();
  }

  permanentRedirect(getProductCanonicalPath(product));
}
