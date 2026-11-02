CREATE TABLE "product_faqs" (
	"id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_specifications" (
	"id" text PRIMARY KEY NOT NULL,
	"product_id" text NOT NULL,
	"property" text NOT NULL,
	"value" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"category_slug" text NOT NULL,
	"image_url" text NOT NULL,
	"image_public_id" text,
	"badge" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "product_faqs" ADD CONSTRAINT "product_faqs_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_specifications" ADD CONSTRAINT "product_specifications_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "product_faqs_product_sort_idx" ON "product_faqs" USING btree ("product_id","sort_order");--> statement-breakpoint
CREATE INDEX "product_specifications_product_sort_idx" ON "product_specifications" USING btree ("product_id","sort_order");--> statement-breakpoint
CREATE INDEX "products_category_slug_idx" ON "products" USING btree ("category_slug");