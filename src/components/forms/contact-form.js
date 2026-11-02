"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Send, ShieldCheck, FileCheck2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const INQUIRY_TYPES = [
  "Material Quotation",
  "Technical Drawing Review",
  "Request Material Samples",
  "Bulk Supply & Repeat Orders",
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

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
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
      toast.success("Enquiry Sent Successfully!", {
        description: "Our technical sales team will review your requirement and respond within 24 working hours.",
      });
    }, 600);
  };

  if (submitted) {
    return (
      <div ref={successRef} tabIndex={-1} className="py-10 text-center focus:outline-none">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-maroon/10 text-maroon">
          <Check className="size-7" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-2xl font-semibold text-maroon">Message received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          Thank you for reaching out to United Rubber Cork. Your message and requirements have been assigned to our technical sales desk. We will respond within 24 working hours.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 inline-flex text-xs font-semibold text-maroon hover:underline cursor-pointer"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-heading"
      aria-busy={isSubmitting}
      className="space-y-5"
    >
      <div className="flex items-center justify-between border-b border-line pb-3">
        <p className="text-xs text-muted">Fields marked with <span className="text-orange-ink">*</span> are required.</p>
        <div className="flex items-center gap-1.5 text-xs font-medium text-orange-ink">
          <ShieldCheck className="size-4" />
          <span>Confidential Drawing Review</span>
        </div>
      </div>

      {/* Inquiry Type Pills */}
      <div>
        <label className={labelClasses}>Select Enquiry Type</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {INQUIRY_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setInquiryType(type)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                inquiryType === type
                  ? "bg-maroon text-white shadow-2xs"
                  : "bg-field border border-line text-ink/80 hover:bg-white hover:border-maroon/30"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            Full name
            <RequiredMark />
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Vikram Mehta"
            className={`mt-1 ${fieldClasses}`}
          />
        </div>

        <div>
          <label htmlFor="contact-company" className={labelClasses}>
            Company or Organization
            <RequiredMark />
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder="e.g. Bharat Electricals Ltd."
            className={`mt-1 ${fieldClasses}`}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            Work email
            <RequiredMark />
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@company.com"
            className={`mt-1 ${fieldClasses}`}
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelClasses}>
            Phone or WhatsApp
            <RequiredMark />
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91-XXXXXXXXXX"
            className={`mt-1 ${fieldClasses}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className={labelClasses}>
          Product or Application of interest
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="e.g. Transformer gasket frames, 3mm NBR rubberised cork sheets"
          className={`mt-1 ${fieldClasses}`}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          Message or technical requirements
          <RequiredMark />
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          placeholder="Describe your dimensions, operating fluids, temperature conditions, drawing references, or batch quantity requirements."
          className={`mt-1 ${fieldClasses}`}
        />
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-line bg-page/70 p-3 text-xs text-muted">
        <FileCheck2 className="size-4 shrink-0 text-orange-ink" />
        <span>
          Have a CAD drawing (.dwg, .dxf) or PDF blueprint? You can describe key dimensions here and our team will provide a direct upload/reply channel.
        </span>
      </div>

      <Button
        type="submit"
        className="w-full rounded-xl py-3 text-sm font-semibold shadow-xs"
        aria-disabled={isSubmitting}
      >
        <Send className="size-4 mr-2" />
        {isSubmitting ? "Sending enquiry…" : "Send message"}
      </Button>

      <p className="text-center text-[11px] text-muted">
        Standard turnaround: Technical assessment and formal response within 24 working hours.
      </p>
    </form>
  );
}
