import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const products = pgTable(
  "products",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    categorySlug: text("category_slug").notNull(),
    imageUrl: text("image_url").notNull(),
    imagePublicId: text("image_public_id"),
    badge: text("badge"),
    // Optional SEO/content fields. Empty values mean the public layer should
    // derive copy from verified product content rather than invent anything.
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
    seoImageUrl: text("seo_image_url"),
    imageAlt: text("image_alt"),
    introduction: text("introduction"),
    features: jsonb("features").notNull().default([]),
    applications: jsonb("applications").notNull().default([]),
    benefits: jsonb("benefits").notNull().default([]),
    relatedProductIds: jsonb("related_product_ids").notNull().default([]),
    sku: text("sku"),
    mpn: text("mpn"),
    visibility: text("visibility").notNull().default("public"),
    lifecycleStatus: text("lifecycle_status").notNull().default("active"),
    indexingStatus: text("indexing_status").notNull().default("auto"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    categorySlugIndex: index("products_category_slug_idx").on(table.categorySlug),
    visibilityIndex: index("products_visibility_idx").on(table.visibility),
    visibilityLifecycleIndex: index("products_visibility_lifecycle_idx").on(
      table.visibility,
      table.lifecycleStatus
    ),
    visibilityCheck: check(
      "products_visibility_check",
      sql`${table.visibility} in ('public', 'private', 'draft')`
    ),
    lifecycleStatusCheck: check(
      "products_lifecycle_status_check",
      sql`${table.lifecycleStatus} in ('active', 'out_of_stock', 'discontinued')`
    ),
    indexingStatusCheck: check(
      "products_indexing_status_check",
      sql`${table.indexingStatus} in ('auto', 'index', 'noindex')`
    ),
  })
);

export const productFaqs = pgTable(
  "product_faqs",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => ({
    productSortIndex: index("product_faqs_product_sort_idx").on(table.productId, table.sortOrder),
  })
);

export const productSpecifications = pgTable(
  "product_specifications",
  {
    id: text("id").primaryKey(),
    productId: text("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    property: text("property").notNull(),
    value: text("value").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
  },
  (table) => ({
    productSortIndex: index("product_specifications_product_sort_idx").on(
      table.productId,
      table.sortOrder
    ),
  })
);
