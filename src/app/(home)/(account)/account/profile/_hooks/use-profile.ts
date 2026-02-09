"use client";
import { editProfile } from "@/lib/api/edit-profile.api";
import { profileValues } from "@/lib/schemas/edit-profile.schema";
import type { UserResponse } from "@/lib/types/edit-profile";
import { useMutation } from "@tanstack/react-query";

export const useProfile = () => {
  const mutation = useMutation<UserResponse, Error, profileValues>({
    mutationFn: async (userData) => {
      const response = await editProfile(userData);

      if ("code" in response) {
        throw new Error(response.message || "Update failed");
      }

      return response as UserResponse;
    },
  });

  return { ...mutation };
};
