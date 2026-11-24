"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Copy, Loader2, MessageCircle } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { createLeadAction, createWhatsAppEnquiryAction } from "@/api/contacts/public/create-lead";
import { COMPANY_INFO } from "@/data/company";
import { toast } from "sonner";

const INITIAL_VALUES = {
  name: "",
  company: "",
  email: "",
  phone: "",
  product: "",
  message: "",
  _hp: "",
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
      {" "}*
    </span>
  );
}

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter your full name.";
  if (!values.company.trim()) errors.company = "Enter your company name.";
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

// ── Success Popup Modal ────────────────────────────────────────────────────────

function SuccessModal({ data, viaWhatsApp, waDbFailed, emailFailed, onClose, onReset }) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    headingRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!mounted) return null;

  const firstName = data.name?.trim().split(/\s+/)[0] || data.name || "there";
  const whatsappNumber = (COMPANY_INFO.whatsapp || "919924304617").replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello United RubCork, following up on Enquiry Ref: ${data.id || "N/A"}.\nCompany: ${data.company || "-"}\nI would like to share our technical drawing / specification.`
  )}`;

  const handleCopy = async () => {
    if (!data.id) return;
    try {
      await navigator.clipboard.writeText(data.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-heading"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal Surface */}
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-white p-7 sm:p-9 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center">
        {/* Animated Solid Maroon Circle with White Tick */}
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-maroon text-white shadow-md animate-in zoom-in-50 duration-400 ease-out">
          <Check className="size-6 text-white stroke-[2.5]" aria-hidden="true" />
        </div>

        {/* Heading */}
        <h3
          id="success-modal-heading"
          ref={headingRef}
          tabIndex={-1}
          className="mt-4 text-xl font-bold tracking-tight text-ink sm:text-2xl focus:outline-none"
        >
          Thank you, {firstName}
        </h3>

        {/* Shorter, Warmer Message (No yellow highlight) */}
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {viaWhatsApp ? (
            waDbFailed ? (
              <>WhatsApp has been opened with your enquiry. Please make sure to send the prefilled message so our team receives your requirements.</>
            ) : (
              <>We&apos;ve received your enquiry for <strong className="font-semibold text-ink">{data.company}</strong>. WhatsApp has been opened with your details.</>
            )
          ) : emailFailed ? (
            <>We&apos;ve received your enquiry for <strong className="font-semibold text-ink">{data.company}</strong>. Our engineering desk has your requirements safe.</>
          ) : (
            <>We&apos;ve received your enquiry for <strong className="font-semibold text-ink">{data.company}</strong>. A confirmation is on its way to <strong className="font-semibold text-ink">{data.email}</strong>.</>
          )}
        </p>

        {/* Promise as clear subheading */}
        <p className="mt-1.5 text-xs sm:text-sm font-semibold text-orange-ink">
          Our engineers will reply within 24 business hours.
        </p>

        {/* Borderless 2-Line Summary Block */}
        <div className="mt-5 rounded-xl bg-page/70 p-3.5 sm:p-4 text-left text-xs sm:text-sm space-y-2">
          {data.id && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted">Reference</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-maroon text-xs sm:text-sm">{data.id}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  title="Copy reference number"
                  aria-label="Copy reference number"
                  className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium text-muted hover:bg-white hover:text-ink transition-colors cursor-pointer"
                >
                  {copied ? (
                    <span className="text-xs font-semibold text-emerald-600">Copied!</span>
                  ) : (
                    <Copy className="size-3.5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted">Requirement</span>
            <span className="font-medium text-ink text-right max-w-[65%] truncate">
              {data.product || "General Inquiry / Other"}
            </span>
          </div>
        </div>

        {/* What Happens Next: Mini Timeline */}
        <div className="my-6">
          <div className="flex items-center justify-between text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 font-medium text-ink">
              <span className="size-2 rounded-full bg-maroon ring-2 ring-maroon/20" />
              <span>Review</span>
            </div>
            <div className="h-px flex-1 bg-line mx-2" />
            <div className="flex items-center gap-1.5 font-medium text-muted">
              <span className="size-2 rounded-full bg-line-strong" />
              <span>Reply / quote</span>
            </div>
            <div className="h-px flex-1 bg-line mx-2" />
            <div className="flex items-center gap-1.5 font-medium text-muted">
              <span className="size-2 rounded-full bg-line-strong" />
              <span>Samples &amp; dispatch</span>
            </div>
          </div>
        </div>

        {/* Action Hierarchy */}
        <div className="space-y-3">
          {/* Primary: Done */}
          <Button
            type="button"
            size="md"
            className="w-full max-w-xs mx-auto rounded-full py-2.5 font-semibold shadow-sm"
            onClick={onClose}
          >
            Done
          </Button>

          {/* Secondary: WhatsApp drawing link for faster reply */}
          <div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 text-xs font-medium text-ink hover:text-maroon transition-colors"
            >
              <MessageCircle className="size-3.5 text-orange-ink" aria-hidden="true" />
              <span>Prefer a faster reply? <strong className="font-semibold text-maroon hover:underline">WhatsApp us your drawing &rarr;</strong></span>
            </a>
          </div>

          {/* Tertiary: Submit another enquiry as small text link */}
          <div>
            <button
              type="button"
              onClick={onReset}
              className="text-xs text-muted hover:text-ink underline-offset-4 hover:underline transition-colors cursor-pointer"
            >
              Submit another enquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// ── Form inner ─────────────────────────────────────────────────────────────────

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

  useEffect(() => {
    if (queryProduct) setValues((prev) => ({ ...prev, product: queryProduct }));
  }, [queryProduct]);

  const isAnySubmitting = submitting !== null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((cur) => ({ ...cur, [name]: value }));
    if (errors[name]) {
      setErrors((cur) => {
        const n = { ...cur };
        delete n[name];
        return n;
      });
    }
  };

  function runValidation() {
    if (values._hp) return false;
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((k) => nextErrors[k]);
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return false;
    }
    return true;
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (isAnySubmitting || !runValidation()) return;
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
        setSubmittedData(res.lead);
        setEmailFailed(!!res.emailFailed);
        setIsSubmitted(true);
      } else {
        setSubmitError(res.error || "Failed to submit enquiry. Please try again.");
        toast.error(res.error || "Failed to submit enquiry.");
      }
    } catch {
      setSubmitError("An unexpected error occurred. Please try again or email us directly.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(null);
    }
  };

  const handleWhatsAppSubmit = async (e) => {
    e.preventDefault();
    if (isAnySubmitting || !runValidation()) return;
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
        if (res.dbFailed) {
          toast.warning("Could not save to our system — please send the WhatsApp message to reach our team.");
        }
        window.open(res.whatsappUrl, "_blank", "noopener,noreferrer");
        setSubmittedData({ ...res.lead, _via: "whatsapp", _dbFailed: res.dbFailed });
        setEmailFailed(false);
        setIsSubmitted(true);
      } else {
        setSubmitError(res.error || "Failed to save your enquiry. Please try again.");
        toast.error(res.error || "Failed to save enquiry. WhatsApp was not opened.");
      }
    } catch {
      setSubmitError("An unexpected error occurred. Please try again or contact us directly.");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(null);
    }
  };

  const handleCloseModal = () => {
    setIsSubmitted(false);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    setEmailFailed(false);
    setValues(INITIAL_VALUES);
  };

  return (
    <>
      {/* Popup Modal upon successful submission */}
      {isSubmitted && submittedData && (
        <SuccessModal
          data={submittedData}
          viaWhatsApp={submittedData._via === "whatsapp"}
          waDbFailed={submittedData._dbFailed === true}
          emailFailed={emailFailed}
          onClose={handleCloseModal}
          onReset={handleResetForm}
        />
      )}

      {/* Contact Form stays visible underneath */}
      <form onSubmit={handleEmailSubmit} noValidate className="space-y-5">
        {/* Honeypot */}
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

        {/* Row 1: Name & Company */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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

        {/* Product */}
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

        {/* Message */}
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
          <div role="alert" className="rounded-xl border border-maroon/20 bg-maroon/5 p-3.5 text-xs text-maroon">
            {submitError}
          </div>
        )}

        {/* Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
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
    </>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-xs text-muted">Loading enquiry form...</div>}>
      <ContactFormInner />
    </Suspense>
  );
}
