"use server";

import { cookies } from "next/headers";

export async function handleLogin(accessToken: string, role: string) {
  const cookieStore = await cookies(); // No need for `await`

  const sessionData = {
    accessToken,
    role,
  };

  cookieStore.set("session", JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 12, // 12 hours
    path: "/",
    sameSite: "strict",
  });

  // Redirect URL based on role
  switch (role) {
    case "1":
      return "/home/agents";
    case "2":
      return "/home/teams";
    case "5":
      return "/home/players";
    case "6":
      return "/home/competitions";
    case "9":
      return "/home/match-officials";
    default:
      return "/home";
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    return JSON.parse(sessionCookie);
  } catch (error) {
    console.error("Failed to parse session cookie:", error);
    return null;
  }
}

export async function resetAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { path: "/", maxAge: -1 });
}

export async function getToken() {
  const session = await getSession();
  return session?.accessToken || null;
}

export async function getUserRole() {
  const session = await getSession();
  return session?.role || null;
}
