"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  UploadCloud,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/shared/rich-text-editor";
import { createBlogAction, updateBlogAction } from "@/actions/admin-blogs";
import { slugify } from "@/lib/utils";
import { toast } from "sonner";

export function BlogEditorForm({ initialData = null, isEdit = false }) {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [tags, setTags] = useState(initialData?.tags || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || null);
  const [newImageSelected, setNewImageSelected] = useState(false);
  const [published, setPublished] = useState(initialData ? initialData.published : true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const generatedSlug = title ? slugify(title) : (initialData?.slug || "");

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

    if (!title.trim()) {
      setErrorMessage("Please enter an article title.");
      toast.error("Article title is required.");
      return;
    }

    if (!content.trim() || content === "<p></p>") {
      setErrorMessage("Please enter the article content.");
      toast.error("Article content is required.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: title.trim(),
        excerpt: excerpt.trim(),
        tags: tags.trim(),
        content: content.trim(),
        imageFileUri: newImageSelected ? imagePreview : (isEdit ? null : imagePreview),
        published,
      };

      let res;
      if (isEdit && initialData?.id) {
        res = await updateBlogAction(initialData.id, payload);
      } else {
        res = await createBlogAction(payload);
      }

      if (res.success) {
        toast.success(
          isEdit
            ? `"${title}" updated successfully!`
            : `"${title}" published successfully!`
        );
        router.push("/admin/blogs");
        router.refresh();
      } else {
        setErrorMessage(res.error || "Failed to save article.");
        toast.error(res.error || "Failed to save article.");
      }
    } catch (err) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      toast.error("Failed to save article.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[1100px] pb-12">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center text-xs text-[#687080] mb-2">
        <Link
          href="/admin/blogs"
          className="hover:text-[#111111] transition-colors flex items-center gap-1.5 font-medium"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Blogs</span>
        </Link>
      </nav>

      {/* Heading (Exact style from screenshot: "New Blog") */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            {isEdit ? "Edit Blog" : "New Blog"}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#687080]">
            {isEdit
              ? "Update article content, metadata, or publication state."
              : "Compose and publish technical guides, application notes, and industry insights."}
          </p>
        </div>
      </div>

      <div className="mt-4 mb-8 h-px w-full bg-[#D9DCD1]" />

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Main Form — Structure matches reference screenshot exactly */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1: Title & Slug in 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-2">
              Title <span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. ASTM F104 Gasket Callouts for Transformers"
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

        {/* Row 2: Excerpt */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-2">
            Excerpt
          </label>
          <textarea
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Short summary shown in blog cards..."
            className="w-full rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] p-4 text-xs sm:text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:border-[#650510] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#650510] transition-colors resize-y min-h-[90px]"
          />
        </div>

        {/* Row 3: Tags (comma separated) */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="AI, RAG, Node.js, Local SEO"
            className="w-full h-[46px] rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] px-4 text-xs sm:text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:border-[#650510] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#650510] transition-colors"
          />
        </div>

        {/* Row 4: Cover Image (Choose from Library button from reference) */}
        <div className="space-y-2.5">
          <label className="block text-xs sm:text-sm font-medium text-[#374151]">
            Cover Image
          </label>

          {imagePreview ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] p-4">
              <div className="relative aspect-[16/9] w-full sm:w-52 overflow-hidden rounded-xl border border-[#D9DCD1] bg-white shrink-0">
                <Image
                  src={imagePreview}
                  alt="Cover preview"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#111111]">
                  {newImageSelected
                    ? "New banner selected (will upload on save)"
                    : "Current cover image"}
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

        {/* Row 5: Content * */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-[#374151] mb-2">
            Content <span className="text-red-500 font-semibold">*</span>
          </label>
          <RichTextEditor
            value={content}
            onChange={(html) => setContent(html)}
            placeholder="Write the full article body, technical data, test methodology, and engineering recommendations..."
          />
        </div>

        {/* Sticky Publishing Bar */}
        <aside
          aria-label="Publishing Controls"
          className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#D9DCD1] bg-white/95 backdrop-blur-md py-3 px-4 sm:px-8 shadow-xs"
        >
          <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Left Status & Publish Toggle */}
            <div className="flex items-center gap-3 text-xs text-[#687080]">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded border-[#D9DCD1] text-[#650510] focus:ring-[#650510] size-4"
                />
                <span className="font-semibold text-[#111111]">
                  {published ? "Publish immediately" : "Save as draft"}
                </span>
              </label>
              <span className="hidden sm:inline text-[#D9DCD1]" aria-hidden="true">•</span>
              <span className="hidden sm:inline">
                {published ? "Will appear in article feeds upon saving." : "Hidden from public feeds."}
              </span>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <Link
                href="/admin/blogs"
                className="h-[42px] px-4 rounded-xl border border-[#D9DCD1] bg-white text-xs font-medium text-[#687080] hover:text-[#111111] hover:bg-[#F1F2EA] flex items-center justify-center transition-colors shadow-2xs"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-[42px] px-6 rounded-xl bg-[#650510] hover:bg-[#4f040c] text-white text-xs sm:text-sm font-semibold shadow-2xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="size-4" />
                <span>
                  {isSubmitting
                    ? "Saving Article..."
                    : isEdit
                    ? "Update Blog"
                    : "Save & Publish"}
                </span>
              </button>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}
