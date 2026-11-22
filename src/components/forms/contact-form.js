"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createLeadAction, createWhatsAppEnquiryAction } from "@/api/contacts/public/create-lead";
import { toast } from "sonner";

const INITIAL_VALUES = {
  name: "",
  company: "",
  email: "",
  phone: "",
  product: "",
  message: "",
  _hp: "", // Honeypot spam protection
};

const FIELD_ORDER = ["name", "company", "email", "phone", "product", "message"];

const FIELD_IDS = {
  name: "contact-name",
  company: "contact-company",
  email: "contact-email",
  phone: "contact-phone",
  product: "contact-product",
  message: "contact-message",
};

const fieldClasses =
  "mt-1.5 w-full rounded-xl border bg-field px-3.5 py-2.5 text-sm text-ink placeholder:text-muted transition-colors duration-150 focus:border-maroon focus:bg-white focus:outline-none focus:ring-1 focus:ring-maroon";

const labelClasses = "block text-xs font-semibold uppercase tracking-wider text-ink";

function RequiredMark() {
  return (
    <span aria-hidden="true" className="font-semibold text-orange-ink">
      {" "}
      *
    </span>
  );
}

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Enter your full name.";
  }

  if (!values.company.trim()) {
    errors.company = "Enter your company name.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your business email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address (e.g. name@company.com).";
  }

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (values.phone.trim() && (phoneDigits.length < 7 || phoneDigits.length > 15)) {
    errors.phone = "Enter a valid phone number with 7 to 15 digits.";
  }

  if (!values.message.trim()) {
    errors.message = "Please describe your material or application requirement.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Please provide at least 10 characters describing your requirement.";
  }

  return errors;
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const queryProduct = searchParams ? searchParams.get("product") : null;

  const [values, setValues] = useState(() => ({
    ...INITIAL_VALUES,
    product: queryProduct || "",
  }));
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(null); // null | 'email' | 'whatsapp'
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [emailFailed, setEmailFailed] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const successHeadingRef = useRef(null);

  // Sync query parameter with open text field if passed
  useEffect(() => {
    if (queryProduct) {
      setValues((prev) => ({ ...prev, product: queryProduct }));
    }
  }, [queryProduct]);

  useEffect(() => {
    if (isSubmitted) {
      successHeadingRef.current?.focus();
    }
  }, [isSubmitted]);

  const isAnySubmitting = submitting !== null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
  };

  function runValidation() {
    // Honeypot spam detection
    if (values._hp) return false;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((key) => nextErrors[key]);
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return false;
    }
    return true;
  }

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    if (isAnySubmitting) return;
    if (!runValidation()) return;

    setSubmitting("email");
    setSubmitError("");

    try {
      const res = await createLeadAction({
        name: values.name,
        company: values.company,
        email: values.email,
        phone: values.phone,
        product: values.product?.trim() || "General Inquiry / Other",
        message: values.message,
      });

      if (res.success) {
        setIsSubmitted(true);
        setSubmittedData(res.lead);
        setEmailFailed(!!res.emailFailed);
        if (res.emailFailed) {
          toast.success("Enquiry received. Email confirmation could not be delivered.");
        } else {
          toast.success("Enquiry submitted! A confirmation email has been sent.");
        }
      } else {
        setSubmitError(res.error || "Failed to submit enquiry. Please try again.");
        toast.error(res.error || "Failed to submit enquiry.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError("An unexpected error occurred. Please try again or email us directly.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(null);
    }
  };

  const handleWhatsAppSubmit = async (event) => {
    event.preventDefault();
    if (isAnySubmitting) return;
    if (!runValidation()) return;

    setSubmitting("whatsapp");
    setSubmitError("");

    try {
      const res = await createWhatsAppEnquiryAction({
        name: values.name,
        company: values.company,
        email: values.email,
        phone: values.phone,
        product: values.product?.trim() || "General Inquiry / Other",
        message: values.message,
      });

      if (res.success && res.whatsappUrl) {
        // DB save confirmed — now open WhatsApp
        toast.success("Enquiry saved. Opening WhatsApp…");
        window.open(res.whatsappUrl, "_blank", "noopener,noreferrer");
        setIsSubmitted(true);
        setSubmittedData({ ...res.lead, _via: "whatsapp" });
        setEmailFailed(false);
      } else {
        setSubmitError(res.error || "Failed to save your enquiry. Please try again.");
        toast.error(res.error || "Failed to save enquiry. WhatsApp was not opened.");
      }
    } catch (err) {
      console.error("WhatsApp submission error:", err);
      setSubmitError("An unexpected error occurred. Please try again or contact us directly.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(null);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setEmailFailed(false);
    setValues(INITIAL_VALUES);
  };

  if (isSubmitted && submittedData) {
    const viaWhatsApp = submittedData._via === "whatsapp";

    return (
      <div className="rounded-2xl border border-line bg-page/50 p-6 sm:p-8 animate-in fade-in duration-200">
        <div className="flex items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-maroon/20 bg-maroon/5 text-maroon shadow-2xs">
            <Check className="size-6 text-maroon" aria-hidden="true" />
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-ink">
              Enquiry Received
            </span>
            <h3
              ref={successHeadingRef}
              tabIndex={-1}
              className="mt-1 text-xl font-bold tracking-tight text-ink sm:text-2xl"
            >
              Thank you, {submittedData.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {viaWhatsApp ? (
                <>
                  Your enquiry for{" "}
                  <strong className="text-ink">{submittedData.company}</strong> has been saved.
                  WhatsApp has been opened — please review and send the prefilled message to
                  complete your enquiry.
                </>
              ) : emailFailed ? (
                <>
                  Your enquiry for{" "}
                  <strong className="text-ink">{submittedData.company}</strong> has been received
                  and saved. We were unable to send a confirmation email to{" "}
                  <strong className="text-ink">{submittedData.email}</strong>, but your enquiry is
                  safe and our team will follow up.
                </>
              ) : (
                <>
                  Your enquiry for{" "}
                  <strong className="text-ink">{submittedData.company}</strong> has been saved and
                  a confirmation email has been dispatched to{" "}
                  <strong className="text-ink">{submittedData.email}</strong>.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-line bg-white p-5 text-xs sm:text-sm space-y-2.5">
          <div className="flex justify-between border-b border-line/60 pb-2">
            <span className="text-muted">Enquiry Reference:</span>
            <span className="font-mono font-semibold text-maroon">{submittedData.id}</span>
          </div>
          <div className="flex justify-between border-b border-line/60 pb-2">
            <span className="text-muted">Product / Requirement:</span>
            <span className="font-semibold text-ink">{submittedData.product}</span>
          </div>
          <div className="flex justify-between border-b border-line/60 pb-2">
            <span className="text-muted">Company:</span>
            <span className="font-semibold text-ink">{submittedData.company}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Expected Response:</span>
            <span className="font-medium text-orange-ink">Within 24 business hours</span>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="button" size="md" className="rounded-full px-6" onClick={handleReset}>
            Submit another enquiry
          </Button>
          <Button href="/" variant="secondary" size="md" className="rounded-full px-6">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleEmailSubmit} noValidate className="space-y-5">
      {/* Honeypot Spam Protection Field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-hp">Do not fill this field</label>
        <input
          id="contact-hp"
          name="_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values._hp}
          onChange={handleChange}
        />
      </div>

      {/* Row 1: Full Name & Company Name */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label htmlFor={FIELD_IDS.name} className={labelClasses}>
            Full name <RequiredMark />
          </label>
          <input
            id={FIELD_IDS.name}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="e.g. Rajesh Sharma"
            value={values.name}
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? `${FIELD_IDS.name}-error` : undefined}
            className={`${fieldClasses} ${errors.name ? "border-maroon" : "border-line"}`}
          />
          {errors.name && (
            <p id={`${FIELD_IDS.name}-error`} className="mt-1 text-xs text-maroon" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor={FIELD_IDS.company} className={labelClasses}>
            Company name <RequiredMark />
          </label>
          <input
            id={FIELD_IDS.company}
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder="e.g. VoltPower Transformers Pvt Ltd"
            value={values.company}
            onChange={handleChange}
            aria-invalid={errors.company ? "true" : undefined}
            aria-describedby={errors.company ? `${FIELD_IDS.company}-error` : undefined}
            className={`${fieldClasses} ${errors.company ? "border-maroon" : "border-line"}`}
          />
          {errors.company && (
            <p id={`${FIELD_IDS.company}-error`} className="mt-1 text-xs text-maroon" role="alert">
              {errors.company}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Email & Phone */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Email Address */}
        <div>
          <label htmlFor={FIELD_IDS.email} className={labelClasses}>
            Business email <RequiredMark />
          </label>
          <input
            id={FIELD_IDS.email}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder="e.g. rajesh@company.com"
            value={values.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? `${FIELD_IDS.email}-error` : undefined}
            className={`${fieldClasses} ${errors.email ? "border-maroon" : "border-line"}`}
          />
          {errors.email && (
            <p id={`${FIELD_IDS.email}-error`} className="mt-1 text-xs text-maroon" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor={FIELD_IDS.phone} className={labelClasses}>
            Phone number{" "}
            <span className="text-muted font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <input
            id={FIELD_IDS.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+91 98765 43210"
            value={values.phone}
            onChange={handleChange}
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? `${FIELD_IDS.phone}-error` : undefined}
            className={`${fieldClasses} ${errors.phone ? "border-maroon" : "border-line"}`}
          />
          {errors.phone && (
            <p id={`${FIELD_IDS.phone}-error`} className="mt-1 text-xs text-maroon" role="alert">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Product / Material Interested In */}
      <div>
        <label htmlFor={FIELD_IDS.product} className={labelClasses}>
          Product / material interested in{" "}
          <span className="text-muted font-normal normal-case tracking-normal">(optional)</span>
        </label>
        <input
          type="text"
          id={FIELD_IDS.product}
          name="product"
          value={values.product}
          onChange={handleChange}
          placeholder="e.g. Rubberised cork sheets, transformer gaskets, RC70-C..."
          className={`${fieldClasses} border-line`}
        />
      </div>

      {/* Message / Requirement */}
      <div>
        <label htmlFor={FIELD_IDS.message} className={labelClasses}>
          Requirement details <RequiredMark />
        </label>
        <textarea
          id={FIELD_IDS.message}
          name="message"
          rows={4}
          required
          maxLength={1000}
          value={values.message}
          onChange={handleChange}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={errors.message ? `${FIELD_IDS.message}-error` : undefined}
          placeholder="Describe your required dimensions, thickness, contact fluids, operating temperature, or drawing references."
          className={`${fieldClasses} ${errors.message ? "border-maroon" : "border-line"}`}
        />
        {errors.message && (
          <p id={`${FIELD_IDS.message}-error`} className="mt-1 text-xs text-maroon" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Server error */}
      {submitError && (
        <div
          role="alert"
          className="rounded-xl border border-maroon/20 bg-maroon/5 p-3.5 text-xs text-maroon"
        >
          {submitError}
        </div>
      )}

      {/* Submit Buttons */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        {/* Primary: Submit Enquiry (email flow) */}
        <Button
          type="submit"
          size="md"
          disabled={isAnySubmitting}
          className="w-full sm:w-auto rounded-full px-8 shadow-sm group disabled:opacity-60"
        >
          {submitting === "email" ? (
            <>
              <Loader2 className="size-4 mr-1.5 animate-spin" aria-hidden="true" />
              <span>Submitting…</span>
            </>
          ) : (
            <>
              <span>Submit Enquiry</span>
              <ArrowRight
                className="size-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </>
          )}
        </Button>

        {/* Secondary: Submit via WhatsApp (db-first then open WA) */}
        <Button
          type="button"
          size="md"
          variant="secondary"
          disabled={isAnySubmitting}
          onClick={handleWhatsAppSubmit}
          className="w-full sm:w-auto rounded-full px-8 disabled:opacity-60"
        >
          {submitting === "whatsapp" ? (
            <>
              <Loader2 className="size-4 mr-1.5 animate-spin" aria-hidden="true" />
              <span>Saving…</span>
            </>
          ) : (
            <>
              <MessageCircle className="size-4 mr-1.5" aria-hidden="true" />
              <span>Submit via WhatsApp</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-xs text-muted">Loading enquiry form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
