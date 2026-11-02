import Link from "next/link";
import { FOOTER_NAV } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { COMPANY_INFO } from "@/data/company";
import { Container } from "@/components/ui/container";
import {
  MapPin,
  Mail,
  Clock,
  ShieldCheck,
  Factory,
} from "lucide-react";

const linkClasses =
  "rounded-control text-xs text-white/75 transition-colors duration-150 hover:text-white focus-visible:outline-white sm:text-sm";

async function getCopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const currentYear = await getCopyrightYear();

  return (
    <footer className="relative bg-maroon text-white border-t border-maroon-deep">
      {/* MAIN FOOTER CONTENT */}
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12 lg:gap-10">
          {/* Column 1: Brand & Credentials (4 cols) */}
          <div className="md:col-span-12 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center text-xl font-semibold tracking-tight text-white hover:text-yellow transition-colors"
            >
              <span>{SITE_CONFIG.name}</span>
            </Link>

            <p className="mt-3.5 max-w-sm text-xs leading-relaxed text-white/75 sm:text-sm">
              Specialized Indian manufacturer and bulk supplier of engineered rubberised cork sheets, precision transformer gaskets, and resilient elastomer composites.
            </p>

            {/* Quality Standard Badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/90">
                <ShieldCheck className="size-3.5 text-yellow" />
                <span>IS: 4253 (Part 1 &amp; 2)</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/90">
                <ShieldCheck className="size-3.5 text-yellow" />
                <span>ASTM F104 Conformance</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/90">
                <Factory className="size-3.5 text-yellow" />
                <span>Custom CNC Profile Cut</span>
              </div>
            </div>
          </div>

          {/* Column 2: Products (2 cols) */}
          <nav aria-label="Products" className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-semibold text-yellow uppercase tracking-wider">
              Products
            </h4>
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

          {/* Column 3: Industries (2 cols) */}
          <nav aria-label="Industries" className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-semibold text-yellow uppercase tracking-wider">
              Industries
            </h4>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_NAV.industries.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={linkClasses}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Company Links (2 cols) */}
          <nav aria-label="Company" className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-semibold text-yellow uppercase tracking-wider">
              Company
            </h4>
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

          {/* Column 5: Manufacturing & Supply Facilities (2 cols) */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-semibold text-yellow uppercase tracking-wider">
              Facilities &amp; Office
            </h4>
            <ul className="mt-4 space-y-3.5 text-xs text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 shrink-0 text-yellow mt-0.5" />
                <div className="leading-snug">
                  <span className="font-semibold text-white block">Vapi Works:</span>
                  <span>GIDC Industrial Estate, Vapi, Gujarat — 396195</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 shrink-0 text-yellow mt-0.5" />
                <div className="leading-snug">
                  <span className="font-semibold text-white block">Corporate Office:</span>
                  <span>New Delhi — 110002, India</span>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-yellow" />
                <span>Mon–Sat: 8:30 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. LEGAL & BOTTOM BAR */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <p>
              &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <ul className="flex gap-5">
              {FOOTER_NAV.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </Container>
    </footer>
  );
}
