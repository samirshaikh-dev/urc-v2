import { Cpu } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function IndustriesCallout() {
  return (
    <section className="border-t border-line bg-white py-16 sm:py-20">
      <Container>
        <div className="rounded-3xl border border-line bg-page/60 p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center justify-center size-12 rounded-full bg-maroon/10 text-maroon mb-4">
            <Cpu className="size-6" />
          </span>
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Have an application with custom tolerances or unusual operating fluids?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Our engineering laboratory formulates custom elastomer binders (NBR, Neoprene, SBR, and silicone blends) and fabricates precision prototypes directly from your CAD drawings or physical gasket samples.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" size="md" className="rounded-full px-7 shadow-xs">
              Submit drawing for technical review
            </Button>
            <Button href="/contact" variant="secondary" size="md" className="rounded-full px-7">
              Contact engineering team
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
