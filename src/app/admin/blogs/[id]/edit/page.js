import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { getBlogById } from "@/lib/blogs-db";
import { BlogEditorForm } from "@/components/admin/blogs/blog-editor-form";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Edit Article | URC Admin",
};

export default async function EditBlogPage({ params }) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1100px] py-16 text-center text-xs text-[#687080] animate-pulse">
          Loading article editor...
        </div>
      }
    >
      <EditBlogLoader id={id} />
    </Suspense>
  );
}

async function EditBlogLoader({ id }) {
  await connection();
  const blog = await getBlogById(id);

  if (!blog) {
    return (
      <div className="mx-auto max-w-[1100px] py-16 text-center space-y-3">
        <h2 className="text-lg font-bold text-[#111111]">Article Not Found</h2>
        <p className="text-xs text-[#687080]">
          The article you are trying to edit does not exist or may have been deleted.
        </p>
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#650510] hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Articles</span>
        </Link>
      </div>
    );
  }

  return <BlogEditorForm initialData={blog} isEdit={true} />;
}

