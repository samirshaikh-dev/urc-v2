import { Suspense } from "react";
import { BlogEditorForm } from "@/components/admin/blogs/blog-editor-form";

export const metadata = {
  title: "Create Article | URC Admin",
};

export default function NewBlogPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1100px] py-16 text-center text-xs text-[#687080] animate-pulse">
          Loading article editor...
        </div>
      }
    >
      <BlogEditorForm isEdit={false} />
    </Suspense>
  );
}

