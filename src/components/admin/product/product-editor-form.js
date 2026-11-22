"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  UploadCloud,
  ArrowLeft,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/shared/rich-text-editor";
import { FaqRepeater } from "./faq-repeater";
import { SpecificationsRepeater } from "./specifications-repeater";
import { createProductAction } from "@/api/products/admin/create-product";
import { updateProductAction } from "@/api/products/admin/update-product";
import { slugify } from "@/lib/utils";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-url";
import { toast } from "sonner";

const FIXED_CATEGORIES = [
  { slug: "cork-products", name: "Cork Products" },
  { slug: "rubberised-cork", name: "Rubberised Cork" },
  { slug: "decorative-cork", name: "Decorative Cork" },
  { slug: "cork-gifts", name: "Cork Gifts" },
];

const SEO_TITLE_LIMIT = 60;
const SEO_DESCRIPTION_LIMIT = 160;

const LIFECYCLE_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "out_of_stock", label: "Out of stock" },
  { value: "discontinued", label: "Discontinued" },
];

const VISIBILITY_OPTIONS = [
  { value: "public", label: "Public" },
  { value: "private", label: "Private" },
];

const INDEXING_OPTIONS = [
  { value: "auto", label: "Automatic" },
  { value: "index", label: "Force index" },
  { value: "noindex", label: "Do not index" },
];

const INPUT_CLASS =
  "w-full h-[46px] rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] px-4 text-xs sm:text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:border-[#650510] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#650510] transition-colors";
const TEXTAREA_CLASS =
  "w-full rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] px-4 py-2.5 text-xs sm:text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:border-[#650510] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#650510] transition-colors";
const SELECT_CLASS =
  "w-full h-[46px] appearance-none rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] px-4 pr-10 text-xs sm:text-sm font-medium text-[#111111] focus:border-[#650510] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#650510] transition-colors cursor-pointer";
const HELP_TEXT_CLASS = "mt-1 text-[11px] leading-relaxed text-[#687080]";
const LABEL_CLASS = "block text-xs sm:text-sm font-medium text-[#374151] mb-2";

function initialText(value) {
  if (typeof value === "string") return value;
  return value === undefined || value === null ? "" : String(value);
}

function multilineFromArray(value) {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string" && item.trim()).join("\n");
  }
  return initialText(value);
}

function arrayFromMultiline(value) {
  return initialText(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function selectedOption(value, options, fallback) {
  return options.some((option) => option.value === value) ? value : fallback;
}

function characterHint(value, limit) {
  const remaining = limit - value.length;
  return remaining >= 0
    ? `${remaining} characters remaining`
    : `${Math.abs(remaining)} characters over the suggested length`;
}

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

  const [seoTitle, setSeoTitle] = useState(initialText(initialData?.seoTitle));
  const [seoDescription, setSeoDescription] = useState(
    initialText(initialData?.seoDescription)
  );
  const [seoImageUrl, setSeoImageUrl] = useState(initialText(initialData?.seoImageUrl));
  const [imageAlt, setImageAlt] = useState(initialText(initialData?.imageAlt));
  const [introduction, setIntroduction] = useState(initialText(initialData?.introduction));
  const [features, setFeatures] = useState(multilineFromArray(initialData?.features));
  const [applications, setApplications] = useState(
    multilineFromArray(initialData?.applications)
  );
  const [benefits, setBenefits] = useState(multilineFromArray(initialData?.benefits));
  const [sku, setSku] = useState(initialText(initialData?.sku));
  const [mpn, setMpn] = useState(initialText(initialData?.mpn));
  const [lifecycleStatus, setLifecycleStatus] = useState(
    selectedOption(initialData?.lifecycleStatus, LIFECYCLE_OPTIONS, "active")
  );
  const [visibility, setVisibility] = useState(
    selectedOption(initialData?.visibility, VISIBILITY_OPTIONS, "public")
  );
  const [indexingStatus, setIndexingStatus] = useState(
    selectedOption(initialData?.indexingStatus, INDEXING_OPTIONS, "auto")
  );

  const generatedSlug = name ? slugify(name) : (initialData?.slug || "");

  // Handle local image file picker
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
        name: name.trim(),
        categorySlug,
        description: description.trim(),
        imageFileUri: newImageSelected ? imagePreview : (isEdit ? null : imagePreview),
        faqs,
        specifications,
        seoTitle: seoTitle.trim(),
        seoDescription: seoDescription.trim(),
        seoImageUrl: seoImageUrl.trim(),
        imageAlt: imageAlt.trim(),
        introduction: introduction.trim(),
        features: arrayFromMultiline(features),
        applications: arrayFromMultiline(applications),
        benefits: arrayFromMultiline(benefits),
        sku: sku.trim(),
        mpn: mpn.trim(),
        lifecycleStatus,
        visibility,
        indexingStatus,
        relatedProductIds: Array.isArray(initialData?.relatedProductIds)
          ? initialData.relatedProductIds
          : [],
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
    <div className="w-full">
      <div className="mx-auto max-w-[1100px]">
        {/* Page Header */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-[#687080] mb-2">
          <Link
            href="/admin/products"
            className="hover:text-[#111111] transition-colors flex items-center gap-1.5 font-medium"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Products</span>
          </Link>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
              {isEdit ? "Edit Product" : "New Product"}
            </h1>
          </div>
        </div>

        <div className="mt-4 mb-8 h-px w-full bg-[#D9DCD1]" />

        {/* Global Error Notification */}
        {errorMessage && (
          <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-700">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Single Combined Form (Clean & Unified, matching New Blog reference) */}
      <form onSubmit={handleSubmit}>
        <div className="mx-auto max-w-[1100px] space-y-6">
          {/* Row 1: Product Name & Slug in 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label htmlFor="product-name" className={LABEL_CLASS}>
              Product Name <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              id="product-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. High-Recovery Rubberised Cork Sheet RC70C"
              className={INPUT_CLASS}
            />
          </div>

          <div>
            <label htmlFor="product-slug" className={LABEL_CLASS}>
              Slug <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              id="product-slug"
              type="text"
              readOnly
              value={generatedSlug}
              placeholder="auto-generated-slug"
              className="w-full h-[46px] rounded-xl border border-[#D9DCD1] bg-[#F1F2EA]/60 px-4 text-xs sm:text-sm text-[#687080] font-mono cursor-not-allowed select-none"
            />
          </div>
        </div>

        {/* Row 2: Category Dropdown */}
        <div>
          <label htmlFor="product-category" className={LABEL_CLASS}>
            Category <span className="text-red-500 font-semibold">*</span>
          </label>
          <div className="relative">
            <select
              id="product-category"
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              className={SELECT_CLASS}
            >
              {FIXED_CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#687080]" aria-hidden="true" />
          </div>
        </div>

        {/* Row 3: Product Description */}
        <div role="group" aria-labelledby="product-description-label">
          <label id="product-description-label" className={LABEL_CLASS}>
            Content &amp; Description <span className="text-red-500 font-semibold">*</span>
          </label>
          <RichTextEditor
            value={description}
            onChange={(html) => setDescription(html)}
            placeholder="Detail composition, chemical resistance, operating temperatures, and common applications..."
          />
        </div>

        {/* Row 4: Technical Specifications */}
        <div className="space-y-2" role="group" aria-labelledby="product-specifications-label">
          <label id="product-specifications-label" className="block text-xs sm:text-sm font-medium text-[#374151]">
            Technical Specifications
          </label>
          <SpecificationsRepeater
            specifications={specifications}
            onChange={(updated) => setSpecifications(updated)}
          />
        </div>

        {/* Row 5: Cover Image */}
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-[#374151]">
            Cover Image <span className="text-red-500 font-semibold">*</span>
          </label>

          {imagePreview ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] p-4">
              <div className="relative aspect-[16/9] w-full sm:w-52 overflow-hidden rounded-xl border border-[#D9DCD1] bg-white shrink-0">
                <Image
                  src={optimizeCloudinaryUrl(imagePreview, { width: 640 })}
                  alt={imageAlt.trim() || "Product preview"}
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
                <p className="mt-0.5 text-xs text-[#687080]">
                  Auto-optimized with responsive srcset and next-gen compression.
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 rounded-xl border border-[#D9DCD1] bg-white px-3.5 py-1.5 text-xs font-medium text-[#111111] hover:bg-[#F1F2EA] shadow-2xs transition-colors cursor-pointer focus-within:border-[#650510] focus-within:ring-1 focus-within:ring-[#650510]">
                    <span>Replace Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setNewImageSelected(false);
                    }}
                    className="inline-flex items-center rounded-xl border border-[#D9DCD1] bg-white px-3.5 py-1.5 text-xs font-medium text-[#687080] hover:border-red-200 hover:bg-red-50 hover:text-red-700 shadow-2xs transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <label className="inline-flex items-center gap-2 rounded-xl border border-[#D9DCD1] bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-[#111111] hover:bg-[#F1F2EA] shadow-2xs transition-colors cursor-pointer focus-within:border-[#650510] focus-within:ring-1 focus-within:ring-[#650510]">
                <UploadCloud className="size-4 text-[#687080]" />
                <span>Choose from Library</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            </div>
          )}
        </div>

        {/* Row 6: Product FAQs */}
        <div className="space-y-2" role="group" aria-labelledby="product-faqs-label">
          <label id="product-faqs-label" className="block text-xs sm:text-sm font-medium text-[#374151]">
            Product FAQs
          </label>
          <FaqRepeater
            faqs={faqs}
            onChange={(updated) => setFaqs(updated)}
          />
        </div>

        {/* Optional search and indexing details, kept out of the primary flow */}
        <details className="group mt-8 border-t border-[#D9DCD1] pt-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-xs py-1.5 text-sm font-semibold text-[#111111] hover:text-[#650510] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#650510] focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
            <span>
              Search engine settings
              <span className="ml-2 text-xs font-normal text-[#687080]">Optional</span>
            </span>
            <ChevronDown
              className="size-4 shrink-0 text-[#687080] group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-[#687080]">
            Add details that help search results and shared links describe this product accurately. Leave any field blank to use the product information above.
          </p>

          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="seo-title" className={LABEL_CLASS}>
                  Search page title
                </label>
                <input
                  id="seo-title"
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder="Short title for search results"
                  aria-describedby="seo-title-hint"
                  className={INPUT_CLASS}
                />
                <p id="seo-title-hint" className={HELP_TEXT_CLASS}>
                  {characterHint(seoTitle, SEO_TITLE_LIMIT)}
                </p>
              </div>

              <div>
                <label htmlFor="seo-image-url" className={LABEL_CLASS}>
                  Social sharing image URL
                </label>
                <input
                  id="seo-image-url"
                  type="url"
                  value={seoImageUrl}
                  onChange={(e) => setSeoImageUrl(e.target.value)}
                  placeholder="https://example.com/product-image.jpg"
                  aria-describedby="seo-image-url-hint"
                  className={INPUT_CLASS}
                />
                <p id="seo-image-url-hint" className={HELP_TEXT_CLASS}>
                  Use a direct image link for previews when this product is shared.
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="seo-description" className={LABEL_CLASS}>
                Search description
              </label>
              <textarea
                id="seo-description"
                rows={3}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Short, factual summary for search results"
                aria-describedby="seo-description-hint"
                className={TEXTAREA_CLASS}
              />
              <p id="seo-description-hint" className={HELP_TEXT_CLASS}>
                {characterHint(seoDescription, SEO_DESCRIPTION_LIMIT)}
              </p>
            </div>

            <div>
              <label htmlFor="image-alt" className={LABEL_CLASS}>
                Image alt text
              </label>
              <input
                id="image-alt"
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Describe the product image"
                aria-describedby="image-alt-hint"
                className={INPUT_CLASS}
              />
              <p id="image-alt-hint" className={HELP_TEXT_CLASS}>
                Describe what the product image shows for people using screen readers.
              </p>
            </div>

            <div>
              <label htmlFor="product-introduction" className={LABEL_CLASS}>
                Product introduction
              </label>
              <textarea
                id="product-introduction"
                rows={3}
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                placeholder="Add a short factual introduction"
                aria-describedby="product-introduction-hint"
                className={TEXTAREA_CLASS}
              />
              <p id="product-introduction-hint" className={HELP_TEXT_CLASS}>
                Keep it to verified facts about the product.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
              <div>
                <label htmlFor="product-features" className={LABEL_CLASS}>
                  Features
                </label>
                <textarea
                  id="product-features"
                  rows={6}
                  value={features}
                  onChange={(e) => setFeatures(e.target.value)}
                  placeholder="One feature per line"
                  aria-describedby="product-features-hint"
                  className={TEXTAREA_CLASS}
                />
                <p id="product-features-hint" className={HELP_TEXT_CLASS}>
                  Add one feature per line.
                </p>
              </div>

              <div>
                <label htmlFor="product-applications" className={LABEL_CLASS}>
                  Applications
                </label>
                <textarea
                  id="product-applications"
                  rows={6}
                  value={applications}
                  onChange={(e) => setApplications(e.target.value)}
                  placeholder="One application per line"
                  aria-describedby="product-applications-hint"
                  className={TEXTAREA_CLASS}
                />
                <p id="product-applications-hint" className={HELP_TEXT_CLASS}>
                  Add one application per line.
                </p>
              </div>

              <div>
                <label htmlFor="product-benefits" className={LABEL_CLASS}>
                  Benefits
                </label>
                <textarea
                  id="product-benefits"
                  rows={6}
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                  placeholder="One benefit per line"
                  aria-describedby="product-benefits-hint"
                  className={TEXTAREA_CLASS}
                />
                <p id="product-benefits-hint" className={HELP_TEXT_CLASS}>
                  Add one benefit per line.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="product-sku" className={LABEL_CLASS}>
                  SKU
                </label>
                <input
                  id="product-sku"
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="Optional stock keeping unit"
                  className={INPUT_CLASS}
                />
              </div>

              <div>
                <label htmlFor="product-mpn" className={LABEL_CLASS}>
                  MPN
                </label>
                <input
                  id="product-mpn"
                  type="text"
                  value={mpn}
                  onChange={(e) => setMpn(e.target.value)}
                  placeholder="Optional manufacturer part number"
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
              <div>
                <label htmlFor="lifecycle-status" className={LABEL_CLASS}>
                  Lifecycle status
                </label>
                <div className="relative">
                  <select
                    id="lifecycle-status"
                    value={lifecycleStatus}
                    onChange={(e) => setLifecycleStatus(e.target.value)}
                    aria-describedby="lifecycle-status-hint"
                    className={SELECT_CLASS}
                  >
                    {LIFECYCLE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#687080]" aria-hidden="true" />
                </div>
                <p id="lifecycle-status-hint" className={HELP_TEXT_CLASS}>
                  Out-of-stock products stay visible and can still appear in search results.
                </p>
              </div>

              <div>
                <label htmlFor="visibility" className={LABEL_CLASS}>
                  Visibility
                </label>
                <div className="relative">
                  <select
                    id="visibility"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    aria-describedby="visibility-hint"
                    className={SELECT_CLASS}
                  >
                    {VISIBILITY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#687080]" aria-hidden="true" />
                </div>
                <p id="visibility-hint" className={HELP_TEXT_CLASS}>
                  Private products are hidden from the public catalog and excluded from search.
                </p>
              </div>

              <div>
                <label htmlFor="indexing-status" className={LABEL_CLASS}>
                  Indexing
                </label>
                <div className="relative">
                  <select
                    id="indexing-status"
                    value={indexingStatus}
                    onChange={(e) => setIndexingStatus(e.target.value)}
                    aria-describedby="indexing-status-hint"
                    className={SELECT_CLASS}
                  >
                    {INDEXING_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#687080]" aria-hidden="true" />
                </div>
                <p id="indexing-status-hint" className={HELP_TEXT_CLASS}>
                  Automatic follows the visibility and lifecycle settings. The other options ask search engines to include or skip this page.
                </p>
              </div>
            </div>
          </div>
        </details>
      </div>

      {/* Sticky Action Bar */}
      <aside
        aria-label="Publishing Controls"
        className="sticky bottom-0 z-30 mt-10 -mx-4 sm:-mx-8 lg:-mx-10 -mb-4 sm:-mb-8 lg:-mb-10 px-4 sm:px-8 lg:px-10 py-3.5 bg-white/95 backdrop-blur-md border-t border-[#D9DCD1] shadow-2xs"
      >
          <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left Info */}
            <div className="flex items-center gap-2.5 text-xs text-[#687080] min-w-0 w-full sm:w-auto">
              <span className="size-2 rounded-full bg-[#00A85A] shrink-0" aria-hidden="true" />
              <span className="font-semibold text-[#111111] truncate">
                {isEdit ? `Editing: ${name || initialData?.name}` : "Ready to Publish"}
              </span>
              <span className="hidden md:inline text-[#D9DCD1]" aria-hidden="true">
                •
              </span>
              <span className="hidden md:inline truncate">
                Changes apply instantly across public catalog routes.
              </span>
            </div>

            {/* Right Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end shrink-0">
              <Link
                href="/admin/products"
                className="h-[40px] px-4 rounded-xl border border-[#D9DCD1] bg-white text-xs font-medium text-[#687080] hover:text-[#111111] hover:bg-[#F1F2EA] flex items-center justify-center transition-colors shadow-2xs"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-[40px] px-5 rounded-xl bg-[#650510] hover:bg-[#4f040c] text-white text-xs sm:text-sm font-semibold shadow-2xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
