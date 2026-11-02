import Image from "next/image";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { INDUSTRIES } from "@/data/industries";

export function IndustriesList() {
  return (
    <section id="sectors" className="border-t border-line bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
              Sector requirements
            </span>
            <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Each sector asks something different of the material.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              Operating media, temperature cycling, bolt torque, and mechanical load determine the
              right cork composite and component format. These are the sectors we supply and the
              constraints that shape each part.
            </p>
            <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-muted">
              Sheet format: 915 × 610 mm. Finished components are cut or molded to drawing.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-line">
          {INDUSTRIES.map((sector, index) => {
            const imageRight = index % 2 === 1;

            return (
              <article
                key={sector.id}
                id={sector.id}
                className="scroll-mt-28 border-b border-line py-10 sm:py-14"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                  <div
                    className={`lg:col-span-5 ${imageRight ? "lg:order-2" : ""}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-field">
                      <Image
                        src={sector.image}
                        alt={sector.title}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover object-center"
                      />
                    </div>
                  </div>

                  <div className={`lg:col-span-7 ${imageRight ? "lg:order-1" : ""}`}>
                    <p className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
                      <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                      <span aria-hidden="true"> / </span>
                      {sector.tagline}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink sm:text-2xl lg:text-3xl">
                      {sector.title}
                    </h3>

                    <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
                      {sector.description}
                    </p>

                    <div className="mt-6 border-l-2 border-orange pl-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
                        Operating requirement
                      </h4>
                      <p className="mt-1.5 text-sm font-medium leading-relaxed text-ink">
                        {sector.keyRequirement}
                      </p>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">
                        Typical components
                      </h4>
                      <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                        {sector.typicalComponents.map((component) => (
                          <li
                            key={component}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-ink"
                          >
                            <span
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-orange"
                              aria-hidden="true"
                            />
                            {component}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <TextLink href="/contact" className="mt-7 min-h-11">
                      Discuss this application
                      <span className="sr-only"> for {sector.title}</span>
                    </TextLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
