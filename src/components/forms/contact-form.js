"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/data/company";

const BASE_PRODUCT_OPTIONS = [
  "Select product or material...",
  "Rubberised Cork Sheets (RC Sheets)",
  "Transformer Gaskets, Strips & Endless Rings",
  "Continuous Rubber Cork Rolls",
  "Plain Natural Cork Sheets & Rolls",
  "Industrial Cork Granules & Graded Cork",
  "Cork Expansion Joint Filler Boards",
  "Acoustic Cork Wall Tiles",
  "Architectural Decorative Cork Panels",
  "Bulletin Board & Pinning Cork Sheets",
  "Cork Desk Organizers & Office Accessories",
  "Eco-Friendly Lifestyle Cork Gifts",
  "Custom OEM Corporate Cork Merchandise",
  "Custom CNC Drawing-Based Gaskets & Dovetails",
  "General Inquiry / Other",
];

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
  } else if (values.message.trim().length < 15) {
    errors.message = "Please provide at least 15 characters describing your requirement.";
  }

  return errors;
}

function buildMailto(values) {
  const subject = `B2B Enquiry — ${values.product && values.product !== BASE_PRODUCT_OPTIONS[0] ? values.product : "Industrial Cork Solution"}`;

  const lines = [
    `Full Name: ${values.name.trim()}`,
    `Company Name: ${values.company.trim()}`,
    `Business Email: ${values.email.trim()}`,
    values.phone.trim() ? `Phone: ${values.phone.trim()}` : null,
    values.product && values.product !== BASE_PRODUCT_OPTIONS[0]
      ? `Product / Material: ${values.product}`
      : null,
    "",
    "Requirement Details:",
    values.message.trim(),
  ].filter((line) => line !== null);

  return `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join("\n")
  )}`;
}

function ContactFormInner() {
  const searchParams = useSearchParams();
  const queryProduct = searchParams ? searchParams.get("product") : null;

  const [values, setValues] = useState(() => ({
    ...INITIAL_VALUES,
    product: queryProduct || "",
  }));
  const [productOptions, setProductOptions] = useState(BASE_PRODUCT_OPTIONS);
  const [errors, setErrors] = useState({});
  const [preparedHref, setPreparedHref] = useState("");
  const preparedHeadingRef = useRef(null);

  // Sync query parameter with selected material if passed
  useEffect(() => {
    if (queryProduct) {
      if (!productOptions.includes(queryProduct)) {
        setProductOptions([BASE_PRODUCT_OPTIONS[0], queryProduct, ...BASE_PRODUCT_OPTIONS.slice(1)]);
      }
      setValues((prev) => ({ ...prev, product: queryProduct }));
    }
  }, [queryProduct]);

  useEffect(() => {
    if (preparedHref) {
      preparedHeadingRef.current?.focus();
    }
  }, [preparedHref]);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Honeypot spam detection
    if (values._hp) {
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((key) => nextErrors[key]);
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return;
    }

    const href = buildMailto(values);
    setPreparedHref(href);
    window.location.href = href;
  };

  const handleEdit = () => {
    setPreparedHref("");
    window.requestAnimationFrame(() => {
      document.getElementById(FIELD_IDS.name)?.focus();
    });
  };

  if (preparedHref) {
    return (
      <div className="rounded-2xl border border-line bg-page/50 p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-maroon/20 bg-maroon/5 text-maroon">
            <Check className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3
              ref={preparedHeadingRef}
              tabIndex={-1}
              className="text-lg font-semibold tracking-tight text-ink sm:text-xl"
            >
              Enquiry draft prepared
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Your details have been assembled into an email addressed to{" "}
              <strong className="text-ink">{COMPANY_INFO.email}</strong>. Send it directly from your email client to complete your submission.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button href={preparedHref} size="md" className="rounded-full px-6">
            <Mail className="size-4 mr-2" aria-hidden="true" />
            Open email draft
          </Button>
          <Button type="button" variant="secondary" size="md" className="rounded-full px-6" onClick={handleEdit}>
            Edit details
          </Button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          Did your email app not open? Send your details manually to{" "}
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="font-medium text-maroon hover:underline"
          >
            {COMPANY_INFO.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot field for bot spam prevention */}
      <input
        type="text"
        name="_hp"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        value={values._hp}
        onChange={handleChange}
      />

      {Object.keys(errors).length > 0 && (
        <div className="rounded-xl border border-maroon/20 bg-maroon/5 p-3.5 text-xs text-maroon">
          Please correct the highlighted fields below before submitting.
        </div>
      )}

      {/* Product Highlight Banner if preselected */}
      {values.product && values.product !== BASE_PRODUCT_OPTIONS[0] && (
        <div className="rounded-xl border border-line bg-page px-3.5 py-2 text-xs text-ink/80 flex items-center justify-between">
          <span>Inquiring about: <strong className="text-maroon">{values.product}</strong></span>
          <button
            type="button"
            onClick={() => setValues((prev) => ({ ...prev, product: "" }))}
            className="text-[11px] text-muted hover:text-maroon underline cursor-pointer"
          >
            Clear selection
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Full Name */}
        <div>
          <label htmlFor={FIELD_IDS.name} className={labelClasses}>
            Full name
            <RequiredMark />
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
            <p id={`${FIELD_IDS.name}-error`} className="mt-1 text-xs text-maroon">
              {errors.name}
            </p>
          )}
        </div>

        {/* Company Name */}
        <div>
          <label htmlFor={FIELD_IDS.company} className={labelClasses}>
            Company name
            <RequiredMark />
          </label>
          <input
            id={FIELD_IDS.company}
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder="e.g. Premier Transformers Ltd."
            value={values.company}
            onChange={handleChange}
            aria-invalid={errors.company ? "true" : undefined}
            aria-describedby={errors.company ? `${FIELD_IDS.company}-error` : undefined}
            className={`${fieldClasses} ${errors.company ? "border-maroon" : "border-line"}`}
          />
          {errors.company && (
            <p id={`${FIELD_IDS.company}-error`} className="mt-1 text-xs text-maroon">
              {errors.company}
            </p>
          )}
        </div>

        {/* Business Email */}
        <div>
          <label htmlFor={FIELD_IDS.email} className={labelClasses}>
            Business email
            <RequiredMark />
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
            <p id={`${FIELD_IDS.email}-error`} className="mt-1 text-xs text-maroon">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor={FIELD_IDS.phone} className={labelClasses}>
            Phone number <span className="font-normal text-muted lowercase">(optional)</span>
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
            <p id={`${FIELD_IDS.phone}-error`} className="mt-1 text-xs text-maroon">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Product / Material Interested In Dropdown */}
      <div>
        <label htmlFor={FIELD_IDS.product} className={labelClasses}>
          Product / material interested in
        </label>
        <select
          id={FIELD_IDS.product}
          name="product"
          value={values.product}
          onChange={handleChange}
          className={`${fieldClasses} border-line bg-field cursor-pointer`}
        >
          {productOptions.map((opt, i) => (
            <option key={opt} value={i === 0 && !queryProduct ? "" : opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor={FIELD_IDS.message} className={labelClasses}>
          Message &amp; technical specifications
          <RequiredMark />
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
          <p id={`${FIELD_IDS.message}-error`} className="mt-1 text-xs text-maroon">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          size="md"
          className="w-full sm:w-auto rounded-full px-8 shadow-sm group"
        >
          <span>Submit Enquiry</span>
          <ArrowRight className="size-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
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
