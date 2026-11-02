import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const MATERIAL_FACTORS = [
  {
    title: "Operating medium",
    detail:
      "Mineral transformer oil, synthetic esters, fuels, saltwater, or ambient exposure.",
  },
  {
    title: "Temperature & cycling",
    detail:
      "Continuous operating temperature and the thermal range the seal must recover from.",
  },
  {
    title: "Mechanical load",
    detail:
      "Bolt torque and flange condition, vibration amplitude, or slab movement.",
  },
  {
    title: "Component format",
    detail:
      "Sheet thickness, cut gasket, molded ring, strip, or a custom profile from drawing.",
  },
];

const ENQUIRY_DETAILS = [
  "Drawing, sketch, or physical sample",
  "Dimensions and thickness",
  "Estimated quantity",
  "Operating conditions and application",
];

export function IndustriesGuidance() {
  return (
    <section className="border-t border-line bg-page py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
              Material fit
            </span>
            <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              The right compound starts with the operating conditions.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              We review the application before recommending a sheet grade or component format.
              These are the details that shape the specification.
            </p>

            <ol className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {MATERIAL_FACTORS.map((factor, index) => (
                <li key={factor.title} className="border-t border-line pt-4">
                  <span className="text-xs font-semibold tabular-nums text-orange-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-ink">{factor.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{factor.detail}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
              <h3 className="text-lg font-semibold tracking-tight text-ink sm:text-xl">
                Send these details with your enquiry
              </h3>

              <ul className="mt-5 divide-y divide-line border-t border-line">
                {ENQUIRY_DETAILS.map((detail) => (
                  <li key={detail} className="flex items-start gap-3 py-3 text-sm text-ink">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-orange-ink"
                      aria-hidden="true"
                    />
                    {detail}
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                If your sector is not listed, describe the application and the conditions it must
                withstand.
              </p>

              <Button href="/contact" size="md" className="mt-6 w-full rounded-full">
                Submit application details
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
