"use server";

import { cookies } from "next/headers";

export async function handleLogin(
  userId: string,
  accessToken: string,
  role: string
) {
  const cookieStore = await cookies(); // No need for `await`

  cookieStore.set("session_userId", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  cookieStore.set("session_access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  });

  cookieStore.set("session_role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
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

export async function resetAuthCookies() {
  const cookieStore = await cookies(); // No need for `await`

  cookieStore.set("session_userId", "", { path: "/", maxAge: -1 });
  cookieStore.set("session_access_token", "", { path: "/", maxAge: -1 });
  cookieStore.set("session_role", "", { path: "/", maxAge: -1 });
}

export async function getUserId() {
  const cookieStore = await cookies();
  return cookieStore.get("session_userId")?.value || null; // Fixed key name
}

export async function getUserRole() {
  const cookieStore = await cookies();
  return cookieStore.get("session_role")?.value || null;
}

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get("session_access_token")?.value || null;
}
