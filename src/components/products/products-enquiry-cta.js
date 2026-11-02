import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, FileCheck2 } from "lucide-react";
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
    <section className="border-t border-line bg-page py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-maroon-deep bg-maroon p-8 text-white shadow-lg sm:p-12 lg:p-16 text-center">
          {/* Subtle architectural background texture accent */}
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-white/[0.03] blur-2xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-20 size-96 rounded-full bg-yellow/[0.04] blur-2xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-3xl">

            {/* Headline */}
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
              {headline}
            </h2>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
              {description}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                href={quoteUrl}
                variant="inverse"
                size="md"
                className="rounded-full px-7 font-semibold shadow-md group"
              >
                <span>{buttonText}</span>
                <ArrowRight className="size-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-xs transition-colors hover:border-white hover:bg-white/15"
              >
                Learn about our works
              </Link>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
