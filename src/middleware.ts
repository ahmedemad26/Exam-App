import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Protected routes
const protectedRoutes = ["/account", "/diplomas", "/questions"];

// Auth routes
const authRoutes = ["/login", "/register", "/forgot-password"];

//Utility function for login redirection
const redirectToLogin = (req: NextRequest) => {
  const url = new URL("/login", req.nextUrl.origin);
  return NextResponse.redirect(url);
};

export default async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = req.nextUrl.pathname;

  //  If user enters "/" → redirect depending on authentication state
  if (path === "/") {
    if (!token) {
      return redirectToLogin(req);
    }
    const url = new URL("/diplomas", req.nextUrl.origin);
    return NextResponse.redirect(url);
  }

  // Allow access to auth routes (login/register) - users can always access these
  // This allows users to login even if they have an invalid/expired token
  if (authRoutes.includes(path)) {
    return NextResponse.next();
  }

  //  If user enters protectedRoutes without a token → redirect to login
  if (protectedRoutes.some((route) => path.startsWith(route)) && !token) {
    return redirectToLogin(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};