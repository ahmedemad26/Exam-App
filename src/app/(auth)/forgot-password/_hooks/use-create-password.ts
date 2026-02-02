import { createPasswordAction } from "@/lib/actions/auth.action";
import { CreatePasswordValues} from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";

export const useNewPassword = () => {
    const { mutate: createPassword, isPending, error } = useMutation({
        mutationFn: async (values: Pick<CreatePasswordValues, 'newPassword'> & { email: string }) => {
            const response = await createPasswordAction({
                newPassword: values.newPassword,
                email: values.email,
            });

            // Error
            if ("code" in response) {
                throw new Error(response.message);
            }
            return response;
        },
    });

    return { createPassword, isPending, error };
}