"use server";
import { JSON_HEADER } from "../constant/shared.constant";
import { profileValues } from "../schemas/edit-profile.schema";
import { UserResponse } from "../types/edit-profile";
import { getToken } from "../utils/get-token";

export const editProfile = async (
  userData: profileValues
): Promise<UserResponse> => {
  try {
    const token = await getToken();
    if (!token?.accessToken) {
      throw new Error("No access token found");
    }
    const response = await fetch(
      `${process.env.API_BASE_URL}/auth/editProfile`,
      {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          ...JSON_HEADER,
          token: token.accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`failed: ${response.statusText}`);
    }

    const payload: UserResponse = await response.json();

    return payload;
  } catch (error) {
    throw new Error(`failed to fetch profile data: ${error}`);
  }
};
