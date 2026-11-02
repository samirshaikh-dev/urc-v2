import { v2 as cloudinary } from "cloudinary";

if (process.env.CLOUDINARY_URL) {
  // Automatically parses cloudinary://<api_key>:<api_secret>@<cloud_name>
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL,
    secure: true,
  });
} else {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

/**
 * Upload a data URI or image buffer to Cloudinary
 */
export async function uploadToCloudinary(fileUri, folder = "urc-products") {
  try {
    const result = await cloudinary.uploader.upload(fileUri, {
      folder,
      resource_type: "image",
      transformation: [
        { quality: "auto", fetch_format: "auto" }
      ],
    });
    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return {
      success: false,
      error: error.message || "Failed to upload image to Cloudinary",
    };
  }
}

/**
 * Delete an asset from Cloudinary by public ID
 */
export async function deleteFromCloudinary(publicId) {
  if (!publicId) return { success: true };
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: result.result === "ok" };
  } catch (error) {
    console.error("Cloudinary delete failed:", error);
    return { success: false, error: error.message };
  }
}

export default cloudinary;

