import { JSON_HEADER } from "@/lib/constant/shared.constant";
import { GetExamsResponse } from "@/lib/types/exam";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        // Get token from cookies
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // Check auth
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        // Fetch exams from backend
        const response = await fetch(
            `${process.env.API_BASE_URL}/exams`,
            {
                method: "GET",
                headers: {
                    token: token.accessToken as string,
                    ...JSON_HEADER,
                },
            }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: `failed to fetch exams: ${response.statusText}` },
                { status: response.status }
            );
        }

        // Return data
        const payload: GetExamsResponse = await response.json();
        return NextResponse.json(payload);
    } catch {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
