"use server";

import { cookies } from "next/headers";
import { changePasswordValues } from "../schemas/change-password.schema";
import { changePasswordResponse } from "../types/change-password";
import { getToken } from "../utils/get-token";
import { JSON_HEADER } from "../constant/shared.constant";

export const changePassword = async (
  userData: changePasswordValues
): Promise<changePasswordResponse> => {
  try {
    const token = await getToken();
    if (!token?.accessToken) {
      throw new Error("No access token found");
    }

    const response = await fetch(
      `${process.env.API_BASE_URL}/auth/changePassword`,
      {
        method: "PATCH",
        body: JSON.stringify(userData),
        headers: {
          ...JSON_HEADER,
          token: token.accessToken,
        },
      }
    );

    const payload: changePasswordResponse = await response.json();

    // Clear old tokens before setting new session
    (await cookies()).delete("accessToken");
    (await cookies()).delete("next-auth.session-token");
    (await cookies()).delete("__Secure-next-auth.session-token");

  

    (await cookies()).set("__Secure-next-auth.session-token", payload.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      path: "/", // ensure access to the cookie in all pages/routes
    });

    return payload;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
