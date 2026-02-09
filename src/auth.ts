import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthResponse } from "./lib/types/auth";
import { JSON_HEADER } from "./lib/constant/shared.constant";

export const authOptions: NextAuthOptions = {
  pages: {
    //Auth pages
    signIn: "/login",
  },

  providers: [
    //credentials
    Credentials({
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },

      //authorize function
      authorize: async (credentails) => {
        const response = await fetch(
          `${process.env.API_BASE_URL}/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentails?.email,
              password: credentails?.password,
            }),
            headers: {
              ...JSON_HEADER,
            },
          }
        );

        const payload: ApiResponse<AuthResponse> = await response.json();
        //handle the error message from backend
        if ("code" in payload) {
          throw new Error(payload.message);
        }

        // id must be returned in authorize()
        return {
          id: payload.user._id,
          accessToken: payload.token,
          ...payload.user,
        };
      },
    }),
  ],

  //callbacks functions
  callbacks: {
    //jwt function
    jwt: ({ token, user }) => {
      //NOTE user => token
      if (user) {
        token = { ...user };
      }
      return token;
    },

    //session function
    //NOTE token => session
    session: ({ session, token }) => {
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