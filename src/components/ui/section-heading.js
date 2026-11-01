import { cn } from "@/lib/utils";

/**
 * Section heading. Left-aligned by design — the page should not be a stack of
 * centered blocks. Spacing is owned by the calling section.
 */
export function SectionHeading({ kicker, title, description, className = "" }) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {kicker && (
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-ink">
          {kicker}
        </p>
      )}
      <h2
        className={cn(
          "text-2xl font-semibold tracking-tight text-ink sm:text-3xl",
          kicker && "mt-2"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
