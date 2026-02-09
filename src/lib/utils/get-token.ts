import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export const getToken = async () => {
    const tokenCookie =
        (await cookies()).get("accessToken")?.value ||
        (await cookies()).get("next-auth.session-token")?.value ||
        (await cookies()).get("__Secure-next-auth.session-token")?.value;
    if (!tokenCookie) return null;

    try {
        const jwt = await decode({
            token: tokenCookie,
            secret: process.env.NEXTAUTH_SECRET!,
        });
        return jwt;
    } catch (error) {
        return null;
    }
};