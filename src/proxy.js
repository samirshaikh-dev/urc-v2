import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "urc_admin_session";
const SECRET = new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET);

/**
 * Legacy product URLs are redirected here so crawlers receive an exact 301.
 * Next.js route-level `permanentRedirect` uses 308, which is valid but does not
 * match the requested 301 behavior for changed URLs.
 */
const LEGACY_PRODUCT_CATEGORIES = new Map([
  ["plain-cork-sheets", "cork-products"],
  ["industrial-cork-granules", "cork-products"],
  ["cork-expansion-joints", "cork-products"],
  ["rubber-cork-sheets", "rubberised-cork"],
  ["rubber-cork-rolls", "rubberised-cork"],
  ["transformer-cork-gaskets", "rubberised-cork"],
  ["acoustic-cork-wall-tiles", "decorative-cork"],
  ["decorative-cork-tiles", "decorative-cork"],
  ["decorative-cork-panels", "decorative-cork"],
  ["bulletin-board-cork", "decorative-cork"],
  ["cork-desk-accessories", "cork-gifts"],
  ["cork-lifestyle-gifts", "cork-gifts"],
  ["custom-promotional-cork", "cork-gifts"],
]);

function permanentRedirect(url) {
  return new NextResponse(null, {
    status: 301,
    headers: { Location: url.toString() },
  });
}

function getLegacyRedirect(request) {
  const { pathname } = request.nextUrl;
  const segments = pathname.replace(/\/+$/, "").split("/").filter(Boolean);

  let legacySlug = null;

  if (segments[0] === "product" && segments.length >= 2) {
    legacySlug = segments[1];
  } else if (
    segments[0] === "products" &&
    segments[1]?.toLowerCase() === "all" &&
    segments.length >= 3
  ) {
    legacySlug = segments[2];
  }

  if (!legacySlug) {
    return null;
  }

  let normalizedSlug;
  try {
    normalizedSlug = decodeURIComponent(legacySlug).toLowerCase();
  } catch {
    return null;
  }

  const categorySlug = LEGACY_PRODUCT_CATEGORIES.get(normalizedSlug);
  if (!categorySlug) {
    return null;
  }

  const destination = request.nextUrl.clone();
  destination.pathname = `/products/${categorySlug}/${normalizedSlug}`;
  return destination;
}

export async function proxy(request) {
  const legacyDestination = getLegacyRedirect(request);
  if (legacyDestination) {
    return permanentRedirect(legacyDestination);
  }

  const { pathname } = request.nextUrl;

  // Only run admin checks on /admin routes.
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      await jwtVerify(token, SECRET);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  // If the user is accessing /admin/login while already logged in.
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/products", request.url));
    }
    return NextResponse.next();
  }

  // For any other /admin route, require authentication.
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect root /admin to /admin/products.
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/product/:path*", "/products/all/:path*"],
};
