import { cn } from "@/lib/utils";

/**
 * Small inline label. Rectangular, not pill-shaped, so it reads as a technical
 * label rather than a decorative chip.
 */
const variants = {
  default: "border-line bg-field text-muted",
  maroon: "border-maroon/20 bg-maroon/5 text-maroon",
  orange: "border-orange/30 bg-orange/10 text-orange-ink",
};

export function Badge({ children, className = "", variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-control border px-2 py-0.5 text-xs font-medium",
        variants[variant] ?? variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
