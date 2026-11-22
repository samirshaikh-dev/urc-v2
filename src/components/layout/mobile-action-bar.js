"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { COMPANY_INFO } from "@/data/company";

/**
 * Mobile-only sticky bottom action bar styled with United Rubber Cork brand theme:
 * - Container: Deep brand maroon surface (`bg-maroon-deep/95`) with subtle border & blur
 * - Call: Brand Orange (`bg-orange text-white`)
 * - WhatsApp: Direct Green (`bg-[#059669] text-white`)
 * - Request Quote: Brand Accent Yellow with Maroon text (`bg-yellow text-maroon font-bold`)
 */
export function MobileActionBar() {
  const pathname = usePathname();

  // Normalize phone & WhatsApp numbers from verified company profile
  const cleanPhone = COMPANY_INFO.phone.replace(/\s+/g, "");
  const cleanWhatsapp = COMPANY_INFO.whatsapp.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    "Hello, I would like to inquire about your services."
  )}`;

  // Smooth scroll if already on contact page, otherwise navigate
  const handleQuoteClick = (e) => {
    if (pathname === "/contact") {
      const formEl = document.getElementById("enquiry-form");
      if (formEl) {
        e.preventDefault();
        formEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <aside
      aria-label="Mobile quick contact actions"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/15 bg-maroon-deep/95 px-2.5 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-[0_-4px_24px_rgba(0,0,0,0.5)] backdrop-blur-md md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        {/* 1. Call Button — Brand Orange */}
        <a
          href={`tel:${cleanPhone}`}
          aria-label={`Call United Rubber Cork at ${COMPANY_INFO.phone}`}
          className="flex h-11 min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-orange px-2 text-xs font-semibold text-white shadow-xs transition-all duration-150 hover:brightness-105 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-white"
        >
          <Phone className="size-4 shrink-0 text-white" aria-hidden="true" />
          <span className="truncate">Call</span>
        </a>

        {/* 2. WhatsApp Button — Messaging Green */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with United Rubber Cork on WhatsApp (opens in new tab)"
          className="flex h-11 min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-[#059669] px-2 text-xs font-semibold text-white shadow-xs transition-all duration-150 hover:brightness-105 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-white"
        >
          <MessageCircle className="size-4 shrink-0 text-white" aria-hidden="true" />
          <span className="truncate">WhatsApp</span>
        </a>

        {/* 3. Request Quote Button — Brand Accent Yellow with Maroon Typography */}
        <Link
          href="/contact#enquiry-form"
          onClick={handleQuoteClick}
          aria-label="Request a quotation"
          className="flex h-11 min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-yellow px-2 text-xs font-bold text-maroon shadow-xs transition-all duration-150 hover:brightness-105 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-white"
        >
          <FileText className="size-4 shrink-0 text-maroon" aria-hidden="true" />
          <span className="truncate">
            <span className="hidden min-[380px]:inline">Request </span>Quote
          </span>
        </Link>
      </div>
    </aside>
  );
}
