import { SITE_CONFIG } from "@/lib/constants";
import { PRODUCTS } from "@/data/products";
import { INDUSTRIES } from "@/data/industries";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { TextLink } from "@/components/ui/text-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/products/product-card";
import { QuoteForm } from "@/components/forms/quote-form";

/*
 * Facts already present in the project data (1–25 mm thickness,
 * NBR/SBR binder matrix, 915 × 610 mm sheet). Keep this list short: it is
 * orientation for a buyer, not a second feature grid.
 */
const MATERIAL_FACTS = [
  { label: "Thickness range", value: "1–25 mm" },
  { label: "Binder matrix", value: "NBR / SBR" },
  { label: "Standard sheet", value: "915 × 610 mm" },
];

const CAPABILITIES = [
  {
    title: "Custom profiling",
    detail: "Cut frames, endless rings and gaskets",
  },
  {
    title: "Dielectric integrity",
    detail: "Transformer-oil compatible sealing",
  },
  {
    title: "Standard sheets",
    detail: "915 × 610 mm and 915 × 915 mm",
  },
  {
    title: "Direct factory supply",
    detail: "Batch traceability and quality testing",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO — one maroon panel, typography-led, no decorative layers */}
      <section className="pt-8 pb-14 sm:pt-12 sm:pb-20">
        <Container>
          <div className="overflow-hidden rounded-panel bg-maroon text-white">
            <div className="grid lg:grid-cols-12">
              <div className="px-6 py-10 sm:px-10 sm:py-14 lg:col-span-7 lg:px-14 lg:py-16">
                <h1 className="max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
                  {SITE_CONFIG.tagline}
                </h1>

                <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                  {SITE_CONFIG.description}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button href="#quote" variant="inverse">
                    Request a quote
                  </Button>
                  <TextLink href="#products" onDark>
                    Explore products
                  </TextLink>
                </div>
              </div>

              <div className="border-t border-white/15 px-6 py-8 sm:px-10 lg:col-span-5 lg:flex lg:flex-col lg:justify-center lg:border-t-0 lg:border-l lg:px-10">
                <dl className="space-y-3">
                  {MATERIAL_FACTS.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-baseline justify-between gap-6 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                    >
                      <dt className="text-sm text-white/70">{fact.label}</dt>
                      <dd className="text-sm font-medium text-white">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CAPABILITIES — open definition list, no bullet icons */}
      <section className="border-y border-line bg-white py-10 sm:py-12">
        <Container>
          <dl className="grid gap-6 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-4">
            {CAPABILITIES.map((capability) => (
              <div key={capability.title}>
                <dt className="text-sm font-semibold text-ink">{capability.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-muted">
                  {capability.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* PRODUCTS — editorial rows on a hairline rule */}
      <section id="products" tabIndex={-1} className="scroll-mt-24 py-16 focus:outline-none sm:py-24">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              kicker="Product range"
              title="Rubberised cork sheets and cut components"
              description="Sheets, gaskets and precision-cut parts produced to your dimensions and operating conditions."
            />
            <TextLink href="#quote" className="shrink-0 sm:pb-1">
              Request a quote
            </TextLink>
          </div>

          <ul className="mt-10 divide-y divide-line border-t border-line sm:mt-12">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>
        </Container>
      </section>

      {/* INDUSTRIES — three columns separated by rules, not cards */}
      <section className="border-y border-line bg-white py-16 sm:py-24">
        <Container>
          <SectionHeading
            kicker="Applications"
            title="Where these materials are used"
            description="Sealing and insulation components for equipment that runs under vibration, heat cycling and contact with industrial oils."
          />

          <div className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-10">
            {INDUSTRIES.map((industry) => (
              <div key={industry.id} className="border-t border-line pt-5">
                <h3 className="text-base font-semibold text-ink sm:text-lg">
                  {industry.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {industry.description}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  <span className="font-medium text-ink">Typical parts:</span>{" "}
                  {industry.typicalComponents.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* QUOTE — one justified surface around the form, nothing nested */}
      <section id="quote" tabIndex={-1} className="scroll-mt-24 py-16 focus:outline-none sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2
                id="quote-title"
                className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
              >
                Request a quote
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                Tell us what you are working on. Dimensions, thickness, quantity
                and operating conditions help us recommend the right material.
              </p>

              <h3 className="mt-8 text-sm font-semibold text-ink">
                Useful details to include
              </h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted marker:text-orange-ink">
                <li>Product or material type</li>
                <li>Thickness, sheet size or drawing dimensions</li>
                <li>Quantity required</li>
                <li>Application and operating conditions</li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-panel border border-line bg-white p-6 sm:p-8">
                <QuoteForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
