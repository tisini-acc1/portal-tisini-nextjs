import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  const response = await fetch(
    `${process.env.DJANGO_BASE_URL}/auth/refresh_token/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: `${token.refresh_token}` }),
    }
  );
  // console.log("token refreshed");

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  const res = await response.json();

  const { exp: expiresIn } = jwtDecode(res.access_token);

  return {
    ...token,
    ...res,
    expiresIn,
  } as JWT;
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username_or_email: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials?.username_or_email || !credentials?.password) {
          return null;
        }

        const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL + "/auth/login/";

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username_or_email: credentials?.username_or_email,
            password: credentials?.password,
          }),
        });

        const user = await res.json();

        if (res.ok && user) {
          // add expiry time
          const { exp: expiresIn } = jwtDecode(user.access_token);
          // console.log(exp);
          return { ...user, expiresIn };
          // return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // console.log({ token, user });

      if (user) {
        return { ...token, ...user };
      }

      if (
        token.expiresIn &&
        new Date().getTime() < parseInt(token.expiresIn) * 1000
      ) {
        return token;
      }

      return await refreshToken(token);
    },

    async session({ token, session }) {
      if (token) {
        // Assign user data from the token to the session
        session.user = {
          username: token.username as string,
          userRole: token.user_role as string,
        };

        session.accessToken = token.access_token as string;
        session.refreshToken = token.refresh_token as string;
        session.expiresIn = token.expiresIn;
      }

      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },
};

// import { jwtDecode } from "jwt-decode";
// import { AuthOptions, User } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import type { JWT, DecodedJWT, RefreshedToken } from "next-auth/jwt";

// async function refreshAccessToken(token: JWT): Promise<JWT | null> {
//   try {
//     const res = await fetch(
//       `${process.env.DJANGO_BASE_URL}/auth/refresh_token/`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ refresh_token: token.refresh_token }),
//       }
//     );
//     console.log("called");
//     const refreshedToken: RefreshedToken = await res.json();

//     if (res.status !== 200) throw refreshedToken;

//     const { exp }: DecodedJWT = jwtDecode(refreshedToken.access_token);

//     return { ...token, ...refreshedToken, exp };
//   } catch (error) {
//     return { ...token, error: "RefreshAccessTokenError" };
//   }
// }

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
//         const url = process.env.NEXT_PUBLIC_DJANGO_BASE_URL + "/auth/login/";

//         try {
//           const res = await fetch(url, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               username_or_email: credentials?.username_or_email,
//               password: credentials?.password,
//             }),
//           });

//           const token = await res.json();
//           // console.log("user:", user);

//           if (res.status !== 200) throw token;

//           const { exp, user_id }: DecodedJWT = jwtDecode(token.access_token);

//           return {
//             ...token,
//             exp,
//             user: { user_id, user_role: token.user_role },
//           } as User;
//         } catch (error) {
//           return null;
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async redirect({ url, baseUrl }) {
//       return url.startsWith(baseUrl)
//         ? Promise.resolve(url)
//         : Promise.resolve(baseUrl);
//     },
//     async jwt({ token, user, account }) {
//       // initial signin
//       if (user && account) {
//         return user as JWT;
//       }

//       // Return previous token if the access token has not expired
//       if (Date.now() < token.exp * 1000) {
//         return token;
//       }

//       // refresh token
//       return (await refreshAccessToken(token)) as JWT;
//     },
//     async session({ session, token }) {
//       session.access_token = token.access_token;
//       session.exp = token.exp;
//       session.refresh_token = token.refresh_token;
//       session.user = {
//         user_role: token.user_role,
//       } as User;

//       return session;
//     },
//   },

//   pages: {
//     signIn: "/auth/login",
//     newUser: "/auth/register",
//   },
// };
