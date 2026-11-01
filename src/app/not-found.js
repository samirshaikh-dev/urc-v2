import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center py-24 sm:py-32">
      <Container className="max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-ink">
          404 — Page not found
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
          The requested page could not be found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          The product or resource you are looking for may have moved. Visit the
          homepage or explore the product range.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/">Back to homepage</Button>
          <Button href="/#products" variant="secondary">
            View products
          </Button>
        </div>
      </Container>
    </div>
  );
}
