"use server";

import { cookies } from "next/headers";

export async function handleLogin(
  userId: string,
  accessToken: string,
  role: string
) {
  cookies().set("session_userId", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });

  cookies().set("session_access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });

  cookies().set("session_role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  });
}

export async function resetAuthCookies() {
  cookies().set("session_userId", "");
  cookies().set("session_access_token", "");
  cookies().set("session_role", "");
}

export async function getUserId() {
  const userId = cookies().get("session_userID")?.value;
  return userId ? userId : null;
}

export async function getUserRole() {
  const role = cookies().get("session_role")?.value;
  return role ? role : null;
}
