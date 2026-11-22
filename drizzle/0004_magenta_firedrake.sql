CREATE TABLE IF NOT EXISTS "blogs" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text DEFAULT '' NOT NULL,
	"preview_text" text DEFAULT '' NOT NULL,
	"content" text NOT NULL,
	"tags" text DEFAULT '' NOT NULL,
	"author" text DEFAULT 'URC Engineering Team' NOT NULL,
	"read_time" text DEFAULT '4 min read' NOT NULL,
	"image_url" text,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "blogs_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blogs_published_created_at_idx" ON "blogs" USING btree ("published","created_at");