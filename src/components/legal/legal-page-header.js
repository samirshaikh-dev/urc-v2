import Link from "next/link";
import { ChevronRight, ShieldCheck, Calendar, Building2, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SITE_CONFIG } from "@/lib/constants";
import { COMPANY_INFO } from "@/data/company";

export function LegalPageHeader({
  eyebrow = "Legal & Compliance",
  title,
  description,
  lastUpdated = "November 2026",
  documentType = "Official Policy Document",
}) {
  return (
    <section className="relative overflow-hidden pt-4 pb-8 sm:pt-6 sm:pb-12">
      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
          <ol className="flex items-center gap-1.5 text-xs text-muted sm:text-sm">
            <li>
              <Link
                href="/"
                className="rounded-control text-muted hover:text-maroon transition-colors duration-150"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted/60">
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <span className="text-muted/80">Legal</span>
            </li>
            <li aria-hidden="true" className="text-muted/60">
              <ChevronRight className="size-3.5" />
            </li>
            <li>
              <span aria-current="page" className="font-semibold text-ink">
                {title}
              </span>
            </li>
          </ol>
        </nav>

        {/* Hero Banner with Confirmed Brand Maroon Theme */}
        <div className="overflow-hidden rounded-3xl border border-line bg-maroon p-6 sm:p-10 lg:p-12 text-white shadow-xs">
          <div className="max-w-3xl">
            {/* Eyebrow kicker with yellow rule accent */}
            <p className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-white/80">
              <span className="h-px w-5 bg-yellow" aria-hidden="true" />
              <span>{eyebrow}</span>
            </p>

            {/* Main Headline */}
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl sm:leading-[1.18]">
              {title}
            </h1>

            {/* Concise Supporting Description */}
            {description && (
              <p className="mt-3.5 text-sm leading-relaxed text-white/80 sm:text-base">
                {description}
              </p>
            )}

            {/* Metadata Pills Strip */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/15 pt-5 text-xs text-white/75">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-medium backdrop-blur-xs">
                <Calendar className="size-3.5 text-yellow" aria-hidden="true" />
                <span>Last Updated: {lastUpdated}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-medium backdrop-blur-xs">
                <Building2 className="size-3.5 text-yellow" aria-hidden="true" />
                <span>Entity: {SITE_CONFIG.name}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-medium backdrop-blur-xs">
                <MapPin className="size-3.5 text-yellow" aria-hidden="true" />
                <span>Jurisdiction: Vapi, Gujarat, India</span>
              </div>

              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-medium backdrop-blur-xs">
                <ShieldCheck className="size-3.5 text-yellow" aria-hidden="true" />
                <span>{documentType}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

