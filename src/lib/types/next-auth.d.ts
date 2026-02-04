import { User } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    accessToken: string;
  }
  
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  interface Session extends User {
    // Include accessToken for authenticated API calls
  }
}

declare module "next-auth/jwt" {
  /* eslint-disable @typescript-eslint/no-empty-object-type */
  interface JWT extends User {
  }
}
