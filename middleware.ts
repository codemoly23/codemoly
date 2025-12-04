import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  // Protected admin routes (except login page)
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";

  // If trying to access admin routes without being logged in
  if (isAdminRoute && !isLoggedIn && !isLoginPage) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in and trying to access login page, redirect to admin dashboard
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
