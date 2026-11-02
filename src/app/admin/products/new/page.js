import { Suspense } from "react";
import { ProductEditorForm } from "@/components/admin/product-editor-form";

export const metadata = {
  title: "Create Product | URC Admin",
};

export default function NewProductPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1100px] py-16 text-center text-xs text-[#687080] animate-pulse">
          Loading product editor...
        </div>
      }
    >
      <ProductEditorForm isEdit={false} />
    </Suspense>
  );
}
