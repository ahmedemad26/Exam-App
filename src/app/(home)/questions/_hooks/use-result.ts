"use client";
import { submitAnswer } from "@/lib/api/exam/answer.api";
import type { QuizResultResponse } from "@/lib/types/result";
import type { FormValues } from "../_components/quiz-form";
import { useMutation } from "@tanstack/react-query";

export const useResult = () => {
  const {
    isError,
    isSuccess,
    isPending,
    data: resultData,
    mutate,
    reset,
    error,
  } = useMutation<QuizResultResponse, Error, FormValues>({
    mutationFn: submitAnswer,
  });

  return {
    isError,
    isPending,
    isSuccess,
    resultData,
    mutate,
    reset,
    error,
  };
};
