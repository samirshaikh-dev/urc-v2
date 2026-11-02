import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

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
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    categorySlugIndex: index("products_category_slug_idx").on(table.categorySlug),
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
