import { fetchPublishedBlogs } from "@/api/blogs/public/get-blog";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BlogListClient } from "@/components/blog/blog-list-client";
import {
  constructMetadata,
  getBlogListJsonLd,
  getBreadcrumbJsonLd,
} from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Technical Blog & Engineering Guides | United Rubber Cork",
  description:
    "Material selection, IS 4253 and ASTM F104 guidance from the United Rubber Cork engineering team in GIDC Vapi, Gujarat.",
  path: "/blog",
  keywords: [
    "rubber cork engineering blog",
    "IS 4253 technical standards guide",
    "transformer gasket material selection",
    "vibration damping cork foundation slabs",
    "rubberised cork manufacturer Vapi blog",
    "ASTM F104 gasket material specifications",
  ],
});

export default async function BlogListingPage() {
  const blogs = await fetchPublishedBlogs();

  const blogListJsonLd = getBlogListJsonLd(blogs);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogListJsonLd, breadcrumbJsonLd]),
        }}
      />

      {/* 01. COMPACT HERO (~200px tall) + UNIFIED SEARCH CONTROL */}
      <section className="border-b border-line bg-field/40 pt-10 pb-8 sm:pt-14 sm:pb-10">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            {/* Consistent Brand Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-ink">
              Technical Blog &amp; Material Guides
            </h1>

            {/* Concise One-Line Supporting Paragraph */}
            <p className="mt-2 text-xs sm:text-sm text-muted">
              Material selection, IS 4253 and ASTM F104 guidance from our Vapi engineering team.
            </p>
          </div>

          {/* Unified Search Bar & Dropdown inside Hero */}
          <div className="mt-6">
            <BlogListClient initialBlogs={blogs} />
          </div>
        </Container>
      </section>

      {/* 02. BOTTOM CONVERSION CTA BANNER */}
      <section className="border-t border-line bg-white py-14 sm:py-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-maroon p-8 text-white shadow-lg sm:p-12 lg:p-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-10 select-none text-9xl font-black text-white/5"
            >
              URC
            </div>

            <div className="relative z-10 max-w-2xl">
              <span className="inline-block rounded-full bg-yellow/20 px-3 py-1 text-xs font-semibold text-yellow">
                Engineering Consultation
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Need Material Testing or Custom Gasket Tooling?
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-white/80 sm:text-sm">
                Our plant in GIDC Vapi provides sample swatches, IS 4253 / ASTM test certificates, and precision CNC dovetail joint fabrication for power transformer and industrial equipment manufacturers.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  href="/contact"
                  className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-maroon hover:bg-yellow hover:text-ink transition-colors"
                >
                  Request Technical Guidance
                </Button>
                <Button
                  href="/products"
                  variant="outline"
                  className="rounded-full border-white/40 bg-transparent px-5 py-2 text-xs font-semibold text-white hover:bg-white/10"
                >
                  Explore Product Range
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
