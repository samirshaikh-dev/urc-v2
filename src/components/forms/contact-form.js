"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/data/company";

const ENQUIRY_TYPES = [
  "Request a quotation",
  "Discuss a custom requirement",
  "Ask about a product",
  "Bulk or repeat supply",
];

const INITIAL_VALUES = {
  enquiryType: ENQUIRY_TYPES[0],
  name: "",
  company: "",
  email: "",
  phone: "",
  product: "",
  quantity: "",
  message: "",
};

const FIELD_ORDER = ["name", "company", "email", "phone", "product", "quantity", "message"];

const FIELD_IDS = {
  name: "contact-name",
  company: "contact-company",
  email: "contact-email",
  phone: "contact-phone",
  product: "contact-product",
  quantity: "contact-quantity",
  message: "contact-message",
};

const fieldClasses =
  "mt-1 w-full rounded-control border bg-field px-3 py-2.5 text-sm text-ink placeholder:text-muted transition-colors duration-150 focus:border-maroon focus:bg-white";

const labelClasses = "block text-sm font-medium text-ink";

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
    errors.name = "Enter your name.";
  }

  if (!values.company.trim()) {
    errors.company = "Enter your company or organisation.";
  }

  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address, for example name@company.com.";
  }

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (values.phone.trim() && (phoneDigits.length < 7 || phoneDigits.length > 15)) {
    errors.phone = "Enter a phone number with 7 to 15 digits, or leave this blank.";
  }

  if (!values.message.trim()) {
    errors.message = "Describe what you need so the team can respond usefully.";
  } else if (values.message.trim().length < 20) {
    errors.message = "Add a little more detail, at least 20 characters.";
  }

  return errors;
}

/**
 * The site has no configured enquiry endpoint yet. Rather than simulating a
 * successful submission, this builds a real email draft addressed to the
 * company and opens it in the visitor's mail app. Replace this handler with a
 * POST to the external backend once the endpoint and spam protection exist.
 */
function buildMailto(values) {
  const subject = `Enquiry — ${values.product.trim() || values.enquiryType}`;

  const lines = [
    `Enquiry type: ${values.enquiryType}`,
    `Name: ${values.name.trim()}`,
    `Company: ${values.company.trim()}`,
    `Email: ${values.email.trim()}`,
    values.phone.trim() ? `Phone: ${values.phone.trim()}` : null,
    values.product.trim() ? `Product or application: ${values.product.trim()}` : null,
    values.quantity.trim() ? `Quantity: ${values.quantity.trim()}` : null,
    "",
    "Requirement:",
    values.message.trim(),
  ].filter((line) => line !== null);

  return `mailto:${COMPANY_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    lines.join("\n")
  )}`;
}

export function ContactForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [preparedHref, setPreparedHref] = useState("");
  const preparedHeadingRef = useRef(null);

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

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((key) => nextErrors[key]);
    if (firstInvalid) {
      // Moving focus to the field also announces its error through
      // aria-describedby, so no separate live-region announcement is needed.
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return;
    }

    const href = buildMailto(values);
    setPreparedHref(href);
    // Opening the draft here, inside the submit event, keeps the user gesture
    // that mail clients require.
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
      <div>
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-control border border-maroon/20 bg-maroon/5 text-maroon">
            <Check className="size-5" aria-hidden="true" />
          </span>
          <div>
            <h3
              ref={preparedHeadingRef}
              tabIndex={-1}
              className="text-lg font-semibold tracking-tight text-ink sm:text-xl"
            >
              Your email draft is ready
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              This page does not send the enquiry itself. Your details have been placed in
              an email addressed to{" "}
              <span className="font-medium text-ink">{COMPANY_INFO.email}</span>. Send it
              from your email app to complete the enquiry.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button href={preparedHref} size="md">
            <Mail className="size-4" aria-hidden="true" />
            Open email draft
          </Button>
          <Button type="button" variant="secondary" size="md" onClick={handleEdit}>
            Edit enquiry
          </Button>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          If your email app did not open, use the button above or write directly to{" "}
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="font-medium text-maroon underline-offset-4 hover:underline"
          >
            {COMPANY_INFO.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="enquiry-heading"
      className="space-y-5"
      noValidate
    >
      <p className="text-xs text-muted">
        Fields marked <span className="font-semibold text-orange-ink">*</span> are required.
      </p>

      {Object.keys(errors).length > 0 && (
        <p className="rounded-control border border-maroon/30 bg-maroon/5 px-3 py-2.5 text-sm text-maroon">
          Please check the highlighted fields below.
        </p>
      )}

      <fieldset>
        <legend className={labelClasses}>Enquiry type</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {ENQUIRY_TYPES.map((type) => (
            <label key={type} className="relative cursor-pointer">
              <input
                type="radio"
                name="enquiryType"
                value={type}
                checked={values.enquiryType === type}
                onChange={handleChange}
                className="peer sr-only"
              />
              <span className="flex min-h-11 items-center rounded-control border border-line-strong bg-white py-2 pr-8 pl-3 text-xs font-medium text-ink transition-colors duration-150 peer-checked:border-maroon peer-checked:bg-maroon/5 peer-checked:font-semibold peer-checked:text-maroon peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-maroon sm:text-sm">
                {type}
              </span>
              <Check
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-maroon opacity-0 peer-checked:opacity-100"
              />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
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
            maxLength={120}
            value={values.name}
            onChange={handleChange}
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? `${FIELD_IDS.name}-error` : undefined}
            className={`${fieldClasses} ${errors.name ? "border-maroon" : "border-line-strong"}`}
          />
          {errors.name && (
            <p id={`${FIELD_IDS.name}-error`} className="mt-1 text-xs font-medium text-maroon">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={FIELD_IDS.company} className={labelClasses}>
            Company or organisation
            <RequiredMark />
          </label>
          <input
            id={FIELD_IDS.company}
            name="company"
            type="text"
            required
            autoComplete="organization"
            maxLength={160}
            value={values.company}
            onChange={handleChange}
            aria-invalid={errors.company ? "true" : undefined}
            aria-describedby={errors.company ? `${FIELD_IDS.company}-error` : undefined}
            className={`${fieldClasses} ${errors.company ? "border-maroon" : "border-line-strong"}`}
          />
          {errors.company && (
            <p id={`${FIELD_IDS.company}-error`} className="mt-1 text-xs font-medium text-maroon">
              {errors.company}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={FIELD_IDS.email} className={labelClasses}>
            Email
            <RequiredMark />
          </label>
          <input
            id={FIELD_IDS.email}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            value={values.email}
            onChange={handleChange}
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? `${FIELD_IDS.email}-error` : undefined}
            className={`${fieldClasses} ${errors.email ? "border-maroon" : "border-line-strong"}`}
          />
          {errors.email && (
            <p id={`${FIELD_IDS.email}-error`} className="mt-1 text-xs font-medium text-maroon">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={FIELD_IDS.phone} className={labelClasses}>
            Phone or WhatsApp <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id={FIELD_IDS.phone}
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={32}
            value={values.phone}
            onChange={handleChange}
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={
              errors.phone ? `${FIELD_IDS.phone}-error` : `${FIELD_IDS.phone}-hint`
            }
            className={`${fieldClasses} ${errors.phone ? "border-maroon" : "border-line-strong"}`}
          />
          {errors.phone ? (
            <p id={`${FIELD_IDS.phone}-error`} className="mt-1 text-xs font-medium text-maroon">
              {errors.phone}
            </p>
          ) : (
            <p id={`${FIELD_IDS.phone}-hint`} className="mt-1 text-xs text-muted">
              Include a country code if you are outside India.
            </p>
          )}
        </div>

        <div>
          <label htmlFor={FIELD_IDS.product} className={labelClasses}>
            Product or application <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id={FIELD_IDS.product}
            name="product"
            type="text"
            maxLength={200}
            value={values.product}
            onChange={handleChange}
            placeholder="e.g. 3 mm NBR rubberised cork sheet"
            className={`${fieldClasses} border-line-strong placeholder:text-muted/80`}
          />
        </div>

        <div>
          <label htmlFor={FIELD_IDS.quantity} className={labelClasses}>
            Quantity <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id={FIELD_IDS.quantity}
            name="quantity"
            type="text"
            maxLength={120}
            value={values.quantity}
            onChange={handleChange}
            placeholder="e.g. 500 sheets or 1,000 gaskets"
            className={`${fieldClasses} border-line-strong placeholder:text-muted/80`}
          />
        </div>
      </div>

      <div>
        <label htmlFor={FIELD_IDS.message} className={labelClasses}>
          Message or technical requirements
          <RequiredMark />
        </label>
        <textarea
          id={FIELD_IDS.message}
          name="message"
          rows={5}
          required
          maxLength={1000}
          value={values.message}
          onChange={handleChange}
          aria-invalid={errors.message ? "true" : undefined}
          aria-describedby={
            errors.message ? `${FIELD_IDS.message}-error` : `${FIELD_IDS.message}-hint`
          }
          placeholder="Describe dimensions, thickness, operating conditions, drawing references or batch quantity."
          className={`${fieldClasses} ${
            errors.message ? "border-maroon" : "border-line-strong"
          } placeholder:text-muted/80`}
        />
        {errors.message ? (
          <p
            id={`${FIELD_IDS.message}-error`}
            className="mt-1 text-xs font-medium text-maroon"
          >
            {errors.message}
          </p>
        ) : (
          <p id={`${FIELD_IDS.message}-hint`} className="mt-1 text-xs text-muted">
            Include what the part or material is used for, and attach any drawing once the
            email draft opens.
          </p>
        )}
      </div>

      <div className="border-t border-line pt-5">
        <Button type="submit" size="md" className="w-full sm:w-auto">
          <Mail className="size-4" aria-hidden="true" />
          Prepare email enquiry
        </Button>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          This opens an email draft in your mail app so you can review and send it. Prefer
          to write directly? Email{" "}
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="font-medium text-maroon underline-offset-4 hover:underline"
          >
            {COMPANY_INFO.email}
          </a>
          .
        </p>
      </div>
    </form>
  );
}
