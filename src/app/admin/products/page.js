import { Suspense } from "react";
import { connection } from "next/server";
import { getAllProducts } from "@/lib/products-db";
import { ProductsListView } from "@/components/admin/product/products-list-view";

export const metadata = {
  title: "Products Catalog | URC Admin",
};

export default function AdminProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-8 w-44 rounded-lg bg-[#E9EAE1] animate-pulse" />
              <div className="mt-2 h-3.5 w-64 rounded-md bg-[#F1F2EA] animate-pulse" />
            </div>
            <div className="size-10 rounded-xl bg-[#F1F2EA] animate-pulse" />
          </div>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-24 rounded-lg bg-[#F1F2EA] animate-pulse" />
            ))}
          </div>
          <div className="rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] p-4">
            <div className="space-y-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-12 w-full rounded-lg bg-[#F1F2EA] animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ProductsCatalog />
    </Suspense>
  );
}

async function ProductsCatalog() {
  await connection();
  const products = await getAllProducts();
  return <ProductsListView initialProducts={products} />;
}
