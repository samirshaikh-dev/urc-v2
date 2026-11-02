"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  UploadCloud,
  Check,
  X,
  Layers,
  Sparkles,
  ArrowLeft,
  FileText,
  Sliders,
  HelpCircle,
  ImageIcon,
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/shared/rich-text-editor";
import { FaqRepeater } from "./faq-repeater";
import { SpecificationsRepeater } from "./specifications-repeater";
import {
  createProductAction,
  updateProductAction,
} from "@/actions/admin-products";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FIXED_CATEGORIES = [
  {
    slug: "cork-products",
    name: "Cork Products",
    description: "Natural cork sheets, rolls, blocks, stoppers, and custom industrial shapes.",
  },
  {
    slug: "rubberised-cork",
    name: "Rubberised Cork",
    description: "NBR, Neoprene, and synthetic elastomer composites for transformer gaskets and high-pressure seals.",
  },
  {
    slug: "decorative-cork",
    name: "Decorative Cork",
    description: "Acoustic wall tiles, underlayment, decorative panels, and architectural surfaces.",
  },
  {
    slug: "cork-gifts",
    name: "Cork Gifts",
    description: "Sustainable lifestyle accessories, eco-stationery, coasters, and promotional corporate items.",
  },
];

export function ProductEditorForm({ initialData = null, isEdit = false }) {
  const router = useRouter();

  // Form State
  const [name, setName] = useState(initialData?.name || "");
  const [categorySlug, setCategorySlug] = useState(
    initialData?.categorySlug || initialData?.category || "cork-products"
  );
  const [description, setDescription] = useState(
    initialData?.description || initialData?.fullDescription || ""
  );
  const [specifications, setSpecifications] = useState(
    initialData?.specifications || []
  );
  const [faqs, setFaqs] = useState(initialData?.faqs || []);
  const [imagePreview, setImagePreview] = useState(
    initialData?.imageUrl || initialData?.image || null
  );
  const [newImageSelected, setNewImageSelected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle local image file picker and convert to Data URI for Cloudinary
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image file size should be less than 8MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setNewImageSelected(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Please enter a product name.");
      toast.error("Product name is required.");
      return;
    }

    if (!imagePreview) {
      setErrorMessage("Please upload or provide an image for the product.");
      toast.error("Product image is required.");
      return;
    }

    if (!description.trim() || description === "<p></p>") {
      setErrorMessage("Please enter a product description.");
      toast.error("Product description is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name,
        categorySlug,
        description,
        imageFileUri: newImageSelected ? imagePreview : (isEdit ? null : imagePreview),
        faqs,
        specifications,
      };

      let res;
      if (isEdit && initialData?.id) {
        res = await updateProductAction(initialData.id, payload);
      } else {
        res = await createProductAction(payload);
      }

      if (res.success) {
        toast.success(
          isEdit
            ? `"${name}" updated successfully! Changes are live immediately.`
            : `"${name}" published successfully! It is now live on the website.`
        );
        router.push("/admin/products");
        router.refresh();
      } else {
        setErrorMessage(res.error || "Failed to save product.");
        toast.error(res.error || "Failed to save product.");
      }
    } catch (err) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      toast.error("Failed to save product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1100px] pb-32">
      {/* 3. Page Layout: Breadcrumb, Heading, Description, Divider */}
      <nav aria-label="Breadcrumb" className="flex items-center text-xs text-[#687080]">
        <Link
          href="/admin/products"
          className="hover:text-[#111111] transition-colors"
        >
          Products
        </Link>
        <span className="mx-2 text-[#D9DCD1]" aria-hidden="true">
          /
        </span>
        <span className="font-medium text-[#111111]">
          {isEdit ? "Edit Product" : "Create Product"}
        </span>
      </nav>

      <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            {isEdit ? "Edit Product" : "Create New Product"}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#687080]">
            {isEdit
              ? "Update product specifications, media, or FAQs. Changes take effect across public pages instantly."
              : "Fill in the details below. When published, it will go live immediately on the customer-facing website."}
          </p>
        </div>
      </div>

      <div className="mt-5 mb-8 h-px w-full bg-[#D9DCD1]" />

      {/* Global Error Notification */}
      {errorMessage && (
        <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* =========================================================================
            SECTION 01 — PRODUCT CATEGORY
            ========================================================================= */}
        <section className="space-y-4">
          <div className="border-b border-[#D9DCD1] pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <Layers className="size-4 text-[#650510]" />
              <span>Section 01 — Product Category</span>
            </h2>
            <p className="mt-0.5 text-xs text-[#687080]">
              Select which of the four core industrial categories this material belongs to.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {FIXED_CATEGORIES.map((cat) => {
              const isSelected = categorySlug === cat.slug;

              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setCategorySlug(cat.slug)}
                  className={cn(
                    "flex flex-col justify-between rounded-lg border p-4 text-left transition-all duration-150 cursor-pointer",
                    isSelected
                      ? "border-[#650510] bg-[#650510]/[0.03] text-[#111111] ring-1 ring-[#650510]"
                      : "border-[#D9DCD1] bg-[#FFFFFF] text-[#111111] hover:border-[#111111]/40"
                  )}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-semibold tracking-tight text-[#111111]">
                      {cat.name}
                    </span>
                    {isSelected && (
                      <span className="size-5 rounded-full bg-[#650510] text-white flex items-center justify-center shrink-0">
                        <Check className="size-3" />
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#687080]">
                    {cat.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            SECTION 02 — PRODUCT INFORMATION
            ========================================================================= */}
        <section className="space-y-5">
          <div className="border-b border-[#D9DCD1] pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <FileText className="size-4 text-[#650510]" />
              <span>Section 02 — Product Information</span>
            </h2>
            <p className="mt-0.5 text-xs text-[#687080]">
              Core naming and material overview displayed on catalog listings and search engines.
            </p>
          </div>

          <div className="space-y-4">
            {/* Product Name */}
            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. High-Recovery Rubberised Cork Sheet RC70C"
                className="w-full h-[46px] rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] px-3.5 text-sm text-[#111111] placeholder:text-[#687080]/60 focus:border-[#650510] focus:ring-1 focus:ring-[#650510] focus:outline-none transition-colors"
              />
              <p className="mt-1 text-[11px] text-[#687080]">
                Official material grade, compound reference, or industrial nomenclature.
              </p>
            </div>

            {/* Product Description */}
            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Product Description &amp; Material Overview <span className="text-red-500">*</span>
              </label>
              <RichTextEditor
                value={description}
                onChange={(html) => setDescription(html)}
                placeholder="Detail composition, chemical resistance, operating temperatures, and common applications..."
              />
              <p className="mt-1 text-[11px] text-[#687080]">
                Format with clear headings, bullet points, and paragraphs for high readability.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 03 — TECHNICAL SPECIFICATIONS
            ========================================================================= */}
        <section className="space-y-4">
          <div className="border-b border-[#D9DCD1] pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <Sliders className="size-4 text-[#650510]" />
              <span>Section 03 — Technical Specifications</span>
            </h2>
            <p className="mt-0.5 text-xs text-[#687080]">
              Add engineering properties, dimensions, standard tolerances, or test standards (e.g. Hardness: 70 ± 5 Shore A).
            </p>
          </div>

          <SpecificationsRepeater
            specifications={specifications}
            onChange={(updated) => setSpecifications(updated)}
          />
        </section>

        {/* =========================================================================
            SECTION 04 — PRODUCT IMAGES
            ========================================================================= */}
        <section className="space-y-4">
          <div className="border-b border-[#D9DCD1] pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <ImageIcon className="size-4 text-[#650510]" />
              <span>Section 04 — Product Images</span>
            </h2>
            <p className="mt-0.5 text-xs text-[#687080]">
              Uploaded media is stored securely and optimized automatically on Cloudinary CDN.
            </p>
          </div>

          <div className="space-y-4">
            {imagePreview ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] p-4 shadow-2xs">
                <div className="relative aspect-[16/9] w-full sm:w-56 overflow-hidden rounded-lg border border-[#D9DCD1] bg-[#F7F8F2] shrink-0">
                  <Image
                    src={imagePreview}
                    alt="Product preview"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-[#111111]">
                    {newImageSelected
                      ? "New image selected (will upload on publish)"
                      : "Current product image (stored on Cloudinary)"}
                  </p>
                  <p className="mt-1 text-xs text-[#687080]">
                    Auto-served with responsive srcset and next-gen compression.
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <label className="h-[36px] px-3 rounded-lg border border-[#D9DCD1] bg-white hover:bg-[#F1F2EA] text-xs font-medium text-[#111111] flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs">
                      <span>Replace Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setNewImageSelected(false);
                      }}
                      className="h-[36px] px-3 rounded-lg border border-[#D9DCD1] text-xs font-medium text-[#687080] hover:border-red-200 hover:bg-red-50 hover:text-red-700 transition-colors shadow-2xs cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#D9DCD1] bg-[#FFFFFF] p-8 text-center cursor-pointer hover:border-[#650510]/50 hover:bg-[#650510]/[0.02] transition-colors">
                <div className="size-11 rounded-lg border border-[#D9DCD1] bg-[#F7F8F2] flex items-center justify-center text-[#111111] shadow-2xs">
                  <UploadCloud className="size-5 text-[#687080]" />
                </div>
                <p className="mt-3 text-xs sm:text-sm font-semibold text-[#111111]">
                  Click or drag &amp; drop product photo
                </p>
                <p className="mt-1 text-[11px] text-[#687080]">
                  JPG, PNG, or WebP up to 8MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION 05 — PRODUCT FAQS
            ========================================================================= */}
        <section className="space-y-4">
          <div className="border-b border-[#D9DCD1] pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <HelpCircle className="size-4 text-[#650510]" />
              <span>Section 05 — Product FAQs</span>
            </h2>
            <p className="mt-0.5 text-xs text-[#687080]">
              Answers to common technical, shipping, and customization questions, formatted in an accordion.
            </p>
          </div>

          <FaqRepeater
            faqs={faqs}
            onChange={(updated) => setFaqs(updated)}
          />
        </section>

        {/* =========================================================================
            SECTION 06 — STICKY PUBLISHING BAR
            ========================================================================= */}
        <aside
          aria-label="Publishing Controls"
          className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#D9DCD1] bg-white/95 backdrop-blur-md py-3 px-4 sm:px-8 shadow-xs"
        >
          <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left Info: Status & Feedback */}
            <div className="flex items-center gap-2.5 text-xs text-[#687080]">
              <span className="size-2 rounded-full bg-[#00A85A] shrink-0" aria-hidden="true" />
              <span className="font-medium text-[#111111]">
                {isEdit ? `Editing: ${name || initialData?.name}` : "Ready to Publish"}
              </span>
              <span className="hidden md:inline text-[#D9DCD1]" aria-hidden="true">
                •
              </span>
              <span className="hidden md:inline">
                Changes apply instantly across public catalog routes.
              </span>
            </div>

            {/* Right Buttons: Cancel & Primary Publish */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <Link
                href="/admin/products"
                className="h-[42px] px-4 rounded-lg border border-[#D9DCD1] bg-white text-xs font-medium text-[#687080] hover:text-[#111111] hover:bg-[#F1F2EA] flex items-center justify-center transition-colors shadow-2xs"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-[42px] px-6 rounded-lg bg-[#650510] hover:bg-[#4f040c] text-white text-xs sm:text-sm font-semibold shadow-2xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="size-4" />
                <span>
                  {isSubmitting
                    ? isEdit
                      ? "Saving Changes..."
                      : "Publishing Product..."
                    : isEdit
                    ? "Save Changes"
                    : "Publish Product"}
                </span>
              </button>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}

