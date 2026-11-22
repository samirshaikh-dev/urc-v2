import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export function BlogCard({ blog, featured = false }) {
  if (!blog) return null;

  const dateFormatted = new Date(blog.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const firstTag = blog.tags?.split(",")?.[0]?.trim() || "Technical Guide";
  const hasImage = Boolean(blog.imageUrl?.trim());
  const panelText =
    blog.previewText?.trim() ||
    blog.content?.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 180) ||
    blog.excerpt;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:border-maroon/30 hover:shadow-md">
      {/* 01. PREVIEW PANEL (Image or Text Panel, exactly the same height & placement) */}
      {hasImage ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-field">
          <Image
            src={blog.imageUrl}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Category pill floating top-left */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-maroon shadow-xs backdrop-blur-xs">
              {firstTag}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#F6E9EA] via-[#FAF4F4] to-white p-5 pt-12 flex flex-col justify-between border-b border-line/40">
          {/* Faint URC watermark at bottom-right */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-3 bottom-0 select-none font-black tracking-tighter text-maroon/[0.05] text-6xl leading-none z-0"
          >
            URC
          </div>

          {/* Category pill floating top-left */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-maroon shadow-xs border border-maroon/10">
              {firstTag}
            </span>
          </div>

          {/* Decorative subtle gold accent line at top */}
          <div className="relative z-10 flex items-center gap-1.5 pt-1">
            <span className="h-0.5 w-6 rounded-full bg-yellow" aria-hidden="true" />
            <Quote className="size-3 text-maroon/40" aria-hidden="true" />
          </div>

          {/* Preview takeaway text (4-5 lines, 14-15px) */}
          <div className="relative z-10 my-auto py-1">
            <p className="line-clamp-4 text-xs sm:text-[13.5px] leading-relaxed text-stone-700 font-normal">
              &ldquo;{panelText}&rdquo;
            </p>
          </div>

          <div className="relative z-10" />
        </div>
      )}

      {/* 02. SHARED CARD BODY (Identical structure, font-weights, and alignment) */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          {/* Meta row: Date • Read time */}
          <div className="flex items-center gap-2 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" aria-hidden="true" />
              <time dateTime={new Date(blog.createdAt).toISOString()}>{dateFormatted}</time>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" aria-hidden="true" />
              <span>{blog.readTime || "5 min read"}</span>
            </span>
          </div>

          {/* Title: Near-black, clamped to 2 lines */}
          <h3 className="mt-3 text-base sm:text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-maroon line-clamp-2">
            <Link href={`/blog/${blog.slug}`} className="focus-visible:outline-2 focus-visible:outline-maroon">
              {blog.title}
            </Link>
          </h3>

          {/* Excerpt: Clamped to 3 lines */}
          <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-3 sm:text-sm">
            {blog.excerpt}
          </p>
        </div>

        {/* 03. FOOTER: Author on left, Read guide on right (Pinned to bottom) */}
        <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-3">
          <span className="text-xs text-muted truncate max-w-[150px]">
            {blog.author || "URC Engineering Team"}
          </span>

          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-maroon transition-transform group-hover:translate-x-1"
            aria-label={`Read article: ${blog.title}`}
          >
            <span>Read guide</span>
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
