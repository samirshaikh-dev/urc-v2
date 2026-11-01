import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";
import { PRODUCTS } from "@/data/products";
import { INDUSTRIES } from "@/data/industries";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/products/product-card";
import { QuoteForm } from "@/components/forms/quote-form";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-20">
      {/* 
        HERO SECTION
        Treatment: Large product image with a maroon content panel
      */}
      <section className="pt-8 sm:pt-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Maroon Content Panel */}
            <div className="lg:col-span-7 bg-[#650510] text-white rounded-2xl p-8 sm:p-12 lg:p-14 flex flex-col justify-between shadow-xs relative overflow-hidden">
              {/* Subtle architectural background detail */}
              <div 
                className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl" 
                aria-hidden="true" 
              />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FCC813] text-xs font-semibold uppercase tracking-wider mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FCC813]" />
                  B2B Industrial Manufacturer
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                  {SITE_CONFIG.tagline}
                </h1>

                <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed max-w-xl">
                  {SITE_CONFIG.description} Custom-engineered formulations conforming to IS, BS, and ASTM specifications.
                </p>

                {/* Primary & Secondary CTAs on Maroon Hero Panel */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    href="#quote"
                    variant="white"
                    size="lg"
                    className="bg-white text-[#650510] hover:bg-[#F5F5F5] border-white font-semibold shadow-xs"
                  >
                    Request a Quote
                  </Button>
                  <Button
                    href="#products"
                    variant="outlineLight"
                    size="lg"
                  >
                    Explore Products
                  </Button>
                </div>
              </div>

              {/* Verified Trust Strip inside Hero Panel */}
              <div className="mt-10 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-left relative z-10">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-[#FCC813]">1–25mm</p>
                  <p className="text-xs text-white/75 mt-0.5">Thickness Range</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-[#FCC813]">NBR/SBR</p>
                  <p className="text-xs text-white/75 mt-0.5">Elastomer Matrix</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-[#FCC813]">IS: 4253</p>
                  <p className="text-xs text-white/75 mt-0.5">Tested Standard</p>
                </div>
              </div>
            </div>

            {/* Visual Product Showcase Panel */}
            <div className="lg:col-span-5 bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-10 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#F58634]">
                    Material Specification
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#1A1A1A] font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#650510]" />
                    High Resilience
                  </span>
                </div>

                {/* Editorial Visual Schema / Material Representation */}
                <div className="my-6 p-6 rounded-xl bg-[#F5F5F5] border border-[#E5E7EB] flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-xl bg-[#650510]/10 text-[#650510] flex items-center justify-center mb-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h2 className="text-base font-semibold text-[#1A1A1A]">
                    Composite Rubberised Cork
                  </h2>
                  <p className="text-xs text-[#5A5D63] mt-1.5 max-w-xs">
                    Manufactured with prime Portuguese natural cork granules vulcanized under controlled temperature with oil-resistant synthetic binders.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-[#E5E7EB]/60">
                    <span className="text-[#5A5D63]">Compressibility</span>
                    <span className="font-semibold text-[#1A1A1A]">30% – 50%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1.5 border-b border-[#E5E7EB]/60">
                    <span className="text-[#5A5D63]">Recovery</span>
                    <span className="font-semibold text-[#1A1A1A]">&gt; 75% min</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1.5">
                    <span className="text-[#5A5D63]">Fluid Resistance</span>
                    <span className="font-semibold text-[#1A1A1A]">ASTM Oil #1, #3 & Fuel A</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                <Link
                  href="#quote"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#650510] hover:text-[#F58634] transition-colors"
                >
                  Request Technical Data Sheet (TDS)
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 
        CAPABILITY STRIP
        Light grey background with subtle divider
      */}
      <section className="border-y border-[#E5E7EB] bg-white py-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#F58634] mt-1.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">Custom CNC Profiling</p>
                <p className="text-xs text-[#5A5D63] mt-0.5">Cut frames, endless rings & gaskets</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#F58634] mt-1.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">Dielectric Integrity</p>
                <p className="text-xs text-[#5A5D63] mt-0.5">Transformer oil compatible sealing</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#F58634] mt-1.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">Standard Sheets</p>
                <p className="text-xs text-[#5A5D63] mt-0.5">915 × 610 mm & 915 × 915 mm</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#F58634] mt-1.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">Direct Factory Supply</p>
                <p className="text-xs text-[#5A5D63] mt-0.5">Batch traceability & quality testing</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 
        PRODUCT CATALOG SECTION
        Treatment: Light grey and white surfaces with orange highlights
      */}
      <section id="products" className="scroll-mt-24">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              kicker="Product Capabilities"
              title="Engineered for Precision & Sealing Integrity"
              description="High-performance rubberised cork sheets, plain cork rolls, and precision-cut gasket components formulated for industrial endurance."
              className="mb-0"
            />
            <Button href="#quote" variant="secondary" size="sm" className="self-start md:self-auto shrink-0">
              Download Catalog / Inquire
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      {/* 
        APPLICATIONS & INDUSTRIES
        Clean editorial layout on white surface
      */}
      <section className="bg-white py-16 sm:py-20 border-y border-[#E5E7EB]">
        <Container>
          <SectionHeading
            kicker="Target Industries"
            title="Meeting Exacting Operating Standards"
            description="Our cork composites are formulated to perform under continuous vibration, thermal cycling, and contact with aggressive industrial oils."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.id}
                className="p-6 rounded-xl border border-[#E5E7EB] bg-[#F5F5F5] flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#650510]/10 text-[#650510] flex items-center justify-center font-bold text-xs mb-4">
                    {ind.id.charAt(0).toUpperCase()}
                  </div>
                  <h3 className="text-base font-semibold text-[#1A1A1A] mb-2">
                    {ind.title}
                  </h3>
                  <p className="text-xs text-[#5A5D63] leading-relaxed mb-4">
                    {ind.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7EB]">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#F58634] mb-2">
                    Typical Components
                  </p>
                  <ul className="space-y-1 text-xs text-[#1A1A1A]">
                    {ind.typicalComponents.map((comp, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#1A1A1A]/40" />
                        <span>{comp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 
        QUOTE & SPECIFICATION INQUIRY SECTION
        Treatment: Form surface #F1F2F3 with maroon focus states and white container
      */}
      <section id="quote" className="scroll-mt-24">
        <Container>
          <div className="max-w-3xl mx-auto bg-white border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 shadow-xs">
            <SectionHeading
              align="center"
              kicker="Direct Quotation"
              title="Request a Specification Quote"
              description="Share your technical parameters, dimensions, and quantity requirements. Our engineering team responds with technical suitability and commercial terms."
            />
            <QuoteForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
