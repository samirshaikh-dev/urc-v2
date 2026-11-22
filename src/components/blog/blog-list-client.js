"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X, ChevronDown, ArrowRight } from "lucide-react";
import { BlogCard } from "./blog-card";

export function BlogListClient({ initialBlogs = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");

  // Derive primary categories with positive post counts
  const categoriesWithCounts = useMemo(() => {
    const categoryMap = new Map();

    initialBlogs.forEach((blog) => {
      // Primary category is the first tag
      const primaryTag = blog.tags?.split(",")?.[0]?.trim();
      if (primaryTag) {
        categoryMap.set(primaryTag, (categoryMap.get(primaryTag) || 0) + 1);
      }
    });

    return Array.from(categoryMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  }, [initialBlogs]);

  // Filtered and sorted blogs
  const filteredAndSortedBlogs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    const filtered = initialBlogs.filter((blog) => {
      const primaryTag = blog.tags?.split(",")?.[0]?.trim()?.toLowerCase();
      const allTags = blog.tags?.toLowerCase() || "";

      const matchesCategory =
        selectedCategory === "ALL" ||
        primaryTag === selectedCategory.toLowerCase() ||
        allTags.includes(selectedCategory.toLowerCase());

      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt?.toLowerCase().includes(q) ||
        blog.tags?.toLowerCase().includes(q) ||
        blog.content?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [initialBlogs, searchQuery, selectedCategory, sortBy]);

  return (
    <div>
      {/* 01. SEARCH & CATEGORY FILTER CONTROL (Inside Hero) */}
      <div className="mx-auto max-w-2xl w-full">
        <div className="relative flex items-center rounded-full border border-line bg-white shadow-xs focus-within:border-maroon focus-within:ring-2 focus-within:ring-maroon/10 transition-all p-1 sm:p-1.5">
          {/* Search Icon */}
          <Search className="ml-3 sm:ml-3.5 size-4 shrink-0 text-muted" aria-hidden="true" />

          {/* Search Input */}
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides: NBR vs Neoprene, IS 4253, gasket thickness…"
            aria-label="Search technical guides and articles"
            className="w-full min-w-0 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-ink placeholder:text-muted/70 focus:outline-hidden"
          />

          {/* Clear Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mr-1.5 rounded-full p-1 text-muted hover:text-ink cursor-pointer transition-colors"
              aria-label="Clear search query"
            >
              <X className="size-3.5" />
            </button>
          )}

          {/* Vertical Divider */}
          <div className="h-5 w-px bg-line shrink-0" aria-hidden="true" />

          {/* Category Dropdown */}
          <div className="relative shrink-0 pr-1 pl-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by category"
              className="appearance-none bg-transparent pr-7 pl-1.5 py-1 text-xs sm:text-sm font-medium text-ink hover:text-maroon focus:outline-hidden cursor-pointer"
            >
              <option value="ALL">All categories ({initialBlogs.length})</option>
              {categoriesWithCounts.map(({ name, count }) => (
                <option key={name} value={name}>
                  {name} ({count})
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Conversion Path Prompt */}
        <p className="mt-3 text-center text-xs text-muted">
          Can&apos;t find your answer?{" "}
          <Link
            href="/contact"
            className="font-medium text-maroon hover:underline inline-flex items-center gap-1 transition-colors"
          >
            <span>Send your specification to our engineers</span>
            <ArrowRight className="size-3" aria-hidden="true" />
          </Link>
        </p>
      </div>

      {/* 02. SLIM RESULTS LINE (Below Hero, no card around it) */}
      <div className="mt-10 sm:mt-12 flex items-center justify-between border-b border-line/70 pb-3 text-xs text-muted">
        <div>
          <span>
            Showing <strong>{filteredAndSortedBlogs.length}</strong>{" "}
            {filteredAndSortedBlogs.length === 1 ? "article" : "articles"}
            {selectedCategory !== "ALL" && (
              <>
                {" "}in <span className="font-semibold text-ink">&ldquo;{selectedCategory}&rdquo;</span>
              </>
            )}
            {searchQuery && (
              <>
                {" "}matching <span className="font-semibold text-ink">&ldquo;{searchQuery}&rdquo;</span>
              </>
            )}
          </span>
          {(selectedCategory !== "ALL" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="ml-3 font-medium text-maroon hover:underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        {/* Sort Control */}
        <div className="flex items-center gap-1.5 shrink-0">
          <label htmlFor="blog-sort" className="text-muted hidden sm:inline">
            Sort:
          </label>
          <div className="relative">
            <select
              id="blog-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort articles"
              className="appearance-none rounded-md border border-line bg-white pr-6 pl-2.5 py-1 text-xs font-medium text-ink hover:border-maroon/40 focus:border-maroon focus:outline-hidden cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 size-3 text-muted"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* 03. ARTICLES GRID (Immediate start above the fold) */}
      {filteredAndSortedBlogs.length > 0 ? (
        <section
          aria-label="Engineering guides and articles"
          className="mt-6 sm:mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredAndSortedBlogs.map((blog) => (
            <BlogCard key={blog.id || blog.slug} blog={blog} />
          ))}
        </section>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-line bg-white py-16 text-center">
          <p className="text-base font-semibold text-ink">No engineering articles match your criteria.</p>
          <p className="mt-1 text-xs text-muted max-w-sm mx-auto">
            Try adjusting your search terms or select &ldquo;All categories&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("ALL");
            }}
            className="mt-4 inline-flex items-center rounded-full bg-maroon px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-maroon-deep transition-colors cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
