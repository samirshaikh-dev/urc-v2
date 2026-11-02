import { Container } from "@/components/ui/container";
import { Droplet, Gauge, RefreshCcw, Layers } from "lucide-react";

const CAPABILITIES = [
  {
    icon: Droplet,
    title: "Dielectric Oil Barrier",
    description:
      "Formulated with specialized NBR and Neoprene matrices resistant to mineral transformer oil, synthetic esters, and petroleum fluids.",
  },
  {
    icon: Gauge,
    title: "Controlled Compressibility",
    description:
      "Conforms to cast or uneven sheet-metal flanges with low bolt torque, eliminating flange deflection and bolt-hole distortion.",
  },
  {
    icon: RefreshCcw,
    title: "Elastic Recovery",
    description:
      "Sustains seal resilience across continuous thermal cycling from -30°C to +120°C without permanent compression set.",
  },
  {
    icon: Layers,
    title: "Custom CNC Profiling",
    description:
      "Direct fabrication of endless molded gaskets, precision dovetail joints, custom washers, and complex CAD drawing geometries.",
  },
];

export function MetricsStrip() {
  return (
    <section className="border-y border-line bg-white py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-ink">
              <span>Manufacturing & Material Rigor</span>
            </div>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Engineered performance verified by industry standards
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-line bg-page/50 p-6 transition-all duration-200 hover:border-maroon/40 hover:bg-white hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-white border border-line text-maroon group-hover:border-maroon/20 group-hover:bg-maroon group-hover:text-white transition-colors duration-200">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
