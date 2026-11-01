"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const fieldClasses =
  "w-full rounded-control border border-line-strong bg-field px-3.5 py-2.5 text-sm text-ink placeholder:text-muted transition-colors duration-150 focus:border-maroon";

const labelClasses = "block text-sm font-medium text-ink";

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-orange-ink">
      {" "}
      *
    </span>
  );
}

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successRef = useRef(null);

  useEffect(() => {
    if (submitted) successRef.current?.focus();
  }, [submitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    // Submission handler is not connected yet — see project notes.
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div ref={successRef} tabIndex={-1} className="py-6 text-center focus:outline-none">
        <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-maroon/5 text-maroon">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-xl font-semibold text-maroon">Enquiry received</h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
          Thank you for contacting New United Rubber Cork. Our technical team will
          review your specifications and respond.
        </p>
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
      <p className="text-xs text-muted">Fields marked * are required.</p>

      <div className="grid gap-5 sm:grid-cols-2">
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
            className={`mt-1.5 ${fieldClasses}`}
          />
        </div>

        <div>
          <label htmlFor="quote-company" className={labelClasses}>
            Company name
          </label>
          <input
            id="quote-company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="e.g. Apex Transformers Ltd."
            className={`mt-1.5 ${fieldClasses}`}
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
            className={`mt-1.5 ${fieldClasses}`}
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
            className={`mt-1.5 ${fieldClasses}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="quote-details" className={labelClasses}>
          Product or specification details
          <RequiredMark />
        </label>
        <textarea
          id="quote-details"
          name="details"
          rows={4}
          required
          placeholder="Material, thickness, dimensions, quantity or application."
          className={`mt-1.5 ${fieldClasses}`}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        aria-disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting…" : "Submit quotation request"}
      </Button>
    </form>
  );
}
