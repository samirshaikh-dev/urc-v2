import { cn } from "@/lib/utils";

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className = "",
  titleClassName = "",
}) {
  const alignments = {
    left: "text-left",
    center: "text-center mx-auto",
  };

  return (
    <div className={cn("max-w-2xl mb-10", alignments[align] || alignments.left, className)}>
      {kicker && (
        <p className="text-xs font-semibold uppercase tracking-wider text-[#F58634] mb-2.5">
          {kicker}
        </p>
      )}
      <h2
        className={cn(
          "text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1A1A] leading-tight",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm sm:text-base text-[#5A5D63] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
