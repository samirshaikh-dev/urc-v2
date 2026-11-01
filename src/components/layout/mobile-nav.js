"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MAIN_NAV } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function MobileNav({ isOpen, onClose }) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-[#F5F5F5]">
      <div className="flex items-center justify-between px-6 h-18 border-b border-[#E5E7EB]">
        <span className="font-bold text-lg text-[#650510]">
          {SITE_CONFIG.name}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 rounded-md text-[#650510] hover:bg-[#F1F2F3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#650510]"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <nav className="flex-1 px-6 py-8 flex flex-col gap-5">
        {MAIN_NAV.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`text-lg font-medium transition-colors flex items-center justify-between ${
                isActive
                  ? "text-[#650510] font-semibold"
                  : "text-[#1A1A1A] hover:text-[#650510]"
              }`}
            >
              <span>{item.label}</span>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-[#F58634]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-[#E5E7EB] bg-[#F1F2F3]">
        <Button href="#quote" variant="primary" size="lg" className="w-full" onClick={onClose}>
          Request a Quote
        </Button>
      </div>
    </div>
  );
}
