
import { JSON_HEADER } from "@/lib/constant/shared.constant";
import { GetExamsResponse } from "@/lib/types/exam";

export const getExams = async (
    subjectId: string
): Promise<GetExamsResponse> => {
    const response = await fetch(`/api/exams?subject`, {
        method: "GET",
        headers: {
            ...JSON_HEADER,
        },
        credentials: "include", // send cookies
    });


    return response.json();
};
