import { JSON_HEADER } from "@/lib/constant/shared.constant";
import { GetQuestionsResponse } from "@/lib/types/questions";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        // get token from cookies
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // check if there is token
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        //get exam id using search params
        const { searchParams } = new URL(request.url);
        const examId = searchParams.get("exam");

        //fetching data

        const response = await fetch(
            `${process.env.API_BASE_URL}/questions?exam=${examId}`,
            {
                method: "GET",
                headers: {
                    token: token.accessToken,
                    ...JSON_HEADER,
                },
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: `failed to fetch questions: ${response.statusText}` },
                { status: response.status }
            );
        }

        //return data in NextResponse
        const payload: GetQuestionsResponse = await response.json();
        return NextResponse.json(payload);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
