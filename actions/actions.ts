"use server";

import { cookies } from "next/headers";

export async function handleLogin(
  userId: string,
  accessToken: string,
  role: string
) {
  const cookieStore = await cookies();

  cookieStore.set("session_userId", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });

  cookieStore.set("session_access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });

  cookieStore.set("session_role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
}

export async function resetAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.set("session_userId", "");
  cookieStore.set("session_access_token", "");
  cookieStore.set("session_role", "");
}

export async function getUserId() {
  const cookieStore = await cookies();

  const userId = cookieStore.get("session_userID")?.value;
  return userId ? userId : null;
}

export async function getUserRole() {
  const cookieStore = await cookies();

  const role = cookieStore.get("session_role")?.value;
  return role ? role : null;
}
