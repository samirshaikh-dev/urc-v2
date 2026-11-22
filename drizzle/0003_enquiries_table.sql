CREATE TABLE "enquiries" (
	"id" text PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"company_name" text NOT NULL,
	"business_email" text NOT NULL,
	"phone_number" text DEFAULT '' NOT NULL,
	"product_interested_in" text DEFAULT 'General Inquiry / Other' NOT NULL,
	"requirement_details" text NOT NULL,
	"submission_method" text DEFAULT 'email' NOT NULL,
	"email_status" text DEFAULT 'pending' NOT NULL,
	"whatsapp_status" text DEFAULT 'not_sent' NOT NULL,
	"lead_status" text DEFAULT 'new' NOT NULL,
	"notes" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "enquiries_submission_method_check" CHECK ("enquiries"."submission_method" in ('email', 'whatsapp')),
	CONSTRAINT "enquiries_email_status_check" CHECK ("enquiries"."email_status" in ('pending', 'sent', 'failed', 'not_applicable')),
	CONSTRAINT "enquiries_whatsapp_status_check" CHECK ("enquiries"."whatsapp_status" in ('initiated', 'not_sent', 'sent')),
	CONSTRAINT "enquiries_lead_status_check" CHECK ("enquiries"."lead_status" in ('new', 'review', 'quoted', 'converted', 'archived'))
);
--> statement-breakpoint
CREATE INDEX "enquiries_business_email_idx" ON "enquiries" USING btree ("business_email");--> statement-breakpoint
CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "enquiries_lead_status_idx" ON "enquiries" USING btree ("lead_status");
