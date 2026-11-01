import { cn } from "@/lib/utils";

/**
 * Elevated content surface. Use only where a surface genuinely needs to be
 * separated from the page — not as a wrapper around every section.
 */
export function Card({ children, className = "", hover = false, ...props }) {
  return (
    <div
      className={cn(
        "rounded-panel border border-line bg-white p-6",
        hover && "transition-colors duration-150 hover:border-maroon/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
