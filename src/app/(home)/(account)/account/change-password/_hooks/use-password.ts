"use client";


import { useMutation } from "@tanstack/react-query";
import { changePasswordValues } from "@/lib/schemas/change-password.schema";
import { changePassword } from "@/lib/api/change-password.api";

    export const usePassword = () => {
    const mutation = useMutation({
        mutationFn: async (userData: changePasswordValues) => {
            const response = await changePassword(userData);

            // Error
            if ("code" in response) {
                throw new Error(response.message);
            }
            return response;
        },
    });

    return { ...mutation };
}
