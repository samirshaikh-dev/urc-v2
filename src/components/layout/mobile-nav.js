"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { MAIN_NAV } from "@/data/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav({ isOpen, onClose }) {
  const pathname = usePathname();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      // Keep focus inside the modal dialog.
      const focusable = Array.from(
        dialogRef.current.querySelectorAll(FOCUSABLE)
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-50 flex flex-col bg-page md:hidden"
    >
      <div className="flex h-16 items-center justify-between border-b border-line px-6">
        <span className="text-base font-semibold tracking-tight text-maroon">
          {SITE_CONFIG.name}
        </span>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="-mr-2 rounded-control p-2.5 text-maroon transition-colors duration-150 hover:bg-field"
          aria-label="Close menu"
        >
          <X className="size-6" aria-hidden="true" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6">
        <ul className="divide-y divide-line">
          {MAIN_NAV.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block py-4 text-base font-medium transition-colors duration-150",
                    isActive ? "text-maroon" : "text-ink hover:text-maroon"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-line bg-white p-6">
        <Button href="/contact" className="w-full" onClick={onClose}>
          Request a quote
        </Button>
      </div>
    </div>
  );
}
