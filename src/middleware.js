import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "urc_admin_session";
const SECRET = new TextEncoder().encode( process.env.ADMIN_SESSION_SECRET );

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Only run on /admin routes
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

  // If user is accessing /admin/login while already logged in
  if (pathname === "/admin/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/products", request.url));
    }
    return NextResponse.next();
  }

  // For any other /admin route, require authentication
  if (!isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect root /admin to /admin/products
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/products", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

