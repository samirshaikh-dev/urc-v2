import { FileText, Search, MessageSquare, Truck } from "lucide-react";
import { Container } from "@/components/ui/container";

const STEPS = [
  {
    step: "01",
    icon: FileText,
    title: "Share your requirement",
    description: "Provide the product type, application media, dimensions, thickness, or your CAD drawing.",
  },
  {
    step: "02",
    icon: Search,
    title: "Engineering review",
    description: "Our technical team reviews fluid compatibility, operating temperature, and compressibility parameters.",
  },
  {
    step: "03",
    icon: MessageSquare,
    title: "Clarification & quotation",
    description: "We clarify any missing details, provide commercial terms, and dispatch material samples where required.",
  },
  {
    step: "04",
    icon: Truck,
    title: "Production & dispatch",
    description: "Manufactured under strict IS: 4253 quality inspection and dispatched from our Vapi works.",
  },
];

export function ProductsProcess() {
  return (
    <section className="border-t border-line bg-page/50 py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
            Transparent Workflow
          </span>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            How we work with technical buyers
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-2xl border border-line bg-white p-6 shadow-2xs hover:border-maroon/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-orange-ink">
                    Step {item.step}
                  </span>
                  
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

