import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const RECOVERY_LINKS = [
  {
    label: "Homepage",
    description: "Company overview and full product range",
    href: "/",
  },
  {
    label: "Product catalogue",
    description: "Rubberised cork sheets, gaskets, and cut components",
    href: "/#products",
  },
  {
    label: "Industries we serve",
    description: "Applications across six industrial sectors",
    href: "/industries",
  },
  {
    label: "Contact the team",
    description: "Share a requirement or request a quotation",
    href: "/contact",
  },
];

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Error message */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1 text-xs font-medium text-ink/80">
              <span className="size-2 rounded-full bg-orange" aria-hidden="true" />
              <span>404 — Page not found</span>
            </p>

            <h1 className="mt-6 max-w-xl text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-[3.25rem] lg:leading-[1.12]">
              We couldn&apos;t find <span className="text-maroon">that page.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              It may have moved, been renamed, or the address may be incorrect.
              These pages cover the product information most visitors are
              looking for.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/" size="md" className="rounded-full px-6 shadow-sm">
                Back to homepage
                <ArrowRight className="size-4 ml-1.5" aria-hidden="true" />
              </Button>
              <Button
                href="/#products"
                variant="secondary"
                size="md"
                className="rounded-full px-6"
              >
                View products
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted">
              Looking for a specific specification or drawing?{" "}
              <Link
                href="/contact"
                className="font-medium text-maroon underline decoration-maroon/30 underline-offset-4 transition-colors hover:decoration-maroon"
              >
                Discuss your requirement
              </Link>
              .
            </p>
          </div>

          {/* Recovery navigation */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-xs sm:p-8">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
                Continue from here
              </h2>

              <ul className="mt-2 divide-y divide-line">
                {RECOVERY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group -mx-2 flex items-start justify-between gap-4 rounded-control px-2 py-4 transition-colors duration-150"
                    >
                      <span>
                        <span className="block text-sm font-medium text-ink transition-colors duration-150 group-hover:text-maroon sm:text-base">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted sm:text-sm">
                          {link.description}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="mt-0.5 size-4 shrink-0 text-muted transition-colors duration-150 group-hover:text-maroon"
                        aria-hidden="true"
                      />
                    </Link>
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
