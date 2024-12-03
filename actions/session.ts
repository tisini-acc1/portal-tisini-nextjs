import "server-only";
import { SignJWT, jwtVerify } from "jose";

import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

// export async function decrypt(session: string | undefined) {
//   try {
//     const { payload } = await jwtVerify(session, encodedKey, {
//       algorithms: ["HS256"],
//     });
//     return payload;
//   } catch (error) {
//     console.log("Failed to verify session");
//   }
// }

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

export async function getToken() {
  const cookieStore = await cookies();

  const token = cookieStore.get("session_access_token")?.value;
  return token ? token : null;
}
