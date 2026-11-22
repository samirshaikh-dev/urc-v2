import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Share2,
  ChevronRight,
  ShieldCheck,
  FileCheck2,
} from "lucide-react";
import {
  fetchBlogBySlug,
  fetchPublishedBlogs,
} from "@/api/blogs/public/get-blog";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import {
  constructMetadata,
  getBlogArticleJsonLd,
  getBreadcrumbJsonLd,
  getJsonLdScriptProps,
} from "@/lib/seo";

export async function generateStaticParams() {
  const blogs = await fetchPublishedBlogs();

  // Cache Components require at least one param at build time. An empty blog
  // table is valid before the first seed, so use a placeholder that resolves
  // to notFound() until a real article exists.
  if (blogs.length === 0) {
    return [{ slug: "__placeholder__" }];
  }

  return blogs.map((b) => ({
    slug: b.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return constructMetadata({
      title: "Article Not Found",
      description: "The requested technical article could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  const tagsArray = blog.tags
    ? blog.tags.split(",").map((t) => t.trim())
    : [];

  return constructMetadata({
    title: `${blog.title} | United Rubber Cork`,
    description: blog.excerpt,
    path: `/blog/${blog.slug}`,
    image: blog.imageUrl || "/og-image.png",
    keywords: [
      ...tagsArray,
      "rubber cork technical guide",
      "United Rubber Cork Vapi",
      "IS 4253 specification",
    ],
  });
}

export default async function BlogArticleDetailPage({ params }) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = await fetchPublishedBlogs();
  const relatedBlogs = allBlogs
    .filter((b) => b.slug !== blog.slug)
    .slice(0, 3);

  const blogArticleJsonLd = getBlogArticleJsonLd(blog);
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: blog.title, url: `/blog/${blog.slug}` },
  ]);

  const dateFormatted = new Date(blog.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tagsList = blog.tags
    ? blog.tags.split(",").map((t) => t.trim())
    : [];

  return (
    <>
      <script {...getJsonLdScriptProps([blogArticleJsonLd, breadcrumbJsonLd])} />

      <article className="min-h-screen bg-page/40 pb-20">
        {/* 01. BREADCRUMBS & ARTICLE HEADER */}
        <header className="border-b border-line bg-white pt-8 pb-12 sm:pt-12 sm:pb-16">
          <Container className="max-w-4xl">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
                <li>
                  <Link href="/" className="hover:text-maroon transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="size-3 text-muted/60" aria-hidden="true" />
                </li>
                <li>
                  <Link href="/blog" className="hover:text-maroon transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <ChevronRight className="size-3 text-muted/60" aria-hidden="true" />
                </li>
                <li className="max-w-[200px] sm:max-w-xs truncate font-medium text-ink" aria-current="page">
                  {blog.title}
                </li>
              </ol>
            </nav>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {tagsList.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-field px-3 py-1 text-xs font-semibold text-maroon border border-line"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* H1 Article Title */}
            <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl lg:text-4xl leading-tight">
              {blog.title}
            </h1>

            {/* Subtitle / Excerpt */}
            {blog.excerpt && (
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {blog.excerpt}
              </p>
            )}

            {/* Metadata Byline Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line/70 pt-6 text-xs text-muted">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-full bg-maroon/10 text-maroon">
                    <User className="size-3.5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block font-semibold text-ink">
                      {blog.author || "URC Engineering Team"}
                    </span>
                    <span className="block text-[11px] text-muted">GIDC Vapi Facility</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="size-3.5 text-muted" aria-hidden="true" />
                  <time dateTime={new Date(blog.createdAt).toISOString()}>{dateFormatted}</time>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-muted" aria-hidden="true" />
                  <span>{blog.readTime || "5 min read"}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 text-xs font-medium text-muted hover:text-maroon transition-colors"
                >
                  <ArrowLeft className="size-3.5" aria-hidden="true" />
                  <span>All Articles</span>
                </Link>
              </div>
            </div>
          </Container>
        </header>

        {/* 02. FEATURED IMAGE (OPTIONAL) */}
        {Boolean(blog.imageUrl?.trim()) && (
          <Container className="max-w-4xl pt-8 sm:pt-10">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-field shadow-sm">
              <Image
                src={blog.imageUrl}
                alt={blog.title}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          </Container>
        )}

        {/* 03. MAIN ARTICLE BODY */}
        <Container className="max-w-3xl pt-8 sm:pt-10">
          {/* Executive Summary / Key Takeaways Box */}
          <div className="mb-10 rounded-2xl border border-maroon/20 bg-maroon/5 p-6 sm:p-7">
            <div className="flex items-center gap-2 text-maroon font-semibold text-sm">
              <ShieldCheck className="size-5" aria-hidden="true" />
              <span>Executive Engineering Summary</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-stone-700 sm:text-sm">
              This technical document outlines engineering parameters for selecting and specifying cork composites conforming to Indian Standard IS 4253 and ASTM F104. Prepared by United Rubber Cork manufacturing and quality control in GIDC Vapi, Gujarat.
            </p>
          </div>

          {/* Formatted Article Content */}
          <div
            className="article-content space-y-6 text-sm leading-relaxed text-stone-800 sm:text-base sm:leading-relaxed [&>h2]:mt-10 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:text-ink [&>h2]:border-b [&>h2]:border-line [&>h2]:pb-2 [&>h3]:mt-6 [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-ink [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-maroon [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-muted [&>table]:w-full [&>table]:text-sm [&>table]:border-collapse [&_th]:border [&_th]:border-line [&_th]:p-2.5 [&_th]:bg-field [&_th]:text-ink [&_td]:border [&_td]:border-line [&_td]:p-2.5 [&_code]:rounded [&_code]:bg-field [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:font-mono [&_code]:text-maroon"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* 04. IN-ARTICLE CONSULTATION CALLOUT */}
          <div className="mt-12 rounded-2xl border border-line bg-white p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <span className="inline-block rounded-full bg-field px-2.5 py-0.5 text-[11px] font-semibold text-maroon">
                  Material Testing &amp; Custom Fabrication
                </span>
                <h3 className="mt-2 text-lg font-bold text-ink">
                  Require material testing samples or CAD joint drawings?
                </h3>
                <p className="mt-1 text-xs text-muted sm:text-sm">
                  Our Vapi plant produces custom die-cut shapes, dovetail rings, and slitted rolls with full batch test certificates.
                </p>
              </div>

              <Button
                href="/contact"
                className="shrink-0 rounded-full px-5 py-2 text-xs font-semibold"
              >
                Request Quotation
              </Button>
            </div>
          </div>

          {/* 05. AUTHOR & VERIFICATION FOOTER */}
          <div className="mt-10 flex items-center justify-between border-t border-line pt-6 text-xs text-muted">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-field font-semibold text-maroon">
                URC
              </div>
              <div>
                <span className="block font-semibold text-ink">United Rubber Cork</span>
                <span className="block text-[11px]">GIDC 2nd Phase, Vapi, Gujarat — 396195</span>
              </div>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-semibold text-maroon hover:underline"
            >
              <span>Back to all articles</span>
              <ArrowRight className="size-3" aria-hidden="true" />
            </Link>
          </div>
        </Container>

        {/* 06. RELATED ARTICLES SECTION */}
        {relatedBlogs.length > 0 && (
          <section className="mt-16 border-t border-line bg-white py-14 sm:py-20" aria-label="Related technical articles">
            <Container>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange">
                    Further Reading
                  </span>
                  <h2 className="mt-1 text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    Related Engineering Insights
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-maroon hover:underline"
                >
                  <span>View all articles</span>
                  <ArrowRight className="size-3.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedBlogs.map((related) => (
                  <BlogCard key={related.id || related.slug} blog={related} />
                ))}
              </div>
            </Container>
          </section>
        )}
      </article>
    </>
  );
}
