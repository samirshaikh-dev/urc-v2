"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function ProductFaqAccordion({ faqs = [], productName = "this product" }) {
  const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default

  if (!faqs || faqs.length === 0) {
    return null;
  }

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section className="border-t border-line bg-page/30 py-14 sm:py-18">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-orange-ink">
            <HelpCircle className="size-4 text-maroon" />
            <span>Product FAQs</span>
          </div>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-muted">
            Key details, dimensions, application constraints, and material answers for {productName}.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-8 space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id || idx}
                className={`overflow-hidden rounded-2xl border transition-colors ${
                  isOpen
                    ? "border-maroon/30 bg-white shadow-xs"
                    : "border-line bg-white hover:border-line-strong/40"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-maroon"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-ink sm:text-lg">
                    {faq.question}
                  </span>
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180 bg-maroon text-white"
                        : "bg-field text-muted"
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-line/60 px-5 pb-6 pt-4 sm:px-6">
                    <div className="text-sm leading-relaxed text-muted whitespace-pre-line sm:text-base">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

