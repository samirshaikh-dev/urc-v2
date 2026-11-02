import { ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function ProductsEnquiryCTA({
  headline = "Looking for a specific material?",
  description = "Tell us what you need. We'll help you find the right solution.",
  productName = "",
  buttonText = "Request a Quote",
}) {
  const quoteUrl = productName
    ? `/contact?product=${encodeURIComponent(productName)}`
    : "/contact";

  return (
    <section className="relative overflow-hidden bg-maroon py-16 sm:py-20 text-white">
      {/* Subtle background decoration */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-white/90 backdrop-blur-xs">
            <ShieldCheck className="size-3.5 text-yellow" aria-hidden="true" />
            <span>Confidential Drawing &amp; RFQ Review</span>
          </div>

          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
            {headline}
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button
              href={quoteUrl}
              size="lg"
              className="rounded-full bg-white text-maroon hover:bg-page hover:text-maroon px-7 font-semibold shadow-md group"
            >
              <span>{buttonText}</span>
              <ArrowRight className="size-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>

            <Button
              href="/about"
              variant="secondary"
              size="lg"
              className="rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:border-white px-7 font-semibold"
            >
              Learn about our works
            </Button>
          </div>

          <p className="mt-6 text-xs text-white/60">
            Standard response: Detailed technical guidance and commercial quotation within 24 working hours.
          </p>
        </div>
      </Container>
    </section>
  );
}

