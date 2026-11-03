import { uploadToCloudinary } from "@/lib/cloudinary";
import { slugify } from "@/lib/utils";
import { blogsStore, setBlogsStore } from "../store.js";

export async function createBlogService(payload) {
  const {
    title,
    excerpt,
    content,
    tags,
    author,
    readTime,
    imageFileUri,
    published,
  } = payload;

  let finalImageUrl = "/images/placeholder-product.jpg";
  if (imageFileUri) {
    if (imageFileUri.startsWith("data:image/")) {
      const uploadResult = await uploadToCloudinary(imageFileUri, "urc-v2/blogs");
      if (uploadResult.success) {
        finalImageUrl = uploadResult.secureUrl;
      }
    } else {
      finalImageUrl = imageFileUri;
    }
  }

  const newBlog = {
    id: `blog-${Date.now()}`,
    slug: slugify(title),
    title: title.trim(),
    excerpt: excerpt?.trim() || "",
    content: content.trim(),
    tags: tags?.trim() || "",
    author: author?.trim() || "URC Engineering Team",
    readTime: readTime?.trim() || "4 min read",
    imageUrl: finalImageUrl,
    published: published !== false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  setBlogsStore([newBlog, ...blogsStore]);
  return newBlog;
}

