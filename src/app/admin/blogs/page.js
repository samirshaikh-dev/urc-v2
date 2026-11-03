import { Suspense } from "react";
import { connection } from "next/server";
import { getAllBlogs } from "@/services/blogs/admin/get-blog";
import { BlogsListView } from "@/components/admin/blogs/blogs-list-view";

export const metadata = {
  title: "Blogs & Articles | URC Admin",
};

export default function AdminBlogsPage() {
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
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-24 rounded-lg bg-[#F1F2EA] animate-pulse" />
            ))}
          </div>
          <div className="rounded-xl border border-[#D9DCD1] bg-[#F7F8F2] p-4">
            <div className="space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-12 w-full rounded-lg bg-[#F1F2EA] animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <BlogsCatalogLoader />
    </Suspense>
  );
}

async function BlogsCatalogLoader() {
  await connection();
  const blogs = await getAllBlogs();
  return <BlogsListView initialBlogs={blogs} />;
}

