import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/forms/contact-form";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Share the requirement",
    description:
      "Send the product or material, dimensions, quantity and application details you already have.",
  },
  {
    step: "02",
    title: "We review the details",
    description:
      "Your enquiry is checked for the information needed to assess material, format and quantity.",
  },
  {
    step: "03",
    title: "We follow up",
    description:
      "We contact you with any clarification needed and the relevant commercial or technical next step.",
  },
];

const USEFUL_DETAILS = [
  "Product or material, such as rubberised cork sheet, gasket, granules or a custom part",
  "Dimensions and thickness, in millimetres",
  "Quantity or estimated order volume",
  "Application and operating conditions, where relevant",
  "A drawing or sample reference, if one is available",
];

/**
 * Enquiry section. The form is the primary action, so it comes first in the
 * document order and is visually paired with a plain explanation of what
 * happens after sending.
 */
export function ContactEnquiry() {
  return (
    <section
      id="enquiry"
      aria-labelledby="enquiry-heading"
      className="scroll-mt-24 border-b border-line bg-page py-16 sm:py-24"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Form — first in DOM for mobile and assistive technology. */}
          <div className="lg:order-2 lg:col-span-7">
            <div className="rounded-panel border border-line bg-white p-6 sm:p-8">
              <h2
                id="enquiry-heading"
                className="text-xl font-semibold tracking-tight text-ink sm:text-2xl"
              >
                Send your requirement
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                Tell us what you are working on. The more relevant detail you provide,
                the easier it is to understand the enquiry. Submitting this form prepares
                an email draft for you to review and send.
              </p>

              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Supporting guidance */}
          <div className="lg:order-1 lg:col-span-5">
            <SectionHeading
              kicker="What happens next"
              title="A clear path from requirement to response"
              // description="Send what you know. If a detail is missing, it can be clarified before a response is prepared."
            />

            <ol className="mt-8 divide-y divide-line border-y border-line">
              {PROCESS_STEPS.map((item) => (
                <li key={item.step} className="flex gap-4 py-5">
                  <span
                    className="mt-0.5 shrink-0 font-mono text-xs font-semibold text-orange-ink"
                    aria-hidden="true"
                  >
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-ink">
                Details that help us respond accurately
              </h3>
              <ul className="mt-3 space-y-2.5">
                {USEFUL_DETAILS.map((detail) => (
                  <li key={detail} className="flex items-start gap-2.5 text-sm text-muted">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-orange-ink"
                      aria-hidden="true"
                    />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
