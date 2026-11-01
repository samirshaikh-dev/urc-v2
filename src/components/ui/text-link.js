import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Inline navigation link with a single, consistent arrow affordance.
 * Use for secondary actions and "view details" links instead of inventing
 * another button style.
 */
export function TextLink({ href, children, onDark = false, className = "", ...props }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-control text-sm font-medium underline-offset-4 transition-colors duration-150 hover:underline",
        onDark ? "text-white focus-visible:outline-white" : "text-maroon",
        className
      )}
      {...props}
    >
      {children}
      <ArrowRight
        className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:translate-x-0"
        aria-hidden="true"
      />
    </Link>
  );
}
