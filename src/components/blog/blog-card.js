import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function BlogCard({ blog, featured = false }) {
  if (!blog) return null;

  const dateFormatted = new Date(blog.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const firstTag = blog.tags?.split(",")?.[0]?.trim() || "Technical Guide";

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:border-maroon/30 hover:shadow-md lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-field sm:aspect-[16/9] lg:col-span-7 lg:h-full">
          <Image
            src={blog.imageUrl || "/images/placeholder-product.jpg"}
            alt={blog.title}
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center rounded-full bg-maroon px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
              Featured Insight
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:py-8 lg:pr-8 lg:pl-0">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
              <span className="rounded-md bg-field px-2.5 py-1 font-medium text-ink">
                {firstTag}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="size-3.5" aria-hidden="true" />
                <time dateTime={new Date(blog.createdAt).toISOString()}>{dateFormatted}</time>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" aria-hidden="true" />
                <span>{blog.readTime || "5 min read"}</span>
              </span>
            </div>

            <h2 className="mt-4 text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-maroon sm:text-2xl lg:text-3xl">
              <Link href={`/blog/${blog.slug}`} className="focus-visible:outline-2 focus-visible:outline-maroon">
                {blog.title}
              </Link>
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3 sm:text-base">
              {blog.excerpt}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4">
            <div className="flex items-center gap-2 text-xs text-muted">
              <User className="size-3.5 text-maroon" aria-hidden="true" />
              <span className="font-medium text-ink">{blog.author || "URC Engineering Team"}</span>
            </div>

            <Link
              href={`/blog/${blog.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-maroon transition-transform group-hover:translate-x-1"
              aria-label={`Read full article: ${blog.title}`}
            >
              <span>Read Guide</span>
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:border-maroon/30 hover:shadow-md">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-field">
        <Image
          src={blog.imageUrl || "/images/placeholder-product.jpg"}
          alt={blog.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center rounded-md bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-maroon shadow-xs backdrop-blur-xs">
            {firstTag}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex items-center gap-3 text-xs text-muted">
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

          <h3 className="mt-3 text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-maroon sm:text-xl line-clamp-2">
            <Link href={`/blog/${blog.slug}`} className="focus-visible:outline-2 focus-visible:outline-maroon">
              {blog.title}
            </Link>
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-3 sm:text-sm">
            {blog.excerpt}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-3">
          <span className="text-xs text-muted truncate max-w-[150px]">
            {blog.author || "URC Engineering"}
          </span>

          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-maroon transition-transform group-hover:translate-x-1"
            aria-label={`Read article: ${blog.title}`}
          >
            <span>Read full guide</span>
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
