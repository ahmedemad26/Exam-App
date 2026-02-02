"use client";
import { submitAnswer } from "@/lib/api/exam/answer.api";
import { useMutation } from "@tanstack/react-query";

export const useResult = () => {
  const {
    isError,
    isSuccess,
    isPending,
    data: resultData,
    mutate,
    reset,
  } = useMutation({
    mutationFn: submitAnswer,
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return {
    isError,
    isPending,
    isSuccess,
    resultData,
    mutate,
    reset,
  };
};
