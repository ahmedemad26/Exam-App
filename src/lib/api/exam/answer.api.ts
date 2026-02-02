"use server";

import { FormValues } from "@/app/(home)/questions/_components/quiz-form";
import { JSON_HEADER } from "@/lib/constant/shared.constant";
import { QuizResultResponse } from "@/lib/types/result";
import { getToken } from "@/lib/utils/get-token";

export const submitAnswer = async (
    answers: FormValues
): Promise<QuizResultResponse> => {
    try {
        const jwt = await getToken();

        if (!jwt?.accessToken) {
            throw new Error("No access token found");
        }

        const response = await fetch(
            `${process.env.API_BASE_URL}/questions/check`,
            {
                method: "POST",
                body: JSON.stringify(answers),
                headers: {
                    ...JSON_HEADER,
                    token: jwt.accessToken,
                },
            }
        );

        if (!response.ok) {
            throw new Error(`failed: ${response.statusText}`);
        }
        const payload = await response.json();
        return payload as QuizResultResponse;
    } catch (error) {
        throw new Error(`failed to fetch answers data ${error}`);
    }
};
