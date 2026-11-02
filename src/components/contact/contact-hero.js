import { Container } from "@/components/ui/container";

export function ContactHero() {
  return (
    <section className="relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-16 lg:pb-20">
      <Container>
        <div className="relative rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-12 lg:p-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-page px-3.5 py-1 text-xs font-medium text-ink/80">
              <span className="size-2 rounded-full bg-orange animate-pulse" aria-hidden="true" />
              <span>Direct Engineering &amp; Commercial Support</span>
            </div>

            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink sm:text-5xl sm:leading-[1.12] lg:text-[3.25rem]">
              Contact our <span className="text-maroon">technical team.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              Have a new equipment design, custom drawing requirement, or bulk material inquiry? Speak directly with our material specialists to discuss specifications, test samples, and scheduled supply.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
