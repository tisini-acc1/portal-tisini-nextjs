import { User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      user_role: string;
      refresh_token: string;
      access_token: string;
      iat: number;
      exp: number;
      jti: string;
    };
  }
}
