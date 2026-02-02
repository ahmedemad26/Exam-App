import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { GetSubjectsResponse } from "@/lib/types/subjects";
import { JSON_HEADER } from "@/lib/constant/shared.constant";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    try {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });


        // if token is not found, return 401
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // get page from query parameters
        const { searchParams } = new URL(request.url);
        const page = searchParams.get("page") || "1";

        const response = await fetch(
            `${process.env.API_BASE_URL}/subjects?page=${page}&limit=6`,
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
                { error: `failed to fetch subjects: ${response.statusText}` },
                { status: response.status }
            );
        }

        // parse response to GetSubjectsResponse

        const data: GetSubjectsResponse = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
