import { sql } from "drizzle-orm";
import {
  boolean,
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

export const blogs = pgTable(
  "blogs",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull().default(""),
    previewText: text("preview_text").notNull().default(""),
    content: text("content").notNull(),
    tags: text("tags").notNull().default(""),
    author: text("author").notNull().default("URC Engineering Team"),
    readTime: text("read_time").notNull().default("4 min read"),
    imageUrl: text("image_url"),
    published: boolean("published").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    publishedCreatedAtIndex: index("blogs_published_created_at_idx").on(
      table.published,
      table.createdAt
    ),
  })
);

// Enquiry status values
// submissionMethod: 'email' | 'whatsapp'
// emailStatus:     'pending' | 'sent' | 'failed' | 'not_applicable'
// whatsappStatus:  'initiated' | 'not_sent' | 'sent'
// leadStatus:      'new' | 'review' | 'quoted' | 'converted' | 'archived'
export const enquiries = pgTable(
  "enquiries",
  {
    id: text("id").primaryKey(),
    // Customer fields
    fullName: text("full_name").notNull(),
    companyName: text("company_name").notNull(),
    businessEmail: text("business_email").notNull(),
    phoneNumber: text("phone_number").notNull().default(""),
    productInterestedIn: text("product_interested_in").notNull().default("General Inquiry / Other"),
    requirementDetails: text("requirement_details").notNull(),
    // Workflow tracking
    submissionMethod: text("submission_method").notNull().default("email"),
    emailStatus: text("email_status").notNull().default("pending"),
    whatsappStatus: text("whatsapp_status").notNull().default("not_sent"),
    // CRM status
    leadStatus: text("lead_status").notNull().default("new"),
    notes: jsonb("notes").notNull().default([]),
    // Timestamps
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => ({
    emailIndex: index("enquiries_business_email_idx").on(table.businessEmail),
    createdAtIndex: index("enquiries_created_at_idx").on(table.createdAt),
    leadStatusIndex: index("enquiries_lead_status_idx").on(table.leadStatus),
    submissionMethodCheck: check(
      "enquiries_submission_method_check",
      sql`${table.submissionMethod} in ('email', 'whatsapp')`
    ),
    emailStatusCheck: check(
      "enquiries_email_status_check",
      sql`${table.emailStatus} in ('pending', 'sent', 'failed', 'not_applicable')`
    ),
    whatsappStatusCheck: check(
      "enquiries_whatsapp_status_check",
      sql`${table.whatsappStatus} in ('initiated', 'not_sent', 'sent')`
    ),
    leadStatusCheck: check(
      "enquiries_lead_status_check",
      sql`${table.leadStatus} in ('new', 'review', 'quoted', 'converted', 'archived')`
    ),
  })
);
