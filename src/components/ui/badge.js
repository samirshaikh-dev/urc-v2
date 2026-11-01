import { cn } from "@/lib/utils";

export function Badge({ children, className = "", variant = "default", ...props }) {
  const variants = {
    default:
      "bg-[#F1F2F3] text-[#1A1A1A] border-[#E5E7EB]",
    maroon:
      "bg-[#650510]/10 text-[#650510] border-[#650510]/20",
    orange:
      "bg-[#F58634]/15 text-[#C85207] border-[#F58634]/30",
    accent:
      "bg-[#F58634]/15 text-[#C85207] border-[#F58634]/30",
    yellow:
      "bg-[#FCC813]/25 text-[#7A5B00] border-[#FCC813]/40",
    outline:
      "bg-transparent text-[#5A5D63] border-[#E5E7EB]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide select-none",
        variants[variant] || variants.default,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
