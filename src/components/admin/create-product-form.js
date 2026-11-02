"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  X,
  Layers,
  Sparkles,
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { FaqRepeater } from "@/components/admin/faq-repeater";
import { createProductAction } from "@/actions/admin-products";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const FIXED_CATEGORIES = [
  { slug: "cork-products", name: "Cork Products" },
  { slug: "rubberised-cork", name: "Rubberised Cork" },
  { slug: "decorative-cork", name: "Decorative Cork" },
  { slug: "cork-gifts", name: "Cork Gifts" },
];

export function CreateProductForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCategory = searchParams.get("category") || "cork-products";

  const [name, setName] = useState("");
  const [categorySlug, setCategorySlug] = useState(preselectedCategory);
  const [description, setDescription] = useState("");
  const [faqs, setFaqs] = useState([
    { question: "", answer: "" },
  ]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle local image file picker and convert to Data URI for upload
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
      setErrorMessage("Please select an image for the product.");
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
      const res = await createProductAction({
        name,
        categorySlug,
        description,
        imageFileUri: imagePreview,
        faqs,
      });

      if (res.success) {
        toast.success(`"${name}" published successfully! It is now live on the website.`);
        router.push("/admin/products");
        router.refresh();
      } else {
        setErrorMessage(res.error || "Failed to publish product.");
        toast.error(res.error || "Failed to publish product.");
      }
    } catch (err) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      toast.error("Failed to publish product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 pb-16">
      {/* Back button & Title */}
      <div className="flex flex-col gap-2 border-b border-[#D9DCD1] pb-6">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#687080] hover:text-[#111111] transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Products</span>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
              Create New Product
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#687080]">
              Fill in the 5 fields below. When you click Publish, it will go live immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Global Error Banner */}
      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Product Creation Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Field 1: Category Selection */}
        <div className="rounded-xl border border-[#D9DCD1] bg-white p-6 shadow-2xs space-y-4">
          <div>
            <label className="text-sm font-semibold text-[#111111] flex items-center gap-1.5">
              <Layers className="size-4 text-[#111111]" />
              <span>1. Product Category</span>
            </label>
            <p className="text-xs text-[#687080] mt-0.5">
              Select which of the 4 core categories this product belongs to.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {FIXED_CATEGORIES.map((cat) => {
              const isSelected = categorySlug === cat.slug;
              return (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setCategorySlug(cat.slug)}
                  className={cn(
                    "flex items-center justify-between rounded-lg border p-3 text-left text-xs sm:text-sm transition-all cursor-pointer",
                    isSelected
                      ? "border-[#111111] bg-[#E9EAE1] font-semibold text-[#111111] ring-1 ring-[#111111]"
                      : "border-[#D9DCD1] bg-[#F1F2EA]/40 text-[#111111] hover:border-[#111111]/40"
                  )}
                >
                  <span>{cat.name}</span>
                  {isSelected && <CheckCircle2 className="size-4 text-[#111111] shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Field 2: Product Name */}
        <div className="rounded-xl border border-[#D9DCD1] bg-white p-6 shadow-2xs space-y-2">
          <label className="text-sm font-semibold text-[#111111]">
            2. Product Name
          </label>
          <p className="text-xs text-[#687080]">
            The full official name of the material or product (e.g., &quot;High-Recovery Rubber Cork Sheet RC70C&quot;).
          </p>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product title..."
            className="w-full rounded-lg border border-[#D9DCD1] bg-[#F1F2EA]/40 px-3.5 py-2.5 text-xs sm:text-sm text-[#111111] placeholder:text-[#687080] focus:border-[#111111] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        {/* Field 3: Product Image (Cloudinary Upload) */}
        <div className="rounded-xl border border-[#D9DCD1] bg-white p-6 shadow-2xs space-y-4">
          <div>
            <label className="text-sm font-semibold text-[#111111]">
              3. Product Image
            </label>
            <p className="text-xs text-[#687080] mt-0.5">
              Upload a clear photo of the product. It will be delivered via Cloudinary CDN with automatic optimization.
            </p>
          </div>

          {imagePreview ? (
            <div className="relative aspect-[16/9] w-full max-w-md overflow-hidden rounded-lg border border-[#D9DCD1] bg-[#F1F2EA]">
              <Image
                src={imagePreview}
                alt="Product preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setImagePreview(null)}
                className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white/90 text-[#111111] shadow-md hover:bg-white transition-colors"
                title="Remove image"
              >
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#D9DCD1] bg-[#F1F2EA]/30 p-8 text-center cursor-pointer hover:border-[#111111]/40 hover:bg-[#F1F2EA]/60 transition-colors">
              <div className="flex size-11 items-center justify-center rounded-xl border border-[#D9DCD1] bg-white text-[#111111] shadow-2xs">
                <UploadCloud className="size-5" />
              </div>
              <p className="mt-3 text-xs sm:text-sm font-medium text-[#111111]">
                Click or drag &amp; drop product photo
              </p>
              <p className="mt-1 text-[11px] text-[#687080]">
                JPG, PNG, WebP up to 8MB
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

        {/* Field 4: Rich-Text Description */}
        <div className="rounded-xl border border-[#D9DCD1] bg-white p-6 shadow-2xs space-y-2">
          <label className="text-sm font-semibold text-[#111111]">
            4. Product Description &amp; Technical Details
          </label>
          <p className="text-xs text-[#687080]">
            Use clean formatting, headings, bullet points, and paragraphs to describe features, tolerances, and applications.
          </p>
          <div className="pt-2">
            <RichTextEditor
              value={description}
              onChange={(html) => setDescription(html)}
              placeholder="Describe material composition, operating temperature range, recovery percentage, and common industrial applications..."
            />
          </div>
        </div>

        {/* Field 5: Dynamic FAQs */}
        <div className="rounded-xl border border-[#D9DCD1] bg-white p-6 shadow-2xs">
          <FaqRepeater
            faqs={faqs}
            onChange={(updatedFaqs) => setFaqs(updatedFaqs)}
          />
        </div>

        {/* Action Bar (Sticky Publish Bar) */}
        <div className="sticky bottom-4 z-20 rounded-xl border border-[#D9DCD1] bg-white/95 p-4 shadow-lg backdrop-blur-xs flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-[#111111]">
              Ready to go live?
            </p>
            <p className="text-[11px] text-[#687080]">
              Clicking publish will immediately display this product under {FIXED_CATEGORIES.find((c) => c.slug === categorySlug)?.name}.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-xl bg-[#111111] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-2xs hover:bg-black disabled:opacity-50 transition-colors shrink-0 cursor-pointer"
          >
            <Sparkles className="size-4" />
            <span>{isSubmitting ? "Publishing Product..." : "Publish Product"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
