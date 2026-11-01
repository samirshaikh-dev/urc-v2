import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }) {
  return (
    <Card hover className="flex flex-col justify-between h-full bg-white border-[#E5E7EB]">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <Badge variant="orange">{product.category}</Badge>
          <span className="text-[11px] text-[#5A5D63] font-medium">Industrial Grade</span>
        </div>
        <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2 group-hover:text-[#650510] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-[#5A5D63] leading-relaxed mb-6">
          {product.shortDescription}
        </p>

        {product.features && (
          <ul className="space-y-2 text-xs text-[#1A1A1A] mb-6">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5">
                {/* Small orange detail highlight */}
                <span className="w-1.5 h-1.5 rounded-full bg-[#F58634] mt-1.5 shrink-0" />
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
        <Link
          href={`/products/${product.slug}`}
          className="text-xs font-semibold text-[#650510] hover:text-[#F58634] transition-colors inline-flex items-center gap-1 group"
        >
          View Specifications
          <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </Link>
        <Link
          href="#quote"
          className="text-xs text-[#5A5D63] hover:text-[#650510] transition-colors"
        >
          Inquire
        </Link>
      </div>
    </Card>
  );
}
