import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    if (pathname.startsWith("/dashboard") && !req.nextauth.token) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
