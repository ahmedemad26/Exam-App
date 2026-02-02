"use client";

import { changePassword } from "@/lib/api/change-password.api";
import { useMutation } from "@tanstack/react-query";

export const usePassword = () => {
    const mutation = useMutation({
        mutationFn: changePassword,
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            throw new Error(error.message);
        },
    });

    return { ...mutation };
};
