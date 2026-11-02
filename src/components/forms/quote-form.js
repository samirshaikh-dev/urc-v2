"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ShieldCheck, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const MATERIAL_OPTIONS = [
  "Rubberised Cork Sheets",
  "Transformer Cork Gaskets & Frames",
  "Automotive & Engine Gaskets",
  "Plain Natural Cork / Granules",
  "Custom Drawing / Molded Component",
];

const fieldClasses =
  "w-full rounded-xl border border-line-strong bg-field px-3.5 py-2.5 text-sm text-ink placeholder:text-muted transition-colors duration-150 focus:border-maroon focus:bg-white focus:outline-none";

const labelClasses = "block text-xs font-semibold text-ink sm:text-sm";

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-orange-ink font-semibold">
      {" "}
      *
    </span>
  );
}

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIAL_OPTIONS[0]);
  const successRef = useRef(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    // Simulate submission handler with toast notification
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast.success("Quotation Request Received!", {
        description: "Our engineering and sales team will review your parameters and follow up shortly.",
      });
    }, 600);
  };

  if (submitted) {
    return (
      <div ref={successRef} tabIndex={-1} className="py-8 text-center focus:outline-none">
        <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-maroon/10 text-maroon">
          <Check className="size-6" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-xl font-semibold text-maroon">Enquiry successfully submitted</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          Thank you for contacting United Rubber Cork. Our technical team is reviewing your specifications and will respond within 24 working hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex text-xs font-semibold text-maroon hover:underline"
        >
          Submit another quotation request →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="quote-title"
      aria-busy={isSubmitting}
      className="space-y-5"
    >
      <div className="flex items-center justify-between border-b border-line pb-3">
        <p className="text-xs text-muted">Fields marked with <span className="text-orange-ink">*</span> are required.</p>
        <div className="flex items-center gap-1 text-[11px] font-medium text-orange-ink">
          <ShieldCheck className="size-3.5" />
          <span>Confidential Drawing Review</span>
        </div>
      </div>

      {/* Material Type Pills */}
      <div>
        <label className={labelClasses}>Select Material or Product Category</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {MATERIAL_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSelectedMaterial(opt)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                selectedMaterial === opt
                  ? "bg-maroon text-white shadow-2xs"
                  : "bg-field border border-line text-ink/80 hover:bg-white hover:border-maroon/30"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-name" className={labelClasses}>
            Your name
            <RequiredMark />
          </label>
          <input
            id="quote-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Rahul Sharma"
            className={`mt-1 ${fieldClasses}`}
          />
        </div>

        <div>
          <label htmlFor="quote-company" className={labelClasses}>
            Company or Organization
            <RequiredMark />
          </label>
          <input
            id="quote-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder="e.g. Apex Transformers Ltd."
            className={`mt-1 ${fieldClasses}`}
          />
        </div>

        <div>
          <label htmlFor="quote-email" className={labelClasses}>
            Work email
            <RequiredMark />
          </label>
          <input
            id="quote-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@company.com"
            className={`mt-1 ${fieldClasses}`}
          />
        </div>

        <div>
          <label htmlFor="quote-phone" className={labelClasses}>
            Phone or WhatsApp
            <RequiredMark />
          </label>
          <input
            id="quote-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91-XXXXXXXXXX"
            className={`mt-1 ${fieldClasses}`}
          />
        </div>

        <div>
          <label htmlFor="quote-thickness" className={labelClasses}>
            Thickness / Dimensions
          </label>
          <input
            id="quote-thickness"
            name="thickness"
            type="text"
            placeholder="e.g. 3.0 mm or 915 × 610 mm"
            className={`mt-1 ${fieldClasses}`}
          />
        </div>

        <div>
          <label htmlFor="quote-quantity" className={labelClasses}>
            Estimated Quantity
          </label>
          <input
            id="quote-quantity"
            name="quantity"
            type="text"
            placeholder="e.g. 500 sheets or 1,000 gaskets"
            className={`mt-1 ${fieldClasses}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote-details" className={labelClasses}>
          Application details & operating conditions
          <RequiredMark />
        </label>
        <textarea
          id="quote-details"
          name="details"
          rows={3}
          required
          placeholder="Mention contact fluids (e.g. mineral transformer oil), temperature limits, or drawing references."
          className={`mt-1 ${fieldClasses}`}
        />
      </div>

      <Button
        type="submit"
        className="w-full rounded-xl py-3 text-sm font-semibold shadow-xs"
        aria-disabled={isSubmitting}
      >
        <Send className="size-4 mr-2" />
        {isSubmitting ? "Submitting quotation request…" : "Submit quotation request"}
      </Button>

      <p className="text-center text-[11px] text-muted">
        Standard turnaround: Technical feedback and commercial quotation within 24 working hours.
      </p>
    </form>
  );
}