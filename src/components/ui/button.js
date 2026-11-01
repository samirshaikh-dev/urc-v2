import Link from "next/link";
import { cn } from "@/lib/utils";

/*
 * Three variants only, each with one job:
 * primary   — the main action on light surfaces
 * secondary — a supporting action on light surfaces
 * inverse   — the main action placed on a maroon surface
 * Ring colour is declared per variant so it never depends on class order.
 */
const variantStyles = {
  primary:
    "bg-maroon text-white hover:bg-maroon-deep focus-visible:ring-maroon focus-visible:ring-offset-2",
  secondary:
    "border border-maroon/60 bg-transparent text-maroon hover:border-maroon hover:bg-white focus-visible:ring-maroon focus-visible:ring-offset-2",
  inverse:
    "bg-white text-maroon hover:bg-white/90 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-maroon",
};

const sizeStyles = {
  sm: "h-9 gap-1.5 px-4 text-sm",
  md: "h-11 gap-2 px-5 text-sm",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  href,
  type = "button",
  ...props
}) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-control font-medium transition-colors duration-150 select-none",
    "focus-visible:ring-2 focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant] ?? variantStyles.primary,
    sizeStyles[size] ?? sizeStyles.md,
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
