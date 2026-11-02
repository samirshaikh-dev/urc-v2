import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const LOCATIONS = [
  {
    name: "Manufacturing works",
    lines: ["GIDC Industrial Estate", "Vapi, Gujarat 396195", "India"],
  },
  {
    name: "Corporate office",
    lines: ["New Delhi", "India"],
  },
];

/**
 * Physical locations, kept as plain editorial detail rather than two large
 * facility cards. No operational claims are made beyond the addresses.
 */
export function ContactLocations() {
  return (
    <section className="border-b border-line bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeading
              kicker="Locations"
              title="Manufacturing and office locations"
              description="Use the details below for correspondence and existing order coordination."
            />
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-8 sm:grid-cols-2">
              {LOCATIONS.map((location) => (
                <div key={location.name} className="border-t border-line pt-5">
                  <h3 className="text-sm font-semibold text-ink">{location.name}</h3>
                  <address className="mt-2 text-sm not-italic leading-relaxed text-muted">
                    {location.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
