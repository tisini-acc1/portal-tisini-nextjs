import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Define the routes that are protected and public
const protectedRoutes = ["/home"];
const publicRoutes = ["/auth/login", "/auth/register", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Determine if the current path is protected or public
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Get the session cookie (access token)
  const cookie = (await cookies()).get("session_access_token")?.value;
  const userRole = (await cookies()).get("session_role")?.value;

  // 1. Redirect to /auth/login if the user is not authenticated and tries to access a protected route
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  // 2. Redirect to /home if the user is authenticated and tries to access a public route like login/register
  if (isPublicRoute && cookie && userRole) {
    if (userRole === "1") {
      return NextResponse.redirect(new URL("/home/agents", req.nextUrl));
    } else if (userRole === "2") {
      return NextResponse.redirect(new URL("/home/teams", req.nextUrl));
    } else if (userRole === "5") {
      return NextResponse.redirect(new URL("/home/players", req.nextUrl));
    } else if (userRole === "6") {
      return NextResponse.redirect(new URL("/home/competitions", req.nextUrl));
    }
  }

  // 3. Allow the request to continue if the conditions above are not met
  return NextResponse.next();
}

// Define the routes middleware should not run on (e.g., API routes, static files, images)
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
