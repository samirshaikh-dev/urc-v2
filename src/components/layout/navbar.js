"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { MAIN_NAV } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./mobile-nav";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // The drawer is mobile-only; close it if the viewport grows past that breakpoint
  // so its scroll lock and focus trap cannot outlive the layout.
  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 768px)");
    const handleChange = () => {
      if (breakpoint.matches) setMobileOpen(false);
    };

    breakpoint.addEventListener("change", handleChange);
    return () => breakpoint.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-page">
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-18">
        {/* Typographic wordmark — no invented logo mark */}
        <Link
          href="/"
          className="rounded-control text-base font-semibold tracking-tight text-maroon sm:text-lg"
        >
          {SITE_CONFIG.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {MAIN_NAV.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative py-1.5 text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "text-maroon after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-orange-ink after:content-['']"
                    : "text-ink hover:text-maroon"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href="#quote"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Request a quote
          </Button>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="-mr-2 rounded-control p-2.5 text-maroon transition-colors duration-150 hover:bg-field md:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
        </div>
      </Container>

      <MobileNav isOpen={mobileOpen} onClose={closeMobile} />
    </header>
  );
}
