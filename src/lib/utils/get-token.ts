import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";
import type { JWT } from "next-auth/jwt";

export const getToken = async (): Promise<JWT | null> => {
    const cookieStore = await cookies();

    const tokenCookie =
        cookieStore.get("__Secure-next-auth.session-token")?.value ||
        cookieStore.get("next-auth.session-token")?.value ||
        cookieStore.get("accessToken")?.value;

    if (!tokenCookie) return null;

    const secret = process.env.NEXTAUTH_SECRET;
    if (!secret) return null;

    try {
        return await decode({ token: tokenCookie, secret });
    } catch {
        return null;
    }
};