'use client'

import ErrorMessage from "@/components/shared/error-message";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { registerSchema, RegisterValues } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRegister } from "../_hooks/use-register";
import { parsePhoneNumber } from "react-phone-number-input";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    // Navigation
    const router = useRouter();

    // Form
    const form = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
            username: '',
        },
    })

    // Mutation
    const { register, isPending, error } = useRegister();

    // Function
    const onSubmit: SubmitHandler<RegisterValues> = (values) => {
        // Parse phone number
        const parsedPhone = parsePhoneNumber(values.phone, "EG");
        values.phone = `0${parsedPhone?.nationalNumber}`;

        // Register
        register(values, {
            onSuccess: () => {
                toast.success("Registration successful");
                router.push("/login");
            },
            onError: () => {
                toast.error("Registration failed");
            },
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 overflow-auto lg:w-md ">
                {/* First Name */}
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem className="">
                            <FormLabel>First Name</FormLabel>

                            {/* Control */}
                            <FormControl>
                                <Input type="text" placeholder="John" {...field} />
                            </FormControl>

                            {/* Message */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Last Name */}
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel>Last Name</FormLabel>

                            {/* Control */}
                            <FormControl>
                                <Input type="text" placeholder="Doe" {...field} />
                            </FormControl>

                            {/* Message */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* UserName */}

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Username</FormLabel>

                            {/* Control */}
                            <FormControl>
                                <Input type="text" placeholder="username" {...field} />
                            </FormControl>

                            {/* Message */}
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
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

                {/* Phone */}
                <FormField
                    name="phone"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <PhoneInput
                                    defaultCountry="EG"
                                    placeholder="01012345678"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
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

                {/* Confirm Password */}
                <FormField
                    control={form.control}
                    name="rePassword"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Confirm Password</FormLabel>

                            {/* Control */}
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} />
                            </FormControl>

                            {/* Message */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Error Message */}
                <ErrorMessage className="col-span-2 mb-2">{error?.message}</ErrorMessage>
                {/* Submit */}
                <Button type="submit" loading={isPending} disabled={isPending || (form.formState.isSubmitted && !form.formState.isValid)} className="col-span-2" >Create Account</Button>
            </form>
        </Form>
    )
}
