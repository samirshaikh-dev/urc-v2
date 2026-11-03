import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getProductById } from "@/services/products/admin/get-product";
import { ProductEditorForm } from "@/components/admin/product/product-editor-form";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Edit Product | URC Admin",
};

export default function EditProductPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1100px] py-16 text-center text-xs text-[#687080] animate-pulse">
          Loading product editor...
        </div>
      }
    >
      <EditProductLoader params={params} />
    </Suspense>
  );
}

async function EditProductLoader({ params }) {
  const { id } = await params;
  await connection();
  let product = null;

  try {
    product = await getProductById(id);
  } catch (err) {
    return (
      <div className="mx-auto max-w-[1100px] py-16 text-center space-y-3">
        <h2 className="text-lg font-bold text-[#111111]">Database Unavailable</h2>
        <p className="text-xs text-[#687080]">
          {err?.message || "Unable to reach database. Please try again in a few moments."}
        </p>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#650510] hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Products Catalog</span>
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-[1100px] py-16 text-center space-y-3">
        <h2 className="text-lg font-bold text-[#111111]">Product Not Found</h2>
        <p className="text-xs text-[#687080]">
          The product you are trying to edit does not exist or may have been removed.
        </p>
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#650510] hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Products Catalog</span>
        </Link>
      </div>
    );
  }

  return <ProductEditorForm initialData={product} isEdit={true} />;
}
