import { Container } from "@/components/ui/container";

/**
 * 01. Contact Hero — Compact, editorial, and focused.
 * Headline: "Let's Discuss Your Material Requirements."
 * Label: "GET IN TOUCH"
 */
export function ContactHero() {
  return (
    <section className="border-b border-line bg-white pt-8 pb-10 sm:pt-12 sm:pb-14">
      <Container>
        <div className="max-w-3xl">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-page px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-orange-ink">
            <span className="size-2 rounded-full bg-orange animate-pulse" aria-hidden="true" />
            <span>Get in Touch</span>
          </div>

          {/* Headline */}
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
            Let&apos;s Discuss Your Material Requirements.
          </h1>

          {/* Short description inviting industrial buyers to connect */}
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            Connect with our engineering and sales team in GIDC Vapi, Gujarat. Whether you require standard rubberised cork sheets, custom CAD-cut transformer frames, or vibration damping slabs, we provide fast technical guidance and transparent factory quotations.
          </p>
        </div>
      </Container>
    </section>
  );
}
