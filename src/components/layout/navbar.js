"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MAIN_NAV } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F5F5F5]/95 backdrop-blur-md border-b border-[#E5E7EB]">
      <Container className="flex h-18 items-center justify-between">
        {/* Brand Wordmark — Maroon */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-md bg-[#650510] flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-xs">
            N
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-tight text-[#650510] group-hover:opacity-90 transition-opacity">
              {SITE_CONFIG.name}
            </span>
            <span className="text-[10px] font-medium tracking-widest uppercase text-[#5A5D63] -mt-1 hidden sm:block">
              Engineered Industrial Solutions
            </span>
          </div>
        </Link>

        {/* Desktop Navigation — Maroon navigation with orange active indicator */}
        <nav className="hidden md:flex items-center gap-7">
          {MAIN_NAV.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive
                    ? "text-[#650510] font-semibold border-b-2 border-[#F58634]"
                    : "text-[#1A1A1A] hover:text-[#650510] border-b-2 border-transparent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          <Button href="#quote" size="sm" variant="primary" className="hidden sm:inline-flex">
            Request a Quote
          </Button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-md text-[#650510] hover:bg-[#F1F2F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#650510]"
            aria-label="Open mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
