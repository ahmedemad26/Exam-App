import { forgotPassword } from "@/lib/actions/auth.action";
import { EmailValues } from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";

export const useEmail = () => {
    const { mutate: email, isPending, error } = useMutation({
        mutationFn: async (email: EmailValues) => {
            const response = await forgotPassword(email);

            // Error
            if ("code" in response) {
                throw new Error(response.message);
            }
            return response;
        },
    });

    return { email, isPending, error };
}