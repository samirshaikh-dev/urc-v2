/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  experimental: {
    serverActions: {
      // Admin image uploads are sent to Server Actions as base64 data URIs
      // (see product-editor-form / blog-editor-form, which accept files up to
      // 8MB). Base64 adds ~33%, so an 8MB image is ~10.7MB on the wire; give
      // room for multipart/JSON envelope overhead on top of that.
      bodySizeLimit: "12mb",
    },
  },
  images: {
    // Admin uploads are stored on Cloudinary and rendered with next/image.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
