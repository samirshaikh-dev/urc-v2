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
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-700">
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
            <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-2">
              Product Name <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. High-Recovery Rubberised Cork Sheet RC70C"
              className="w-full h-[46px] rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] px-4 text-xs sm:text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:border-[#650510] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#650510] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-2">
              Slug <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
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
          <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-2">
            Category <span className="text-red-500 font-semibold">*</span>
          </label>
          <div className="relative">
            <select
              value={categorySlug}
              onChange={(e) => setCategorySlug(e.target.value)}
              className="w-full h-[46px] appearance-none rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] px-4 pr-10 text-xs sm:text-sm font-medium text-[#111111] focus:border-[#650510] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#650510] transition-colors cursor-pointer"
            >
              {FIXED_CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#687080]" />
          </div>
        </div>

        {/* Row 3: Product Description */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-2">
            Content &amp; Description <span className="text-red-500 font-semibold">*</span>
          </label>
          <RichTextEditor
            value={description}
            onChange={(html) => setDescription(html)}
            placeholder="Detail composition, chemical resistance, operating temperatures, and common applications..."
          />
        </div>

        {/* Row 4: Technical Specifications */}
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-[#374151]">
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
                <p className="mt-0.5 text-xs text-[#687080]">
                  Auto-optimized with responsive srcset and next-gen compression.
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 rounded-xl border border-[#D9DCD1] bg-white px-3.5 py-1.5 text-xs font-medium text-[#111111] hover:bg-[#F1F2EA] shadow-2xs transition-colors cursor-pointer">
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
                    className="inline-flex items-center rounded-xl border border-[#D9DCD1] bg-white px-3.5 py-1.5 text-xs font-medium text-[#687080] hover:border-red-200 hover:bg-red-50 hover:text-red-700 shadow-2xs transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <label className="inline-flex items-center gap-2 rounded-xl border border-[#D9DCD1] bg-white px-4 py-2.5 text-xs sm:text-sm font-medium text-[#111111] hover:bg-[#F1F2EA] shadow-2xs transition-colors cursor-pointer">
                <UploadCloud className="size-4 text-[#687080]" />
                <span>Choose from Library</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        {/* Row 6: Product FAQs */}
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-[#374151]">
            Product FAQs
          </label>
          <FaqRepeater
            faqs={faqs}
            onChange={(updated) => setFaqs(updated)}
          />
        </div>
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
