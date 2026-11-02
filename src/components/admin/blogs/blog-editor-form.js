"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  UploadCloud,
  Sparkles,
  FileText,
  User,
  Clock,
  ImageIcon,
} from "lucide-react";
import { RichTextEditor } from "@/components/admin/shared/rich-text-editor";
import { createBlogAction, updateBlogAction } from "@/actions/admin-blogs";
import { toast } from "sonner";

export function BlogEditorForm({ initialData = null, isEdit = false }) {
  const router = useRouter();

  // Form State
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "URC Engineering Team");
  const [readTime, setReadTime] = useState(initialData?.readTime || "5 min read");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || null);
  const [newImageSelected, setNewImageSelected] = useState(false);
  const [published, setPublished] = useState(initialData ? initialData.published : true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
        title,
        author,
        readTime,
        excerpt,
        content,
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
    <div className="mx-auto max-w-[1100px] pb-32">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center text-xs text-[#687080]">
        <Link href="/admin/blogs" className="hover:text-[#111111] transition-colors">
          Blogs
        </Link>
        <span className="mx-2 text-[#D9DCD1]" aria-hidden="true">
          /
        </span>
        <span className="font-medium text-[#111111]">
          {isEdit ? "Edit Article" : "Write Article"}
        </span>
      </nav>

      {/* Heading */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            {isEdit ? "Edit Article" : "Write New Technical Article"}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#687080]">
            {isEdit
              ? "Update article copy, technical figures, or publication status."
              : "Draft and publish technical guides, industry bulletins, and application notes."}
          </p>
        </div>
      </div>

      <div className="mt-5 mb-8 h-px w-full bg-[#D9DCD1]" />

      {/* Error Message */}
      {errorMessage && (
        <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4 text-xs sm:text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Section 01: Article Information */}
        <section className="space-y-4">
          <div className="border-b border-[#D9DCD1] pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <FileText className="size-4 text-[#650510]" />
              <span>Section 01 — Title &amp; Details</span>
            </h2>
            <p className="mt-0.5 text-xs text-[#687080]">
              Headline, summary, and authorship credentials.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. ASTM F104 Gasket Callouts for High-Voltage Transformers"
                className="w-full h-[46px] rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] px-3.5 text-sm text-[#111111] placeholder:text-[#687080]/60 focus:border-[#650510] focus:ring-1 focus:ring-[#650510] focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1.5 flex items-center gap-1.5">
                  <User className="size-3.5 text-[#687080]" />
                  <span>Author / Department</span>
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. URC Technical Research Desk"
                  className="w-full h-[46px] rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] px-3.5 text-sm text-[#111111] focus:border-[#650510] focus:ring-1 focus:ring-[#650510] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111111] mb-1.5 flex items-center gap-1.5">
                  <Clock className="size-3.5 text-[#687080]" />
                  <span>Estimated Read Time</span>
                </label>
                <input
                  type="text"
                  value={readTime}
                  onChange={(e) => setReadTime(e.target.value)}
                  placeholder="e.g. 5 min read"
                  className="w-full h-[46px] rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] px-3.5 text-sm text-[#111111] focus:border-[#650510] focus:ring-1 focus:ring-[#650510] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111111] mb-1.5">
                Executive Excerpt (1-2 sentences)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of findings, standards covered, and recommendations..."
                className="w-full rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] px-3.5 py-2.5 text-xs sm:text-sm text-[#111111] placeholder:text-[#687080]/60 focus:border-[#650510] focus:ring-1 focus:ring-[#650510] focus:outline-none transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Section 02: Cover Media */}
        <section className="space-y-4">
          <div className="border-b border-[#D9DCD1] pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <ImageIcon className="size-4 text-[#650510]" />
              <span>Section 02 — Cover Banner</span>
            </h2>
            <p className="mt-0.5 text-xs text-[#687080]">
              High-resolution technical illustration, facility photography, or material macro shot.
            </p>
          </div>

          {imagePreview ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-lg border border-[#D9DCD1] bg-[#FFFFFF] p-4 shadow-2xs">
              <div className="relative aspect-[16/9] w-full sm:w-56 overflow-hidden rounded-lg border border-[#D9DCD1] bg-[#F7F8F2] shrink-0">
                <Image
                  src={imagePreview}
                  alt="Article cover preview"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[#111111]">
                  {newImageSelected
                    ? "New banner selected (will upload on publish)"
                    : "Current cover image"}
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
                Click or drag &amp; drop article cover photo
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
        </section>

        {/* Section 03: Body Content */}
        <section className="space-y-4">
          <div className="border-b border-[#D9DCD1] pb-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111] flex items-center gap-2">
              <FileText className="size-4 text-[#650510]" />
              <span>Section 03 — Full Article Body</span>
            </h2>
            <p className="mt-0.5 text-xs text-[#687080]">
              Format with subheadings (H2, H3), bold text, bullet points, and numbered lists.
            </p>
          </div>

          <RichTextEditor
            value={content}
            onChange={(html) => setContent(html)}
            placeholder="Write the full article body, technical data, test methodology, and engineering recommendations..."
          />
        </section>

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
                    ? "Saving Article..."
                    : isEdit
                    ? "Update Article"
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
