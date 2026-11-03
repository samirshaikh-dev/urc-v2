import Link from "next/link";
import { FOOTER_NAV } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { COMPANY_INFO } from "@/data/company";
import { Container } from "@/components/ui/container";
import {
  MapPin,
  Mail,
  Clock,
  Phone,
  ExternalLink,
} from "lucide-react";

const linkClasses =
  "rounded-control text-xs text-white/75 transition-colors duration-150 hover:text-white focus-visible:outline-white sm:text-sm";

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.4 9.74V9.93H5.06v8.57h2.8z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Footer({ currentYear }) {
  const year = currentYear ?? 2026;
  const encodedAddress = encodeURIComponent(
    `${COMPANY_INFO.name}, ${COMPANY_INFO.address.street}, ${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.state} ${COMPANY_INFO.address.pincode}, ${COMPANY_INFO.address.country}`
  );
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <footer className="relative overflow-hidden bg-maroon text-white border-t border-maroon-deep">
      {/* Giant Architectural Background URC Watermark covering ~60% */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[12%] select-none font-black tracking-tighter text-white/[0.05] leading-none whitespace-nowrap text-[42vw] sm:text-[36vw] lg:text-[30vw] z-0"
      >
        URC
      </div>

      {/* MAIN FOOTER CONTENT */}
      <Container className="relative z-10 py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12 lg:gap-10">
          {/* Column 1: Brand & Credentials (4 cols) */}
          <div className="md:col-span-12 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center text-xl font-semibold tracking-tight text-white hover:text-yellow transition-colors focus-visible:outline-2 focus-visible:outline-white"
            >
              <span>{SITE_CONFIG.name}</span>
            </Link>

            <p className="mt-3.5 max-w-sm text-xs leading-relaxed text-white/75 sm:text-sm">
              Specialized Indian manufacturer and bulk supplier of engineered rubberised cork sheets, precision transformer gaskets, and resilient elastomer composites.
            </p>

            {/* Social Icons Row */}
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.name} (opens in new tab)`}
                  className="flex size-8 sm:size-9 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-150 hover:bg-white hover:text-maroon shadow-xs focus-visible:outline-2 focus-visible:outline-white"
                >
                  <item.icon className="size-4" />
                </a>
              ))}
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
              Works &amp; Office
            </h4>
            <ul className="mt-4 space-y-3.5 text-xs text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="size-4 shrink-0 text-yellow mt-0.5" aria-hidden="true" />
                <div className="leading-snug">
                  <span className="font-semibold text-white block">Works &amp; Facility:</span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="View United Rubber Cork works facility on Google Maps"
                    className="hover:text-white underline-offset-2 hover:underline transition-colors block"
                  >
                    No. 5, Balaji Complex, 2nd Phase, GIDC, Vapi — 396195
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="size-4 shrink-0 text-yellow mt-0.5" aria-hidden="true" />
                <div className="leading-snug">
                  <span className="font-semibold text-white block">Email:</span>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="hover:text-white underline-offset-2 hover:underline"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="size-4 shrink-0 text-yellow mt-0.5" aria-hidden="true" />
                <div className="leading-snug">
                  <span className="font-semibold text-white block">Phone:</span>
                  <a
                    href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, "")}`}
                    className="hover:text-white underline-offset-2 hover:underline"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="size-4 shrink-0 text-yellow" aria-hidden="true" />
                <span>Mon–Sat: 9:00 AM – 6:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. LEGAL & BOTTOM BAR */}
        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <p>
              &copy; {year} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <span className="hidden sm:inline text-white/30" aria-hidden="true">
              •
            </span>
            <p>
              Design and developed by{" "}
              <a
                href="https://samir-portfolio-dev.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white/80 hover:text-white underline-offset-2 hover:underline transition-colors duration-150"
              >
                Samir Shaikh
              </a>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <ul className="flex gap-5">
              {FOOTER_NAV.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors duration-150 rounded-control focus-visible:outline-2 focus-visible:outline-white"
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
