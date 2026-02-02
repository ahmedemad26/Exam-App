"use client";
import { getQuestions } from "@/lib/api/questions/questions";
import { GetQuestionsResponse } from "@/lib/types/questions";
import { useQuery } from "@tanstack/react-query";

export const useQuestions = (examId: string) => {
    const {
        data: payload,
        isLoading,
        error,
    } = useQuery<GetQuestionsResponse>({
        queryKey: ["questions", examId],
        queryFn: () => getQuestions(examId),
        enabled: !!examId,
    });

    return { payload, isLoading, error };
};
