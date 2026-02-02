"use client";

import { getExams } from "@/lib/api/exam/exam.api";
import { GetExamsResponse } from "@/lib/types/exam";
import { useQuery } from "@tanstack/react-query";

export const useExams = (subjectId: string) => {
    const {
        data: payload,
        isLoading,
        error,
    } = useQuery<GetExamsResponse>({
        queryKey: ["exams", subjectId],
        queryFn: () => getExams(subjectId),
        enabled: !!subjectId,
    });


    return { payload, isLoading, error };
};
