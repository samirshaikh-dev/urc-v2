import Link from "next/link";
import { cn } from "@/lib/utils";

const variantStyles = {
  primary:
    "bg-[#650510] text-white hover:bg-[#50040D] focus-visible:ring-[#650510] shadow-xs",
  secondary:
    "bg-white text-[#650510] border border-[#650510] hover:bg-[#F5F5F5] focus-visible:ring-[#650510]",
  outlineLight:
    "bg-transparent text-white border border-white hover:bg-white/10 focus-visible:ring-white",
  accent:
    "bg-[#F58634] text-[#1A1A1A] font-semibold hover:opacity-95 focus-visible:ring-[#F58634] shadow-xs",
  ghost:
    "text-[#1A1A1A] hover:text-[#650510] hover:bg-[#F1F2F3] focus-visible:ring-[#650510]",
  white:
    "bg-white text-[#650510] border border-white hover:bg-[#F5F5F5] focus-visible:ring-white",
};

const sizeStyles = {
  sm: "h-9 px-3.5 text-xs font-medium rounded-md",
  md: "h-11 px-5 text-sm font-medium rounded-md",
  lg: "h-12 px-7 text-base font-medium rounded-lg",
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
  const baseClasses = cn(
    "inline-flex items-center justify-center transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none tracking-tight",
    variantStyles[variant] || variantStyles.primary,
    sizeStyles[size] || sizeStyles.md,
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClasses} {...props}>
      {children}
    </button>
  );
}
