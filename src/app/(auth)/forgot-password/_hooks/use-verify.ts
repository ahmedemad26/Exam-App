import { verifyAction } from "@/lib/actions/auth.action";
import { VerifyValues } from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";

export const useVerify = () => {
    const { mutate: verify, isPending, error } = useMutation({
        mutationFn: async (resetCode: VerifyValues) => {
            const response = await verifyAction(resetCode.resetCode);

            // Error
            if ("code" in response) {
                throw new Error(response.message);
            }
            return response;
        },
    });

    return { verify, isPending, error };
}