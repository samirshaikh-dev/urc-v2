"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Plus,
  ExternalLink,
  Trash2,
  Edit2,
  Search,
  Package,
} from "lucide-react";
import { deleteProductAction } from "@/actions/admin-products";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", name: "All Products" },
  { id: "cork-products", name: "Cork Products" },
  { id: "rubberised-cork", name: "Rubberised Cork" },
  { id: "decorative-cork", name: "Decorative Cork" },
  { id: "cork-gifts", name: "Cork Gifts" },
];

export function ProductsListView({ initialProducts = [] }) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState(
    categoryParam || "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState(initialProducts);
  const [deletingId, setDeletingId] = useState(null);

  // Sync category param from URL if changed via sidebar
  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  // Filter products by category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const pCat = p.categorySlug || p.category;
      const matchesCategory =
        activeCategory === "all" || pCat === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  // Handle product deletion with confirmation
  const handleDelete = async (productId, productName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${productName}"? This will remove it from the live website immediately.`
    );
    if (!confirmed) return;

    setDeletingId(productId);
    try {
      const res = await deleteProductAction(productId);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        toast.success(`"${productName}" was deleted successfully.`);
      } else {
        toast.error(res.error || "Failed to delete product.");
      }
    } catch {
      toast.error("Failed to delete product.");
    } finally {
      setDeletingId(null);
    }
  };

  const getCategoryName = (catSlug) => {
    const match = CATEGORIES.find((c) => c.id === catSlug);
    return match ? match.name : catSlug;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
            Products
          </h1>
        </div>

        {/* '+' Add Button */}
        <Link
          href="/admin/products/new"
          className="size-9 sm:size-10 rounded-xl border border-[#D9DCD1] bg-[#F1F2EA] hover:bg-[#E9EAE1] flex items-center justify-center text-[#111111] transition-colors shadow-2xs group"
          title="Add New Product"
          aria-label="Add New Product"
        >
          <Plus className="size-5 transition-transform duration-150 group-hover:scale-110" />
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? products.length
                : products.filter(
                    (p) => (p.categorySlug || p.category) === cat.id
                  ).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer whitespace-nowrap",
                  isActive
                    ? "bg-[#111111] text-white shadow-2xs"
                    : "bg-[#F1F2EA] text-[#687080] hover:text-[#111111] hover:bg-[#E9EAE1]"
                )}
              >
                <span>{cat.name}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px]",
                    isActive ? "bg-white/20 text-white" : "text-[#687080]"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search Field */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
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
                Title
              </th>
              <th scope="col" className="py-3 px-4 hidden md:table-cell">
                Category
              </th>
              <th scope="col" className="py-3 px-4 hidden lg:table-cell">
                Slug
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
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Package className="size-10 text-[#687080]/40" />
                    <p className="mt-3 text-sm font-semibold text-[#111111]">
                      No products found
                    </p>
                    <p className="mt-1 text-xs text-[#687080] max-w-sm">
                      {searchQuery
                        ? `No products matched "${searchQuery}". Try adjusting your search or category filter.`
                        : "No products exist in this category yet. Click '+' above to publish one."}
                    </p>
                    {!searchQuery && (
                      <Link
                        href="/admin/products/new"
                        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#111111] px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-black transition-colors"
                      >
                        <Plus className="size-3.5" />
                        <span>Add First Product</span>
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => {
                const categorySlug = product.categorySlug || product.category;
                const publicUrl = `/products/${categorySlug}/${product.slug}`;
                const isDeleting = deletingId === product.id;

                return (
                  <tr
                    key={product.id}
                    className="group hover:bg-[#F1F2EA]/60 transition-colors duration-100"
                  >
                    {/* Title & Thumbnail */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-lg border border-[#D9DCD1] bg-white">
                          <Image
                            src={product.imageUrl || product.image || "/images/placeholder-product.jpg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        </div>
                        <div className="min-w-0">
                          <span
                            className="block font-medium text-xs sm:text-sm text-[#111111] truncate max-w-xs sm:max-w-sm"
                            title={product.name}
                          >
                            {product.name}
                          </span>
                          <span className="block text-[11px] text-[#687080] md:hidden truncate">
                            {getCategoryName(categorySlug)}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category Column */}
                    <td className="py-3.5 px-4 text-xs text-[#687080] hidden md:table-cell">
                      <span className="inline-flex items-center rounded-md bg-[#F1F2EA] px-2 py-0.5 text-[11px] font-medium text-[#111111]">
                        {getCategoryName(categorySlug)}
                      </span>
                    </td>

                    {/* Slug Column */}
                    <td className="py-3.5 px-4 text-xs text-[#687080] font-mono hidden lg:table-cell">
                      <span
                        className="truncate block max-w-[220px]"
                        title={product.slug}
                      >
                        {product.slug}
                      </span>
                    </td>

                    {/* Status Column */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <span
                          className="size-1.5 sm:size-2 rounded-full bg-[#00A85A]"
                          aria-hidden="true"
                        />
                        <span className="text-xs font-medium text-[#00A85A]">
                          Published
                        </span>
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        {/* View on Public Site Button */}
                        <Link
                          href={publicUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="size-7 sm:size-8 rounded-lg border border-[#D9DCD1] bg-white hover:bg-[#F1F2EA] flex items-center justify-center text-[#687080] hover:text-[#111111] transition-colors shadow-2xs"
                          title="View live on website"
                        >
                          <ExternalLink className="size-3.5" />
                        </Link>

                        {/* Edit Button */}
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="size-7 sm:size-8 rounded-lg border border-[#D9DCD1] bg-white hover:bg-[#F1F2EA] flex items-center justify-center text-[#111111] transition-colors shadow-2xs"
                          title="Edit product"
                        >
                          <Edit2 className="size-3.5" />
                        </Link>

                        {/* Delete Button */}
                        <button
                          type="button"
                          disabled={isDeleting}
                          onClick={() => handleDelete(product.id, product.name)}
                          className="size-7 sm:size-8 rounded-lg border border-[#D9DCD1] bg-white hover:border-red-200 hover:bg-red-50 hover:text-red-700 flex items-center justify-center text-[#687080] transition-colors shadow-2xs disabled:opacity-50 cursor-pointer"
                          title="Delete product"
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

