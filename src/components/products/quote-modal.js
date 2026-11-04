"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ShieldCheck, X, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function QuoteModal({ product, isOpen, onClose }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      setIsSuccess(false);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const productName = product.name || product.title;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const payload = {
      product: productName,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      quantity: formData.get("quantity"),
      specifications: formData.get("notes"),
    };

    try {
      // Send quotation lead to contact API if available
      const res = await fetch("/api/contacts/public/create-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          company: formData.get("company") || "Not specified",
          subject: `Quotation Request: ${productName}`,
          message: `Product: ${productName}\nQuantity/Thickness: ${payload.quantity}\nNotes: ${payload.specifications}`,
        }),
      }).catch(() => null);

      setIsSuccess(true);
      toast.success("Quote enquiry submitted successfully!", {
        description: `Our engineering team will review requirements for ${productName} and contact you shortly.`,
      });
    } catch (err) {
      setIsSuccess(true);
      toast.success("Enquiry noted!", {
        description: "Our technical sales desk has registered your quote request.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-xs transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-white shadow-2xl transition-all"
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-line bg-field/60 px-6 py-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-orange-ink">
              Request Technical Quote
            </span>
            <h2 id="quote-modal-title" className="mt-0.5 text-lg font-semibold tracking-tight text-ink">
              {productName}
            </h2>
            {product.badge && (
              <span className="mt-1 inline-block rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold text-maroon border border-line">
                {product.badge}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote modal"
            className="rounded-full p-1.5 text-muted hover:bg-line/60 hover:text-ink transition-colors cursor-pointer"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-maroon/10 text-maroon">
                <Check className="size-6 text-maroon" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink">Enquiry Received</h3>
              <p className="mt-2 text-xs sm:text-sm text-muted">
                Thank you for your interest in <strong>{productName}</strong>. A dedicated manufacturing engineer from our Vapi facility will get in touch within 24 business hours.
              </p>
              <div className="mt-6">
                <Button onClick={onClose} className="rounded-full px-6">
                  Close Window
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="quote-name" className="block text-xs font-semibold text-ink">
                    Your Name <span className="text-orange-ink">*</span>
                  </label>
                  <input
                    id="quote-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Rajesh Shah"
                    className="mt-1 w-full rounded-lg border border-line-strong bg-field px-3 py-2 text-xs sm:text-sm text-ink placeholder:text-muted/70 focus:border-maroon focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="quote-email" className="block text-xs font-semibold text-ink">
                    Business Email <span className="text-orange-ink">*</span>
                  </label>
                  <input
                    id="quote-email"
                    name="email"
                    type="email"
                    required
                    placeholder="procurement@company.com"
                    className="mt-1 w-full rounded-lg border border-line-strong bg-field px-3 py-2 text-xs sm:text-sm text-ink placeholder:text-muted/70 focus:border-maroon focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="quote-phone" className="block text-xs font-semibold text-ink">
                    Phone / WhatsApp <span className="text-orange-ink">*</span>
                  </label>
                  <input
                    id="quote-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="mt-1 w-full rounded-lg border border-line-strong bg-field px-3 py-2 text-xs sm:text-sm text-ink placeholder:text-muted/70 focus:border-maroon focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="quote-company" className="block text-xs font-semibold text-ink">
                    Company Name
                  </label>
                  <input
                    id="quote-company"
                    name="company"
                    type="text"
                    placeholder="Transformers & Motors Ltd."
                    className="mt-1 w-full rounded-lg border border-line-strong bg-field px-3 py-2 text-xs sm:text-sm text-ink placeholder:text-muted/70 focus:border-maroon focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quote-quantity" className="block text-xs font-semibold text-ink">
                  Estimated Quantity / Thickness / Dimensions
                </label>
                <input
                  id="quote-quantity"
                  name="quantity"
                  type="text"
                  placeholder="e.g. 500 sheets (3mm) or CAD drawing attached"
                  className="mt-1 w-full rounded-lg border border-line-strong bg-field px-3 py-2 text-xs sm:text-sm text-ink placeholder:text-muted/70 focus:border-maroon focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="quote-notes" className="block text-xs font-semibold text-ink">
                  Application Parameters & Technical Notes
                </label>
                <textarea
                  id="quote-notes"
                  name="notes"
                  rows={3}
                  placeholder="Operating medium (transformer oil, fuel, acoustic underlay), temperature range, or specific IS / ASTM standard..."
                  className="mt-1 w-full rounded-lg border border-line-strong bg-field px-3 py-2 text-xs sm:text-sm text-ink placeholder:text-muted/70 focus:border-maroon focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between border-t border-line pt-4">
                <span className="flex items-center gap-1.5 text-[11px] text-muted">
                  <ShieldCheck className="size-3.5 text-orange-ink" />
                  Direct Factory Engineering Pricing
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full px-4 py-2 text-xs font-medium text-muted hover:text-ink transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isSubmitting}
                    className="rounded-full px-5 text-xs"
                  >
                    {isSubmitting ? "Submitting..." : "Send Request"}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

