'use client'

import { SubmitHandler, useForm } from "react-hook-form"
import { loginSchema, LoginValues } from "@/lib/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ErrorMessage from "@/components/shared/error-message"
import useLogin from "../_hooks/use-login"
import { toast } from "sonner"

export default function LoginForm() {
    // Form
    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    // Mutation
    const { login, isPending, error } = useLogin();

    // Function
    const onSubmit: SubmitHandler<LoginValues> = (values) => {
        login(values, {
            onSuccess: () => {
                toast.success("Login successful");
            },
            onError: () => {
                toast.error("Login failed");
            }
        })
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:w-md flex flex-col">
                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="mb-7">
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

                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="mb-2.5">
                            <FormLabel>Password</FormLabel>

                            {/* Control */}
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>

                            {/* Message */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Forget Password */}
                <Link href="/forgot-password" className="text-sm font-medium text-blue-600 mb-10 text-end hover:underline">Forget your Password?</Link>

                {/* Error Message */}
                <ErrorMessage className="mb-9">{error?.message}</ErrorMessage>

                {/* Submit */}
                <Button loading={isPending} disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)} type="submit" className="w-full">Login</Button>
            </form>
        </Form>
    );
}