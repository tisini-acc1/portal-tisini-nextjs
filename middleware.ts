import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Define the routes that are protected and public
// const protectedRoutes = ["/home"];
const publicRoutes = ["/auth/login", "/auth/register", "/"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Determine if the current path is protected or public
  const isProtectedRoute = /^\/home/.test(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Get the session cookie (access token) and user role
  const sessionCookie = req.cookies.get("session")?.value || "";

  // 1. Redirect to /auth/login if the user is not authenticated and tries to access a protected route
  if (isProtectedRoute && !sessionCookie) {
    console.log("User is not authenticated, redirecting to /auth/login");
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  let session;
  if (sessionCookie) {
    try {
      session = JSON.parse(sessionCookie);
    } catch (error) {
      console.error("Error parsing session cookie:", error);
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }
  }

  const userRole = session?.role;

  // 2. Redirect to /home if the user is authenticated and tries to access a public route like login/register
  if (isPublicRoute && sessionCookie && userRole) {
    console.log("User is authenticated, redirecting based on role...");
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
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
