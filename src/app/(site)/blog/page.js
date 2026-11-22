import Link from "next/link";
import { ArrowRight, BookOpen, ShieldCheck, Cpu, Layers } from "lucide-react";
import { fetchPublishedBlogs } from "@/api/blogs/public/get-blog";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BlogListClient } from "@/components/blog/blog-list-client";
import {
  constructMetadata,
  getBlogListJsonLd,
  getBreadcrumbJsonLd,
  getJsonLdScriptProps,
} from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Technical Blog & Engineering Guides | United Rubber Cork",
  description:
    "Authoritative engineering guides, material selection criteria, and technical standards (IS 4253, ASTM F104) for rubberised cork sheets, transformer gaskets, and vibration isolation pads.",
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
      <script {...getJsonLdScriptProps([blogListJsonLd, breadcrumbJsonLd])} />

      {/* 01. EDITORIAL HERO SECTION */}
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-field/60 to-page py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            {/* Topic pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-maroon/5 px-3.5 py-1 text-xs font-semibold text-maroon">
              <BookOpen className="size-3.5" aria-hidden="true" />
              <span>Engineering Knowledge &amp; Material Insights</span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Technical Blog &amp; Material Guides
            </h1>

            <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
              Practical material selection criteria, Indian Standards compliance (IS 4253 Part 1 &amp; 2), ASTM F104 specifications, and sealing best practices authored by the technical engineering team at United Rubber Cork in GIDC Vapi, Gujarat.
            </p>

            {/* Credibility metric pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-ink">
              <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 shadow-xs border border-line">
                <ShieldCheck className="size-4 text-maroon" aria-hidden="true" />
                <span>IS: 4253 &amp; ASTM F104 Standards</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 shadow-xs border border-line">
                <Cpu className="size-4 text-orange" aria-hidden="true" />
                <span>Transformer &amp; OEM Focus</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 shadow-xs border border-line">
                <Layers className="size-4 text-yellow" aria-hidden="true" />
                <span>Material Science &amp; Testing</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 02. ARTICLES LISTING & INTERACTIVE FILTER */}
      <section className="py-12 sm:py-16">
        <Container>
          <BlogListClient initialBlogs={blogs} />
        </Container>
      </section>

      {/* 03. ENGINEERING SAMPLE & TECHNICAL ASSISTANCE CTA */}
      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-maroon p-8 text-white shadow-xl sm:p-12 lg:p-16">
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
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Need Help Selecting the Exact Material for Your Application?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-base">
                Whether you need oil-resistant RC70-C transformer gaskets, high-density foundation damping slabs, or custom CNC die-cut prototypes, our technical team in GIDC Vapi provides test coupons, technical datasheets, and batch test certificates.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  href="/contact"
                  className="rounded-full bg-white px-6 py-2.5 text-xs font-semibold text-maroon hover:bg-yellow hover:text-ink transition-colors"
                >
                  Request Technical Guidance
                </Button>
                <Button
                  href="/products"
                  variant="outline"
                  className="rounded-full border-white/40 bg-transparent px-6 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
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
