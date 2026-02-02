import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import ErrorMessage from '@/components/shared/error-message';
import { createPasswordSchema, CreatePasswordValues } from '@/lib/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNewPassword } from '../../_hooks/use-create-password';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

//Props
type CreatePasswordStepProps = {
  email: string | null;
};

export default function CreatePasswordStep({ email }: CreatePasswordStepProps) {
  // Navigation
  const router = useRouter();
  // Form
  const form = useForm<CreatePasswordValues>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Mutation
  const { createPassword, isPending, error } = useNewPassword();

  // Function
  const onSubmit: SubmitHandler<CreatePasswordValues> = (values) => {
    createPassword({
      newPassword: values.newPassword,
      email: email!,
    }, {
      onSuccess: () => {
        toast.success("Password Reset successfully");
        router.push("/login");
      },
      onError: () => {
        toast.error("Password creation failed");
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 overflow-auto lg:w-sx ">
        {/* New Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem >
              <FormLabel>New Password</FormLabel>

              {/* Control */}
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>

              {/* Message */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Error Message */}
        <ErrorMessage className="text-center mb-2">{error?.message}</ErrorMessage>

        {/* Submit */}
        <Button type="submit" loading={isPending} disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)} className="w-full ">Reset Password</Button>
      </form>
    </Form>
  )
}
