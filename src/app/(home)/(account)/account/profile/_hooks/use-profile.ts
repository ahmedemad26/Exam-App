"use client";
import { editProfile } from "@/lib/api/edit-profile.api";
import { useMutation } from "@tanstack/react-query";

export const useProfile = () => {
    const mutation = useMutation({
        mutationFn: editProfile,
        onSuccess: (data) => {
            return data;
        },
        onError: (error) => {
            throw new Error(error.message);
        },
    });

    return { ...mutation, profileData: mutation.data };
};
