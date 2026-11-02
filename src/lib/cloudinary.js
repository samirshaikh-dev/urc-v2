import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary is optional. When credentials are absent the rest of the site
 * keeps working with local/static product imagery.
 */
export function isCloudinaryConfigured() {
  return Boolean(
    process.env.CLOUDINARY_URL?.trim() ||
      (process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
        process.env.CLOUDINARY_API_KEY?.trim() &&
        process.env.CLOUDINARY_API_SECRET?.trim())
  );
}

if (isCloudinaryConfigured()) {
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
}

/**
 * Upload a data URI or image buffer to Cloudinary
 */
export async function uploadToCloudinary(fileUri, folder = "urc-products") {
  if (!isCloudinaryConfigured()) {
    return {
      success: false,
      error:
        "Cloudinary is not configured. Add CLOUDINARY_URL or Cloudinary API credentials to enable image uploads.",
    };
  }

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
      secureUrl: result.secure_url,
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

  if (!isCloudinaryConfigured()) {
    return {
      success: false,
      error: "Cloudinary is not configured.",
    };
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { success: result.result === "ok" };
  } catch (error) {
    console.error("Cloudinary delete failed:", error);
    return { success: false, error: error.message };
  }
}

export default cloudinary;
