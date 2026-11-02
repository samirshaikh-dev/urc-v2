import { ProductsHero } from "@/components/products/products-hero";
import { ProductBento } from "@/components/home/product-bento";
import { ProductsCustomTooling } from "@/components/products/products-custom-tooling";
import { FinalCTA } from "@/components/home/final-cta";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Industrial Cork Products & Custom Components",
  description:
    "Explore United Rubber Cork's full range of rubberised cork sheets, transformer gasket frames, automotive seals, and plain natural cork sheets.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      {/* 1. PRODUCTS HERO */}
      <ProductsHero />

      {/* 2. PRODUCT BENTO CATALOGUE */}
      <ProductBento />

      {/* 3. DRAWING & CUSTOM TOOLING CALLOUT */}
      <ProductsCustomTooling />

      {/* 4. FINAL CTA */}
      <FinalCTA />
    </>
  );
}