"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Trash2,
  Edit2,
  Search,
  FileText,
  Clock,
  User,
} from "lucide-react";
import { deleteBlogAction } from "@/api/blogs/admin/delete-blog";
import { toggleBlogPublishAction } from "@/api/blogs/admin/update-blog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-url";

export function BlogsListView({ initialBlogs = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState(initialBlogs);
  const [deletingId, setDeletingId] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  // Filter articles by search query
  const filteredBlogs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return blogs;
    return blogs.filter((b) => {
      return (
        b.title.toLowerCase().includes(q) ||
        b.slug.toLowerCase().includes(q) ||
        b.excerpt?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q)
      );
    });
  }, [blogs, searchQuery]);

  // Handle article deletion
  const handleDelete = async (blogId, blogTitle) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${blogTitle}"?`
    );
    if (!confirmed) return;

    setDeletingId(blogId);
    try {
      const res = await deleteBlogAction(blogId);
      if (res.success) {
        setBlogs((prev) => prev.filter((b) => b.id !== blogId));
        toast.success(`"${blogTitle}" was removed.`);
      } else {
        toast.error(res.error || "Failed to delete article.");
      }
    } catch {
      toast.error("Failed to delete article.");
    } finally {
      setDeletingId(null);
    }
  };

  // Toggle published status
  const handleTogglePublish = async (blogId, currentStatus) => {
    setTogglingId(blogId);
    try {
      const res = await toggleBlogPublishAction(blogId);
      if (res.success) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === blogId ? { ...b, published: res.published } : b))
        );
        toast.success(
          res.published ? "Article published live." : "Article set to draft."
        );
      } else {
        toast.error(res.error || "Failed to update article status.");
      }
    } catch {
      toast.error("Failed to update status.");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            Blogs &amp; Technical Articles
          </h1>

        </div>

        {/* '+' Add Button */}
        <Link
          href="/admin/blogs/new"
          className="size-9 sm:size-10 rounded-xl border border-[#D9DCD1] bg-[#F1F2EA] hover:bg-[#E9EAE1] flex items-center justify-center text-[#111111] transition-colors shadow-2xs group"
          title="Create New Article"
          aria-label="Create New Article"
        >
          <Plus className="size-5 transition-transform duration-150 group-hover:scale-110" />
        </Link>
      </div>

      {/* Search Bar & Total Count */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
        <div className="text-xs font-medium text-[#687080]">
          Total Articles:{" "}
          <span className="font-semibold text-[#111111]">{blogs.length}</span>
        </div>

        {/* Live Search Field */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, author, or keyword..."
            className="w-full rounded-lg border border-[#D9DCD1] bg-[#F1F2EA]/60 px-3 py-1.5 pl-8 text-xs text-[#111111] placeholder:text-[#687080] focus:border-[#111111] focus:bg-white focus:outline-none transition-colors"
          />
          <Search className="absolute left-2.5 top-2 size-3.5 text-[#687080]" />
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#D9DCD1] text-[11px] font-semibold text-[#687080] uppercase tracking-wider bg-[#F1F2EA]/40">
              <th scope="col" className="py-3 px-4 sm:px-6">
                Article
              </th>
              <th scope="col" className="py-3 px-4 hidden md:table-cell">
                Details
              </th>
              <th scope="col" className="py-3 px-4">
                Status
              </th>
              <th scope="col" className="py-3 px-4 sm:px-6 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#D9DCD1]">
            {filteredBlogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FileText className="size-10 text-[#687080]/40" />
                    <p className="mt-3 text-sm font-semibold text-[#111111]">
                      No articles found
                    </p>
                    <p className="mt-1 text-xs text-[#687080] max-w-sm">
                      {searchQuery
                        ? `No articles matched "${searchQuery}". Try adjusting your keywords.`
                        : "No articles published yet. Click '+' to compose your first post."}
                    </p>
                    {!searchQuery && (
                      <Link
                        href="/admin/blogs/new"
                        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#111111] px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-black transition-colors"
                      >
                        <Plus className="size-3.5" />
                        <span>Write First Article</span>
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredBlogs.map((blog) => {
                const isDeleting = deletingId === blog.id;
                const isToggling = togglingId === blog.id;

                return (
                  <tr
                    key={blog.id}
                    className="group hover:bg-[#F1F2EA]/60 transition-colors duration-100"
                  >
                    {/* Title & Thumbnail */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-[#D9DCD1] bg-white">
                          <Image
                            src={
                              optimizeCloudinaryUrl(blog.imageUrl, { width: 160 }) ||
                              "/images/placeholder-product.jpg"
                            }
                            alt={blog.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="min-w-0">
                          <span
                            className="block font-medium text-xs sm:text-sm text-[#111111] truncate max-w-xs sm:max-w-md"
                            title={blog.title}
                          >
                            {blog.title}
                          </span>
                          <span className="block text-[11px] text-[#687080] truncate max-w-xs sm:max-w-md">
                            {blog.excerpt || blog.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Meta Details: Author & Read Time */}
                    <td className="py-3.5 px-4 text-xs text-[#687080] hidden md:table-cell">
                      <div className="space-y-1">
                        <span className="flex items-center gap-1.5 text-[11px] text-[#687080]">
                          <User className="size-3" />
                          <span>{blog.author || "Editorial Desk"}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] text-[#687080]">
                          <Clock className="size-3" />
                          <span>{blog.readTime || "4 min read"}</span>
                        </span>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        disabled={isToggling}
                        onClick={() => handleTogglePublish(blog.id, blog.published)}
                        className="inline-flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
                        title="Click to toggle status"
                      >
                        <span
                          className={cn(
                            "size-1.5 sm:size-2 rounded-full",
                            blog.published ? "bg-[#00A85A]" : "bg-amber-500"
                          )}
                          aria-hidden="true"
                        />
                        <span
                          className={cn(
                            "text-xs font-medium",
                            blog.published ? "text-[#00A85A]" : "text-amber-700"
                          )}
                        >
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </button>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        {/* Edit Button */}
                        <Link
                          href={`/admin/blogs/${blog.id}/edit`}
                          className="size-7 sm:size-8 rounded-lg border border-[#D9DCD1] bg-white hover:bg-[#F1F2EA] flex items-center justify-center text-[#111111] transition-colors shadow-2xs"
                          title="Edit article"
                        >
                          <Edit2 className="size-3.5" />
                        </Link>

                        {/* Delete Button */}
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => handleDelete(blog.id, blog.title)}
                          className="size-7 sm:size-8 rounded-lg border border-[#D9DCD1] bg-white hover:border-red-200 hover:bg-red-50 hover:text-red-700 flex items-center justify-center text-[#687080] transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
                          title="Delete article"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
