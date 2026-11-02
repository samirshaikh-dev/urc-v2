import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function ContactFinalCTA() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-maroon p-8 text-white shadow-md sm:p-12 lg:p-16 text-center">
          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Looking for the right industrial material?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
              Tell us your requirements. Our team is ready to help you select, formulate, and fabricate the ideal cork solution.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                href="/products"
                variant="inverse"
                size="md"
                className="rounded-full px-8 shadow-xs group"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="size-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

