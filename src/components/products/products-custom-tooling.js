import { Cpu } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function ProductsCustomTooling() {
  return (
    <section className="border-t border-line bg-white py-16 sm:py-20">
      <Container>
        <div className="rounded-3xl border border-line bg-page/60 p-8 sm:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Need custom drawing profiles or endless molded rings?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            We fabricate custom-dimension circular rings, rectangular frames, dovetail joints, and complex gasket geometries with CNC precision directly from your technical drawings or physical samples.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact" size="md" className="rounded-full px-7 shadow-xs">
              Submit drawing for quotation
            </Button>
            <Button href="/industries" variant="secondary" size="md" className="rounded-full px-7">
              Explore application sectors
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}