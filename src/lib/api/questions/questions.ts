

import { JSON_HEADER } from "@/lib/constant/shared.constant";
import { GetQuestionsResponse } from "@/lib/types/questions";

export const getQuestions = async (
    id: string
): Promise<GetQuestionsResponse> => {
    try {
        const response = await fetch(`/api/questions?exam=${id}`, {
            method: "GET",
            headers: {
                ...JSON_HEADER,
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(`failed to fetch questions: ${response.statusText}`);
        }
        const payload = await response.json();
        return payload;
    } catch (error) {
        throw error;
    }
};
