"use server";

import { deleteAccountResponse } from "../types/delete-account";
import { getToken } from "../utils/get-token";

export const deleteAccount = async (): Promise<deleteAccountResponse> => {
  try {
    const token = await getToken();
    if (!token?.accessToken) {
      throw new Error("No access token found");
    }
    const response = await fetch(
      `${process.env.API_BASE_URL}/auth/deleteMe`,
      {
        method: "DELETE",
        headers: {
          token: token.accessToken,
        },
      }
    );
    const payload: deleteAccountResponse = await response.json();
    if (!response.ok || payload.code) {
      throw payload.message || "Something Went Wrong";
    }
    return payload;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
