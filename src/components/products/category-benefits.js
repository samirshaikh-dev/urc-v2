import { CheckCircle2, Factory, Layers, Flame, Shield, Cog, Cpu, Building2 } from "lucide-react";
import { Container } from "@/components/ui/container";

export function CategoryBenefits({ category }) {
  const { applications = [], benefits = [] } = category;

  return (
    <section className="border-t border-line bg-page/40 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column 1: Applications */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
                Industrial Applications
              </span>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Where these materials are deployed
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Engineered to meet specific mechanical loads, dielectric fluids, and operating environments.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {applications.map((app, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-line bg-white p-5 shadow-2xs hover:border-maroon/30 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-maroon/10 text-maroon text-xs font-bold">
                      0{idx + 1}
                    </span>
                    <h3 className="text-sm font-semibold text-ink">
                      {app.title}
                    </h3>
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted">
                    {app.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Material Properties & Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
                Engineering Advantages
              </span>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                Verified material properties
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Key physical and chemical characteristics that provide sealing reliability and structural durability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-line bg-white p-5 shadow-2xs hover:border-maroon/30 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 shrink-0 text-orange-ink" aria-hidden="true" />
                    <h3 className="text-sm font-semibold text-ink">
                      {benefit.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

