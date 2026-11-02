import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function AboutCallout() {
  return (
    <section className="border-t border-line bg-white py-16 sm:py-20">
      <Container>
        <div className="rounded-3xl border border-line bg-page/60 p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Looking for a dependable manufacturing partner?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Speak with our sales and technical team to discuss repeat supply contracts, custom dimension tooling, and material test certifications.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" size="md" className="rounded-full px-7 shadow-xs">
              Contact our team
            </Button>
            <Button href="/industries" variant="secondary" size="md" className="rounded-full px-7">
              View industries we serve
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
