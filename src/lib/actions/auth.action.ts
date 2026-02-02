'use server';

import { JSON_HEADER } from "../constant/shared.constant";
import { CreatePasswordValues, EmailValues, RegisterValues, VerifyValues } from "../schemas/auth.schema";
import { CreatePasswordResponse, ForgotPasswordResponse, RegisterResponse, VerifyResponse } from "../types/auth";



export const registerAction = async (userData: RegisterValues): Promise<RegisterResponse> => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/auth/signup`,
    {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        ...JSON_HEADER,
      },
    }
  );

  // Payload
  const payload: ApiResponse<RegisterResponse> = await response.json();

  return payload;
};


export const verifyAction = async (resetCode: VerifyValues['resetCode']) => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/auth/verifyResetCode`,
    {
      method: "POST",
      body: JSON.stringify({ resetCode }),
      headers: {
        ...JSON_HEADER,
      },
    }
  );

  // Payload
  const payload: ApiResponse<VerifyResponse> = await response.json();

  return payload;
};



export const forgotPassword = async (email: EmailValues) => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/auth/forgotPassword`,
    {
      method: "POST",
      body: JSON.stringify(email),
      headers: {
        ...JSON_HEADER,
      },
    }
  );

  const payload: ForgotPasswordResponse = await response.json();

  return payload;

};


export const createPasswordAction = async (values: Pick<CreatePasswordValues, 'newPassword'> & { email: string }) => {
  const response = await fetch(
    `${process.env.API_BASE_URL}/auth/resetPassword`,
    {
      method: "PUT",
      body: JSON.stringify({
        newPassword: values.newPassword,
        email: values.email,
      }),
      headers: {
        ...JSON_HEADER,
      },
    }
  );

  const payload: ApiResponse<CreatePasswordResponse> = await response.json();

  return payload;
}