"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { MAIN_NAV } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./mobile-nav";
import { ProductsMegaMenu } from "./products-mega-menu";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer when resizing beyond md breakpoint
  useEffect(() => {
    const breakpoint = window.matchMedia("(min-width: 768px)");
    const handleChange = () => {
      if (breakpoint.matches) setMobileOpen(false);
    };

    breakpoint.addEventListener("change", handleChange);
    return () => breakpoint.removeEventListener("change", handleChange);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      <div className="px-4 py-2.5 sm:px-6">
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-full border transition-all duration-200",
            scrolled
              ? "border-line bg-white/95 px-5 py-2 shadow-sm backdrop-blur-md"
              : "border-line/70 bg-white/80 px-5 py-2.5 backdrop-blur-sm"
          )}
        >
          {/* Brand Wordmark with subtle orange accent dot */}
          <Link
            href="/"
            className="group flex items-center gap-1.5 rounded-control text-sm font-semibold tracking-tight text-ink transition-colors hover:text-maroon sm:text-base"
          >
            <span>{SITE_CONFIG.name}</span>
            <span
              className="size-1.5 rounded-full bg-orange transition-transform duration-200 group-hover:scale-125"
              aria-hidden="true"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {MAIN_NAV.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));

              if (hasChildren) {
                return (
                  <ProductsMegaMenu
                    key={item.href}
                    item={item}
                    isActive={isActive}
                  />
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-150 sm:text-sm",
                    isActive
                      ? "bg-maroon/5 text-maroon font-semibold"
                      : "text-ink/80 hover:bg-field hover:text-maroon"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            <Button
              href="/contact"
              size="sm"
              className="hidden rounded-full px-4 text-xs font-medium sm:inline-flex"
            >
              Request a quote
            </Button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="-mr-1 rounded-full p-2 text-maroon transition-colors duration-150 hover:bg-field md:hidden cursor-pointer"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <MobileNav isOpen={mobileOpen} onClose={closeMobile} />
    </header>
  );
}
