import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";

/**
 * Closing navigation for visitors who are not ready to enquire yet. Kept as a
 * single quiet band rather than another full call-to-action block.
 */
export function ContactExplore() {
  return (
    <section className="bg-page py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              Still reviewing the product range?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Browse product categories and the industries we serve, then return with the
              details that match your requirement.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <TextLink href="/products">Explore products</TextLink>
            <TextLink href="/industries">View industries</TextLink>
            <TextLink href="/about">About United Rubber Cork</TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
