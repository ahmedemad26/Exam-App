"use client";
import { editProfile } from "@/lib/api/edit-profile.api";
import { profileValues } from "@/lib/schemas/edit-profile.schema";
import { useMutation } from "@tanstack/react-query";

export const useProfile = () => {
    const mutation = useMutation({
        mutationFn: async (userData: profileValues) => {
            const response = await editProfile(userData);

            // Error
            if ("code" in response) {
                throw new Error(response.message);
            }
            return response;
        },
    });

    return { ...mutation };
};
