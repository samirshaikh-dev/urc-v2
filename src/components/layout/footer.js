import Link from "next/link";
import { FOOTER_NAV } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { COMPANY_INFO } from "@/data/company";
import { Container } from "@/components/ui/container";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

const linkClasses =
  "rounded-control text-xs text-white/75 transition-colors duration-150 hover:text-white focus-visible:outline-white sm:text-sm";

async function getCopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const currentYear = await getCopyrightYear();

  return (
    <footer className="bg-maroon text-white border-t border-maroon-deep">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12 lg:gap-12">
          {/* Brand & Purpose */}
          <div className="md:col-span-5">
            <span aria-hidden="true" className="mb-4 block h-0.5 w-8 bg-yellow" />
            <p className="text-xl font-semibold tracking-tight text-white">
              {SITE_CONFIG.name}
            </p>
            <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/80 sm:text-sm">
              Specialized manufacturer and bulk supplier of industrial rubberised cork sheets, precision transformer gaskets, and engineered elastomer-cork composites.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/90">
              <span className="size-1.5 rounded-full bg-yellow" />
              <span>IS: 4253 / ASTM / BS Quality Standards</span>
            </div>
          </div>

          {/* Product Links */}
          <nav aria-label="Products" className="md:col-span-2">
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider">Products</h2>
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

          {/* Company Links */}
          <nav aria-label="Company" className="md:col-span-2">
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider">Company</h2>
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

          {/* Contact & Facility */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold text-white uppercase tracking-wider">Manufacturing & Supply</h2>
            <ul className="mt-4 space-y-3 text-xs text-white/75 sm:text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="size-4 shrink-0 text-yellow mt-0.5" />
                <span>Manufacturing: Vapi, Gujarat &bull; Supply Office: {COMPANY_INFO.address.city}, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-yellow" />
                <span>{COMPANY_INFO.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 shrink-0 text-yellow" />
                <span>{COMPANY_INFO.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved. Industrial Cork Materials &amp; Customized Component Manufacturing.
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
