import { ProductsHero } from "@/components/products/products-hero";
import { CategoryPills } from "@/components/products/category-pills";
import { ProductsOverviewGrid } from "@/components/products/products-overview-grid";
import { CategorySelectionGuide } from "@/components/products/category-selection-guide";
import { ProductsProcess } from "@/components/products/products-process";
import { ProductsCustomTooling } from "@/components/products/products-custom-tooling";
import { ProductsEnquiryCTA } from "@/components/products/products-enquiry-cta";
import { Container } from "@/components/ui/container";
import {
  constructMetadata,
  getCollectionPageJsonLd,
  getBreadcrumbJsonLd,
} from "@/lib/seo";
import { CATEGORY_DETAILS } from "@/data/products";

export const metadata = constructMetadata({
  title: "Industrial Cork & Rubberised Cork Products | United Rubber Cork",
  description:
    "Explore United Rubber Cork's full range of natural cork sheets, rubberised cork gaskets, transformer frames, acoustic tiles, and eco-friendly cork gifts manufactured in GIDC Vapi. Conforms to IS: 4253 / ASTM F104.",
  path: "/products",
});

const GENERAL_SELECTION_GUIDE = {
  headline: "The right material starts with the right understanding",
  content:
    "Every industrial application has specific constraints. For high-temperature transformer oils and aggressive fuels, Nitrile-bonded rubberised cork (RC70C / RC80C) provides permanent hermetic sealing. For acoustic underlayment, foundation dampening, and stoppers, high-density agglomerated natural cork delivers exceptional cellular recovery without synthetic elastomers.",
};

export default function ProductsPage() {
  const collectionJsonLd = getCollectionPageJsonLd({
    name: "Industrial Cork & Rubberised Cork Materials",
    description:
      "Full catalog of natural cork and rubberised cork composite materials engineered for thermal insulation, vibration damping, and fluid sealing.",
    path: "/products",
    items: Object.values(CATEGORY_DETAILS).map((cat) => ({
      name: cat.name,
      url: `/products/${cat.slug}`,
    })),
  });

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([collectionJsonLd, breadcrumbJsonLd]),
        }}
      />
      {/* 01. PRODUCTS HERO */}
      <ProductsHero />

      {/* 02. CATEGORY PILL NAVIGATION */}
      <div className="pb-4">
        <Container>
          <CategoryPills activeCategory="all" />
        </Container>
      </div>

      {/* 03. CORE PRODUCT CATEGORIES GRID */}
      <ProductsOverviewGrid />

      {/* 04. MATERIAL SELECTION GUIDANCE (PSYCHOLOGY.MD) */}
      <CategorySelectionGuide selectionGuide={GENERAL_SELECTION_GUIDE} />

      {/* 05. HOW WE WORK WITH TECHNICAL BUYERS */}
      <ProductsProcess />

      {/* 06. DRAWING & CUSTOM TOOLING CALLOUT */}
      <ProductsCustomTooling />

      {/* 07. ENQUIRY CTA */}
      <ProductsEnquiryCTA
        headline="Looking for a specific material?"
        description="Tell us what you need. Share your application, thickness, or technical drawing, and our engineering team will help you find the right solution."
        buttonText="Request a Quote"
      />
    </>
  );
}
