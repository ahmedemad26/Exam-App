import { LoginValues } from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {
    const { mutate: login, isPending, error } = useMutation({
        mutationFn: async (values: LoginValues) => {
            const response = await signIn('credentials', {
                ...values,
                redirect: false,

            });

            // Error
            if (response?.error) {
                throw new Error(response.error);
            }

            // Success
            if (response?.ok) {
                // Redirect to diplomas after successful login
                location.href = new URLSearchParams(location.search).get("callbackUrl") || "/diplomas";
                return response;
            }
        },
    });
    return { login, isPending, error }
}