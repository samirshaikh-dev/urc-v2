import Link from "next/link";
import { FOOTER_NAV } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "@/components/ui/container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#650510] text-white pt-16 pb-12 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/15">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FCC813]" aria-hidden="true" />
              <span className="font-bold text-lg text-white tracking-tight">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="text-sm text-white/80 max-w-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-[#FCC813] font-medium">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FCC813]" />
              Direct Factory Supply & Custom Engineering
            </div>
          </div>

          {/* Products Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#FCC813] mb-4">
              Products
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.products.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-white hover:underline transition-colors decoration-[#FCC813] underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#FCC813] mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_NAV.company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/80 hover:text-white hover:underline transition-colors decoration-[#FCC813] underline-offset-4"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© {currentYear} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className="flex gap-6">
            {FOOTER_NAV.legal.map((item) => (
              <Link key={item.label} href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
