"use client";
import { deleteAccount } from "@/lib/api/delete-account.api";
import { useMutation } from "@tanstack/react-query";
  

export const useDelete = () => {
    const mutation = useMutation({
        mutationFn: async () => {
            const response = await deleteAccount();

            // Error
            if ("code" in response) {
                throw new Error(response.message);
            }
            return response;
        },
    });

    return { ...mutation };
}