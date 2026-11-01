import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center py-24 sm:py-32">
      <Container className="text-center max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-orange)] mb-3">
          404 — Page Not Found
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--color-charcoal)]">
          The requested page could not be found
        </h1>
        <p className="mt-4 text-sm text-[var(--color-muted-grey)] leading-relaxed">
          The product or resource you are looking for may have moved or is temporarily unavailable. Please visit our homepage or explore our product catalog.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button href="/" variant="primary">
            Back to Homepage
          </Button>
          <Button href="/contact" variant="secondary">
            Contact Support
          </Button>
        </div>
      </Container>
    </div>
  );
}
