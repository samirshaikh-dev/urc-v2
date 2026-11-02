import { Suspense } from "react";
import { CreateProductForm } from "@/components/admin/create-product-form";

export const metadata = {
  title: "Create Product | URC Admin",
};

export default function NewProductPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-4xl py-12 text-center text-sm text-[#687080] animate-pulse">
          Loading product editor...
        </div>
      }
    >
      <CreateProductForm />
    </Suspense>
  );
}

