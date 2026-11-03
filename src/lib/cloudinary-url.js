/**
 * Cloudinary delivery-URL helpers.
 *
 * These are pure string utilities with no Cloudinary SDK, Node.js APIs, or
 * credentials involved, which keeps them safe to import from both Server and
 * Client Components. Upload/delete work stays in `src/lib/cloudinary.js`.
 *
 * Uploads store the plain `secure_url`, so each render site decides how large
 * the delivered image should be instead of baking one width into the database.
 */

// Matches a Cloudinary transformation segment such as "f_auto,q_auto,w_640".
// Kept to the tokens this app generates so folder names are never mistaken for
// a transformation.
const TRANSFORM_TOKEN = /(?:^|,)(?:f_auto|q_auto|q_\d+|w_\d+)(?:,|$)/;

/**
 * Appends Cloudinary delivery transformations to an uploaded image URL.
 * Converts: https://res.cloudinary.com/.../image.jpg
 * To:      https://res.cloudinary.com/.../f_auto,q_auto,w_<width>/image.jpg
 *
 * Safe for both Client Components and Server Components (zero Node.js
 * dependencies). Only transforms Cloudinary URLs; other URLs (including
 * `data:` previews) are returned unchanged.
 *
 * @param {string} url Cloudinary (or any) image URL.
 * @param {{ width?: number, quality?: number }} [options] Optional delivery
 *   width in pixels and numeric quality; defaults to Cloudinary's `q_auto`.
 * @returns {string} The transformed URL, or the input when it does not need
 *   transforming.
 */
export function optimizeCloudinaryUrl(url, options = {}) {
  if (!url || typeof url !== "string" || !url.includes("cloudinary.com")) {
    return url;
  }

  const uploadPath = "/image/upload/";
  if (!url.includes(uploadPath)) {
    return url;
  }

  const [base, query = ""] = url.split("?");

  // Drop legacy delivery params from the query string while preserving every
  // other param exactly as Cloudinary returned it.
  const cleanedQuery = query
    .split("&")
    .filter(Boolean)
    .filter((param) => {
      const key = param.split("=")[0];
      return key !== "f_auto" && key !== "q_auto" && key !== "w";
    })
    .join("&");

  const [prefix, rest] = base.split(uploadPath);
  const segments = rest.split("/");

  // A transformation lives between /image/upload/ and the version/folder path.
  // Remove ours (in whatever order the upload stored it) so the URL never ends
  // up with two transformation segments.
  if (segments[0] && TRANSFORM_TOKEN.test(segments[0])) {
    segments.shift();
  }

  const transforms = ["f_auto", options.quality ? `q_${options.quality}` : "q_auto"];
  if (options.width) {
    transforms.push(`w_${options.width}`);
  }

  const optimized = `${prefix}${uploadPath}${transforms.join(",")}/${segments.join("/")}`;
  return cleanedQuery ? `${optimized}?${cleanedQuery}` : optimized;
}
