import { NextRequest, NextResponse } from "next/server";

const unprotectedRoutes = ["/login"];
export function middleware(req: NextRequest) {
  const isAuthenticated = req.cookies.has("auth");

  if (!unprotectedRoutes.includes(req.nextUrl.pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (unprotectedRoutes.includes(req.nextUrl.pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/products", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|opengraph-image.png|twitter-image.png|images).*)",
  ],
};
