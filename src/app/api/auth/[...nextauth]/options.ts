import { jwtDecode } from "jwt-decode";
import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT, DecodedJWT, RefreshedToken } from "next-auth/jwt";

async function refreshAccessToken(token: JWT): Promise<JWT | null> {
  try {
    const res = await fetch(
      `${process.env.DJANGO_BASE_URL}/auth/refresh_token/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: token.refresh_token }),
      }
    );
    console.log("called");
    const refreshedToken: RefreshedToken = await res.json();

    if (res.status !== 200) throw refreshedToken;

    const { exp }: DecodedJWT = jwtDecode(refreshedToken.access_token);

    return { ...token, ...refreshedToken, exp };
  } catch (error) {
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

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
        const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL + "/auth/login/";

        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username_or_email: credentials?.username_or_email,
              password: credentials?.password,
            }),
          });

          const token = await res.json();
          // console.log("user:", user);

          if (res.status !== 200) throw token;

          const { exp, user_id }: DecodedJWT = jwtDecode(token.access_token);

          return {
            ...token,
            exp,
            user: { user_id, user_role: token.user_role },
          } as User;
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
    async jwt({ token, user, account }) {
      // initial signin
      if (user && account) {
        return user as JWT;
      }

      // Return previous token if the access token has not expired
      if (Date.now() < token.exp * 1000) {
        return token;
      }

      // refresh token
      return (await refreshAccessToken(token)) as JWT;
    },
    async session({ session, token }) {
      session.access_token = token.access_token;
      session.exp = token.exp;
      session.refresh_token = token.refresh_token;
      session.user = {
        user_role: token.user_role,
      } as User;

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
};

// const refreshAccessToken = async (token: JWT) => {
//   const url = process.env.DJANGO_BASE_URL + "/auth/refresh_token/";
//   console.log(token);
//   try {
//     const res = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ refresh_token: token?.refresh_token }),
//     });

//     if (res.ok) {
//       const data = await res.json();
//       const { access_token, refresh_token } = data;
//       const { exp } = jwtDecode(access_token);

//       return {
//         ...token,
//         error: null,
//         access_token,
//         refresh_token,
//         exp,
//       };
//     } else {
//       console.error(
//         "Failed to refresh access token:",
//         res.status,
//         res.statusText
//       );
//       return { error: "Refresh AccessToken Error" };
//     }
//   } catch (error) {
//     console.error("Error during token refresh:", error);
//     return { error: "Refresh AccessToken Error" };
//   }
// };

// export const authOptions: AuthOptions = {
//   session: { strategy: "jwt" },

//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         username_or_email: {},
//         password: {},
//       },
//       async authorize(credentials, req) {
//         const url = process.env.DJANGO_BASE_URL + "/auth/login/";

//         const res = await fetch(url, {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             username_or_email: credentials?.username_or_email,
//             password: credentials?.password,
//           }),
//         });

//         const user = await res.json();
//         // console.log("user:", user);

//         if (res.ok && user) {
//           return user;
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       console.log("token in jwt:", token);
//       console.log("user in jwt:", user);
//       const { exp } = token as any;

//       if (Date.now() < exp * 1000) {
//         return { ...token, ...user };
//       }

//       // return { ...token, ...user };
//       return await refreshAccessToken(token);
//     },
//     async session({ token, session, user }) {
//       session.user = token as any;
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/auth/login",
//     newUser: "/auth/register",
//   },
// };
