import Link from "next/link";
import { FOOTER_NAV } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "@/components/ui/container";

const linkClasses =
  "rounded-control text-sm text-white/75 transition-colors duration-150 hover:text-white focus-visible:outline-white";

/**
 * `new Date()` is unstable IO under Cache Components, so the year is captured
 * into the static shell once at build time instead of on every prerender.
 */
async function getCopyrightYear() {
  "use cache";

  return new Date().getFullYear();
}

export async function Footer() {
  const currentYear = await getCopyrightYear();

  return (
    <footer className="bg-maroon text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <span aria-hidden="true" className="mb-4 block h-0.5 w-8 bg-yellow" />
            <p className="text-lg font-semibold tracking-tight text-white">
              {SITE_CONFIG.name}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">
              {SITE_CONFIG.description}
            </p>
          </div>

          <nav aria-label="Products" className="md:col-span-3">
            <h2 className="text-sm font-semibold text-white">Products</h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_NAV.products.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-3">
            <h2 className="text-sm font-semibold text-white">Company</h2>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_NAV.company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {FOOTER_NAV.legal.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={linkClasses}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
