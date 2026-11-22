"use client";

import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { BlogCard } from "./blog-card";

export function BlogListClient({ initialBlogs = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("ALL");

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set();
    initialBlogs.forEach((blog) => {
      if (blog.tags) {
        blog.tags.split(",").forEach((t) => {
          const trimmed = t.trim();
          if (trimmed) tagSet.add(trimmed);
        });
      }
    });
    return Array.from(tagSet);
  }, [initialBlogs]);

  // Filtered blogs based on search query and selected tag
  const filteredBlogs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return initialBlogs.filter((blog) => {
      const matchesTag =
        selectedTag === "ALL" ||
        (blog.tags &&
          blog.tags
            .toLowerCase()
            .split(",")
            .map((t) => t.trim())
            .includes(selectedTag.toLowerCase()));

      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt?.toLowerCase().includes(q) ||
        blog.tags?.toLowerCase().includes(q) ||
        blog.content?.toLowerCase().includes(q);

      return matchesTag && matchesSearch;
    });
  }, [initialBlogs, searchQuery, selectedTag]);

  const featuredBlog = filteredBlogs.length > 0 ? filteredBlogs[0] : null;
  const regularBlogs = filteredBlogs.length > 1 ? filteredBlogs.slice(1) : [];

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 shadow-xs sm:p-5 md:flex-row md:items-center md:justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search
            className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by keyword, grade, standard..."
            aria-label="Search technical articles"
            className="w-full rounded-full border border-line bg-field/60 py-2.5 pr-10 pl-10 text-sm text-ink placeholder:text-muted focus:border-maroon focus:bg-white focus:outline-hidden"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-3.5 -translate-y-1/2 rounded-full p-0.5 text-muted hover:text-ink"
              aria-label="Clear search query"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Tag Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0" role="tablist" aria-label="Filter articles by topic">
          <button
            type="button"
            role="tab"
            aria-selected={selectedTag === "ALL"}
            onClick={() => setSelectedTag("ALL")}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 cursor-pointer ${
              selectedTag === "ALL"
                ? "bg-maroon text-white"
                : "bg-field text-ink hover:bg-stone-200"
            }`}
          >
            All Articles ({initialBlogs.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              role="tab"
              aria-selected={selectedTag === tag}
              onClick={() => setSelectedTag(tag)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150 cursor-pointer ${
                selectedTag === tag
                  ? "bg-maroon text-white font-semibold"
                  : "bg-field text-muted hover:bg-stone-200 hover:text-ink"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Active Filter indicator */}
      {(searchQuery || selectedTag !== "ALL") && (
        <div className="flex items-center justify-between text-xs text-muted">
          <span>
            Found <strong>{filteredBlogs.length}</strong> {filteredBlogs.length === 1 ? "article" : "articles"}
            {selectedTag !== "ALL" && (
              <> for topic &ldquo;<span className="text-maroon font-medium">{selectedTag}</span>&rdquo;</>
            )}
            {searchQuery && (
              <> matching &ldquo;<span className="text-maroon font-medium">{searchQuery}</span>&rdquo;</>
            )}
          </span>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("ALL");
            }}
            className="font-medium text-maroon hover:underline cursor-pointer"
          >
            Reset filters
          </button>
        </div>
      )}

      {/* No Results Fallback */}
      {filteredBlogs.length === 0 && (
        <div className="rounded-2xl border border-dashed border-line bg-white py-16 text-center">
          <p className="text-base font-medium text-ink">No engineering articles match your criteria.</p>
          <p className="mt-1 text-xs text-muted">
            Try adjusting your search terms or select &ldquo;All Articles&rdquo;.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("ALL");
            }}
            className="mt-4 inline-flex items-center rounded-full bg-maroon px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-maroon-deep transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Featured Card (When on All or first match) */}
      {featuredBlog && !searchQuery && selectedTag === "ALL" && (
        <section aria-label="Featured technical insight">
          <BlogCard blog={featuredBlog} featured />
        </section>
      )}

      {/* Regular Articles Grid */}
      {filteredBlogs.length > 0 && (
        <section
          aria-label="Engineering guides and articles"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {(!searchQuery && selectedTag === "ALL" ? regularBlogs : filteredBlogs).map((blog) => (
            <BlogCard key={blog.id || blog.slug} blog={blog} />
          ))}
        </section>
      )}
    </div>
  );
}
