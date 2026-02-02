"use client";
import { deleteAccount } from "@/lib/api/delete-account.api";
import { useMutation } from "@tanstack/react-query";

export const useDelete = () => {
  const mutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return mutation;
};
