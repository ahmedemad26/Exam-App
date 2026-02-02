'use client';

import { ForgotPasswordSteps } from "@/lib/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { verifySchema, VerifyValues } from "@/lib/schemas/auth.schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useVerify } from "../../_hooks/use-verify";
import ErrorMessage from "@/components/shared/error-message";
import { toast } from "sonner";
import { FORGOT_PASSWORD_STEPS } from "@/lib/constant/auth.constant";
import ResendOtp from "./resend-otp";

//Props
type VerifyStepProps = {
  setStep: (step: ForgotPasswordSteps) => void;
  email: string | null;
};

export default function VerifyStep({ setStep, email }: VerifyStepProps) {
  // Form
  const form = useForm<VerifyValues>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      resetCode: "",
    },
  });

  // Mutation
  const { verify, isPending, error } = useVerify();

  // Function
  const onSubmit: SubmitHandler<VerifyValues> = (values) => {
    verify(values, {
      onSuccess: () => {
        toast.success("Code verified successfully");
        setStep(FORGOT_PASSWORD_STEPS.CREATE_PASSWORD);
      },
      onError: () => {
        toast.error("Code verification failed");
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 overflow-auto lg:w-md justify-items-center">
        {/* Reset Code */}
        <FormField
          control={form.control}
          name="resetCode"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/*  InputOTP */}
                <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                  {/*  InputOTP from Shad CN UI */}
                  <InputOTPGroup >
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              {/* Message */}
              <FormMessage className="text-center" />

            </FormItem>
          )}
        />

        {/* Resend OTP */}
        <ResendOtp  email={email} />
        {/* Error Message */}
        <ErrorMessage className="text-center mb-2">{error?.message}</ErrorMessage>

        {/* Submit */}
        <Button type="submit" loading={isPending} disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)} className="w-full">Verify Code</Button>

      </form>
    </Form>

  )
}
