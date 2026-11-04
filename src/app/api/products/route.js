import { NextResponse } from "next/server";
import { and, desc, eq, sql } from "drizzle-orm";
import { getDbClient } from "@/lib/db";
import { products } from "@/db/schema";

/**
 * GET /api/products?page=1&limit=3&category=all
 * Returns: { data: [...], total, page, limit, totalPages }
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const limitParam = parseInt(searchParams.get("limit") || "3", 10);
    const categoryParam = searchParams.get("category")?.trim() || "";

    const page = Math.max(1, isNaN(pageParam) ? 1 : pageParam);
    const limit = Math.min(50, Math.max(1, isNaN(limitParam) ? 3 : limitParam));
    const offset = (page - 1) * limit;

    const db = getDbClient();
    if (!db) {
      return NextResponse.json(
        { error: "Database not configured", data: [], total: 0, page, limit, totalPages: 1 },
        { status: 503 }
      );
    }

    const conditions = [];
    if (categoryParam && categoryParam !== "all") {
      conditions.push(eq(products.categorySlug, categoryParam));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Total count
    const countResult = await db
      .select({ count: sql`count(*)::int` })
      .from(products)
      .where(whereClause);

    const total = Number(countResult[0]?.count || 0);

    // Paginated products from DB
    const rows = await db
      .select()
      .from(products)
      .where(whereClause)
      .orderBy(desc(products.createdAt))
      .limit(limit)
      .offset(offset);

    const data = rows.map((row) => {
      // Strip HTML tags and create clean description snippet
      const cleanDescription = (row.description || "")
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      const shortDescription =
        cleanDescription.length > 150
          ? `${cleanDescription.slice(0, 150).trim()}...`
          : cleanDescription;

      return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        badge: row.badge || "",
        imageUrl: row.imageUrl,
        categorySlug: row.categorySlug,
        description: row.description,
        shortDescription,
        url: `/products/${row.categorySlug}/${row.slug}`,
      };
    });

    const totalPages = Math.ceil(total / limit) || 1;

    return NextResponse.json({
      data,
      total,
      page,
      limit,
      totalPages,
    });
  } catch (error) {
    console.error("[api/products] Error fetching from database:", error);
    return NextResponse.json(
      { error: "Failed to fetch products from database", message: error.message },
      { status: 500 }
    );
  }
}
