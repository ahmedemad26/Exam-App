import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthResponse } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const response = await fetch(
          "https://exam.elevateegy.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const payload: ApiResponse<AuthResponse> = await response.json();

        if ("code" in payload) {
          throw new Error(payload.message);
        }

        return {
          id: payload.user._id,
          accessToken: payload.token, // ✅ موجود
          ...payload.user,
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token = { ...user }; // ✅ الـ accessToken هيتحفظ هنا
      }
      return token;
    },

    session: ({ session, token }) => {
      // ✅ أضف الـ accessToken للـ session
      session.accessToken = token.accessToken; // ← ⚠️ هنا الإضافة المهمة!
      
      session._id = token._id;
      session.email = token.email || "";
      session.username = token.username;
      session.phone = token.phone;
      session.firstName = token.firstName;
      session.lastName = token.lastName;
      session.role = token.role;
      return session;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET,
};