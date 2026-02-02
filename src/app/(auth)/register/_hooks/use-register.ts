import { registerAction } from "@/lib/actions/auth.action";
import { RegisterValues } from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";

export const useRegister = () => {
  const { mutate: register, isPending, error } = useMutation({
    mutationFn: async (userData: RegisterValues) => {
      const response = await registerAction(userData);

      // Error
      if ("code" in response) {
        throw new Error(response.message);
      }
      return response;
    }
  });
  return { register, isPending, error };
};