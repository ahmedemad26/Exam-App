import { FORGOT_PASSWORD_STEPS } from "../constant/auth.constant";

export type AuthResponse = {
  token: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: "user" | "admin" | string;
    isVerified: boolean;
    createdAt: string;
  };
}

export interface RegisterResponse {
  message: string;
  code?: number;
  token?: string;
  user?: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: "user" | "admin" | string;
    isVerified: boolean;
    createdAt: string;
  };
}
// Destructure the FORGOT_PASSWORD_STEPS KEY
export type ForgotPasswordSteps = (typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];

// Verify Response
export type VerifyResponse = {
  info: string;
}

// Forgot Password Response
export type ForgotPasswordResponse = {
  message: string;
}

// Create Password Response
export type CreatePasswordResponse = {
  token: string;
  
}