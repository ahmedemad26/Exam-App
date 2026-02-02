"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  changePasswordSchema,
  changePasswordValues,
} from "@/lib/schemas/change-password.schema";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

import ErrorMessage from "@/app/(home)/_components/error-message";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePassword } from "../_hooks/use-password";

export default function ChangePasswordForm() {
  // Mutation
  const { isPending, mutate, error } = usePassword();

  // Form
  const form = useForm<changePasswordValues>({
    defaultValues: {
      oldPassword: "",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });

  // Function

  const onSubmit: SubmitHandler<changePasswordValues> = (values) => {
    // Change Password mutation
    mutate(values, {
      // Success callback - show toast notification
      onSuccess: () => {
        toast.success("Password updated successfully");
      },
      // Error callback - show toast notification
      onError: () => {
        toast.error("Password update failed");
      },
    });
  };
  return (
    <>
      <section className=" h-full w-full   p-5 text-gray-800 font-mono ">
        <Form {...form}>
          <form className="w-full  " onSubmit={form.handleSubmit(onSubmit)}>
            {/* Current password */}
            <FormField
              name="oldPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  {/* Current password label */}
                  <FormLabel className="font-medium  text-base">
                    Current Password
                  </FormLabel>
                  <div className=" w-full">
                    {/* Current password input */}
                    <FormControl>
                      <Input
                        autoComplete="current-password"
                        type="password"
                        placeholder="********"
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  {/* Feedback message */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="bg-gray-200 mt-5 h-[1px] w-full"></div>

            {/* New Password */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  {/* New password label */}
                  <FormLabel className="font-medium   text-base">
                    New Password
                  </FormLabel>
                  <div className=" w-full">
                    <FormControl>
                      {/* New password input */}
                      <Input
                        autoComplete="new-password"
                        type="password"
                        placeholder="********"
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  {/* Feedback message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Re password */}
            <FormField
              name="rePassword"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  {/* Re password label */}
                  <FormLabel className="font-medium   text-base">
                    Confirm New Password
                  </FormLabel>
                  <div className=" w-full">
                    <FormControl>
                      {/* Re password input */}
                      <Input
                        autoComplete="new-password"
                        type="password"
                        placeholder="********"
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  {/* Feedback message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error Message */}
            <div className=" mt-8">
              {error?.message && (
                <ErrorMessage
                  message={error.message || "Something went wrong"}
                />
              )}
            </div>

            {/* Update Button */}
            <Button
              disabled={isPending}
              type="submit"
              className="mt-8 w-full font-medium"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </Form>
      </section>
    </>
  );
}
