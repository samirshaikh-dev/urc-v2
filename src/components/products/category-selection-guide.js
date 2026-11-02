import Link from "next/link";
import { HelpCircle, ArrowRight, Compass } from "lucide-react";
import { Container } from "@/components/ui/container";

export function CategorySelectionGuide({ selectionGuide }) {
  if (!selectionGuide) return null;

  return (
    <section className="border-t border-line bg-white py-12 sm:py-16">
      <Container>
        <div className="rounded-3xl border border-line bg-page/50 p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-orange-ink">
                <Compass className="size-4" aria-hidden="true" />
                <span>Technical Selection Guidance</span>
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                {selectionGuide.headline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {selectionGuide.content}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-maroon bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-maroon hover:bg-maroon hover:text-white transition-all duration-150 shadow-2xs group"
              >
                <span>Discuss selection parameters</span>
                <ArrowRight className="size-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

