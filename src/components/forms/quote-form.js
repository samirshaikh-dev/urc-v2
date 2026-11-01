"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission handler or API dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="p-8 text-center bg-[#F1F2F3] border border-[#E5E7EB] rounded-xl">
        <div className="w-10 h-10 rounded-full bg-[#650510]/10 text-[#650510] flex items-center justify-center mx-auto mb-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[#650510] mb-2">
          Enquiry Received
        </h3>
        <p className="text-sm text-[#5A5D63] max-w-md mx-auto">
          Thank you for reaching out to New United Rubber Cork. Our technical team will review your specifications and contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
            Your Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Rahul Sharma"
            className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F1F2F3] text-sm text-[#1A1A1A] placeholder:text-[#5A5D63]/60 focus:outline-none focus:ring-2 focus:ring-[#650510] focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
            Company Name
          </label>
          <input
            type="text"
            placeholder="e.g. Apex Transformers Ltd."
            className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F1F2F3] text-sm text-[#1A1A1A] placeholder:text-[#5A5D63]/60 focus:outline-none focus:ring-2 focus:ring-[#650510] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
            Work Email *
          </label>
          <input
            type="email"
            required
            placeholder="name@company.com"
            className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F1F2F3] text-sm text-[#1A1A1A] placeholder:text-[#5A5D63]/60 focus:outline-none focus:ring-2 focus:ring-[#650510] focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
            Phone / WhatsApp *
          </label>
          <input
            type="tel"
            required
            placeholder="+91-XXXXXXXXXX"
            className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F1F2F3] text-sm text-[#1A1A1A] placeholder:text-[#5A5D63]/60 focus:outline-none focus:ring-2 focus:ring-[#650510] focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A] mb-1">
          Product or Specification Details *
        </label>
        <textarea
          rows={4}
          required
          placeholder="Please describe material requirement, thickness, dimensions, or application..."
          className="w-full px-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-[#F1F2F3] text-sm text-[#1A1A1A] placeholder:text-[#5A5D63]/60 focus:outline-none focus:ring-2 focus:ring-[#650510] focus:border-transparent transition-all"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Quotation Request"}
      </Button>
    </form>
  );
}
