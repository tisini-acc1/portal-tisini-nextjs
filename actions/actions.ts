"use server";

import { cookies } from "next/headers";
import { getTeamOverview } from "./django-actions";
import { redirect } from "next/navigation";
import { getUserTeams } from "@/data/teams/user-teams";

export async function handleLogin(
  accessToken: string,
  role: string,
  userId: string
) {
  const cookieStore = await cookies(); // No need for `await`

  const sessionData = {
    accessToken,
    role,
    userId,
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
      return "/home/tisini-agent";
    case "2":
      return "/teams";
    case "5":
      return "/home/team-player";
    case "6":
      return "/home/competitions";
    case "9":
      return "/home/match-officials";
    case "7":
      return "/home/super-agent";
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

export async function getUserId() {
  const session = await getSession();
  return session?.userId || null;
}
