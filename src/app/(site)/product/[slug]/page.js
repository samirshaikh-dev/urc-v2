import { redirect, notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/data/products";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductRedirectPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  redirect(`/products/${product.category}/${product.slug}`);
}

