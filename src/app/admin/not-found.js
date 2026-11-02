import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
        404 — Not found
      </p>
      <h1 className="mt-3 text-2xl font-bold tracking-tight text-ink">
        This admin page doesn&apos;t exist.
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        It may have been moved or removed. Head back to the product list to
        continue.
      </p>
      <Link
        href="/admin/products"
        className="mt-6 inline-flex items-center gap-1.5 rounded-xl bg-maroon px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-maroon-deep"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to products
      </Link>
    </div>
  );
}
