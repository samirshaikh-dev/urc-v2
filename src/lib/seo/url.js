import { SITE_CONFIG } from "@/lib/constants";

const FALLBACK_SITE_URL = "http://localhost:3000";

/**
 * Return the configured site origin without a trailing slash.
 * Falls back to localhost so metadata generation never crashes before
 * SITE_CONFIG.url is available.
 */
export function getSiteUrl() {
  try {
    const url = new URL(SITE_CONFIG?.url);
    if (!/^https?:$/.test(url.protocol)) {
      return FALLBACK_SITE_URL;
    }
    return url.toString().replace(/\/+$/, "");
  } catch {
    return FALLBACK_SITE_URL;
  }
}

/**
 * Normalize an internal path without a trailing slash or query string.
 */
export function normalizeSeoPath(path) {
  if (typeof path !== "string") return "/";

  const [pathname] = path.split(/[?#]/);
  const trimmed = pathname.trim().replace(/^\/+|\/+$/g, "");
  if (!trimmed) return "/";

  return `/${trimmed.replace(/\/{2,}/g, "/")}`;
}

/**
 * Build an absolute URL from an internal path.
 */
export function buildAbsoluteUrl(path, baseUrl = getSiteUrl()) {
  const normalizedPath = normalizeSeoPath(path);
  const normalizedBase = String(baseUrl || getSiteUrl()).replace(/\/+$/, "");

  if (normalizedPath === "/") {
    return normalizedBase;
  }

  return `${normalizedBase}${normalizedPath}`;
}

/**
 * Sanitize text used in metadata and structured data. Only strips markup and
 * normalizes whitespace; it never rewrites factual content.
 */
export function sanitizeSeoText(value) {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Shorten text on a word boundary without changing its meaning.
 */
export function truncateSeoText(value, maxLength = 160) {
  const text = sanitizeSeoText(value);
  if (!text || text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(" ");
  const shortened = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  return `${shortened.trimEnd()}…`;
}

/**
 * Resolve a metadata image URL. Remote URLs are preserved; relative URLs are
 * resolved against the configured site URL. Invalid values fall back safely.
 */
export function resolveSeoUrl(value, fallbackPath = "/og-image.png") {
  const raw = sanitizeSeoText(value);
  const siteUrl = getSiteUrl();

  if (raw) {
    try {
      const resolved = new URL(raw, siteUrl);
      if (/^https?:$/.test(resolved.protocol)) {
        return resolved.toString();
      }
    } catch {
      // Fall through to the safe default below.
    }
  }

  return buildAbsoluteUrl(fallbackPath, siteUrl);
}
