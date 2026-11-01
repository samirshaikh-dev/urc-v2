import { cn } from "@/lib/utils";

export function Card({ children, className = "", hover = false, ...props }) {
  return (
    <div
      className={cn(
        "bg-[var(--color-pure-white)] border border-[var(--color-soft-border)] rounded-xl p-6 transition-all duration-200",
        hover && "hover:border-[var(--color-maroon)]/40 hover:shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
