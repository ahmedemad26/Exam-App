'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FORGOT_PASSWORD_STEPS } from '@/lib/constant/auth.constant';
import { ForgotPasswordSteps } from '@/lib/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveRight } from 'lucide-react';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEmail } from '../../_hooks/use-email';
import { EmailSchema, EmailValues } from '@/lib/schemas/auth.schema';
import { toast } from 'sonner';
import ErrorMessage from '@/components/shared/error-message';

//Props
type EmailStepProps = {
    setEmail: (email: string) => void;
    setStep: (step: ForgotPasswordSteps) => void;
    email: string | null;
};


export default function EmailStep({ setEmail, setStep }: EmailStepProps) {
    // Form
    const form = useForm<EmailValues>({
        resolver: zodResolver(EmailSchema),
        defaultValues: {
            email: '',
        },
    });

    // Mutation
    const { email, isPending, error } = useEmail();

    // Function
    const onSubmit: SubmitHandler<EmailValues> = (values) => {
        email(values, {
            onSuccess: (data) => {
                // Set Email
                setEmail(values.email);

                // Next Step
                setStep(FORGOT_PASSWORD_STEPS.VERIFY);
                toast.success(`${data.message}`);
            },
            onError: (error) => {
                toast.error(`${error.message}`);
            },
        });

    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 overflow-auto lg:w-md ">
            {/* Email */}
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>

                        {/* Control */}
                        <FormControl>
                            <Input type="email" placeholder="user@example.com" {...field} />
                        </FormControl>

                        {/* Message */}
                        <FormMessage />
                    </FormItem>
                )}
            />

            {/* Error */}

            <ErrorMessage className="text-center  mb-2">{error?.message}</ErrorMessage>

            {/* Submit */}
            <Button disabled={form.formState.isSubmitted && !form.formState.isValid || isPending} type="submit" className="w-full flex items-center justify-center gap-2">
                Continue <MoveRight />
            </Button>
        </form>
    </Form>
}
