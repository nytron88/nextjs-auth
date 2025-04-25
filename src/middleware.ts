import { NextRequest, NextResponse } from "next/server";
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicRoute =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/";

  const token =
    request.cookies.get("token")?.value ||
    request.headers.get("authorization")?.split(" ")[1];

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
};
