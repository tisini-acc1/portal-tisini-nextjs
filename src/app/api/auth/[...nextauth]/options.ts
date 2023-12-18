import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username_or_email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const res = await fetch("https://backend.tisini.co.ke/auth/login/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username_or_email: credentials?.username_or_email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();
        // console.log("user:", user);

        if (res.ok && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // console.log("token in jwt:", token);
      // console.log("user in jwt:", user);
      return { ...token, ...user };
    },
    async session({ token, session, user }) {
      session.user = token as any;
      return session;
    },
  },
};
