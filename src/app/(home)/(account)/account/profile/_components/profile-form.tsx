"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { profileSchema, profileValues } from "@/lib/schemas/edit-profile.schema";
import {  Loader2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useProfile } from "../_hooks/use-profile";
import { useDelete } from "../_hooks/use-delete";

const REQUIRED_FIELDS: (keyof profileValues)[] = [
  "firstName",
  "lastName",
  "email",
];

export default function ProfileForm() {
  // Navigation
  const router = useRouter();
  // Mutation
  const { isPending, mutate } = useProfile();
  const { isPending: isLoading, mutate: deleteAccount } = useDelete();

  // Form
  const form = useForm<profileValues>({
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    resolver: zodResolver(profileSchema),
  });

  const watched = form.watch(REQUIRED_FIELDS);
  const isFormComplete = REQUIRED_FIELDS.every(
    (key, i) => (watched[i] ?? "").toString().trim() !== ""
  );

  // Function
  function removeEmptyFields<T extends Record<string, unknown>>(
    obj: T
  ): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(
        ([, value]) => value !== "" && value !== undefined
      )
    ) as Partial<T>;
  }

  // Event Handlers

  const handleDeleteAccount = () => {
    deleteAccount(undefined, {
      // Success callback - show success message and redirect
      onSuccess: () => {
        toast.success("Account deleted successfully");
        // Redirect to login after successful account deletion
        signOut({ callbackUrl: "/login" });
      },
      // Error callback - show error message
      onError: () => {
        toast.error("Delete Failed");
      },
    });
  };

  /**
   * Form submission handler for profile updates
   * Filters out empty fields and updates user profile
   */
  const onSubmit: SubmitHandler<profileValues> = (values) => {
    // Remove empty fields
    const data = removeEmptyFields(values);

    // Trigger profile update mutation
    mutate(data, {
      // show success toast and refresh to show updated data
      onSuccess: () => {
        toast.success("Profile updated successfully");
        router.refresh();
      },

      // show error toast
      onError: () => {
        toast.error("Update Failed");
      },
    });
  };
  return (
    <>
      <section className="w-full  h-full flex justify-center  p-5 text-gray-800 font-mono ">
        <Form {...form}>
          <form
            className="w-full max-w-3xl"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* First Name and Last Name - Side by side */}
            {/* FirstName Field */}
            <div className="grid grid-cols-1 md:grid-cols-2  w-full gap-3">
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* FirstName Label */}
                    <FormLabel className="font-medium text-base">
                      First name
                    </FormLabel>
                    <FormControl>
                      {/* FirstName Input */}
                      <Input
                        placeholder="Ahmed"
                        className="w-full h-10 "
                        {...field}
                      />
                    </FormControl>
                    {/* Feedback message */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* LastName Field */}
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    {/* LastName Label */}
                    <FormLabel className="font-medium text-base">
                      Last name
                    </FormLabel>
                    <FormControl>
                      {/* LastName Input */}
                      <Input
                        placeholder="Abdullah"
                        className="w-full h-10"
                        {...field}
                      />
                    </FormControl>
                    {/* Feedback message */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Username Field */}
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  {/* Username Label */}
                  <FormLabel className="font-medium text-base">
                    Username
                  </FormLabel>
                  <FormControl>
                    {/* Username Input */}
                    <Input
                      placeholder="user123"
                      className="w-full h-10"
                      {...field}
                    />
                  </FormControl>
                  {/* Feedback message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email field */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  {/* Email Label */}
                  <FormLabel className="text-base font-medium">Email</FormLabel>
                  <FormControl>
                    {/* Email Input */}
                    <Input
                      type="email"
                      placeholder="user@example.com"
                      className="w-full h-10"
                      {...field}
                    />
                  </FormControl>
                  {/* Feedback message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mt-4">
                  {/* Phone Label */}
                  <FormLabel className="font-medium text-base">Phone</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <div className="flex items-center px-3 py-2 border border-r-0 rounded-l-md bg-gray-50 text-xs text-gray-600 h-10">
                        EG(+20)
                      </div>
                      {/* Phone Input */}
                      <Input
                        placeholder="1012345678"
                        className="w-full rounded-l-none h-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  {/* Feedback message */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Delete Account - Save Changes */}
            <div className="grid mt-8 font-mono font-medium  grid-cols-1 sm:grid-cols-2 w-full gap-4">
              {/* Account Deletion Dialog */}
              <AlertDialog>
                {/* Delete Account Trigger Button */}
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    className="w-full  bg-red-50 text-red-600 hover:bg-red-50"
                  >
                    Delete My Account
                  </Button>
                </AlertDialogTrigger>

                {/* Confirmation Dialog Content */}
                <AlertDialogContent className="p-0  flex font-mono font-medium flex-col justify-center items-center w-full max-w-md sm:max-w-lg">
                  {/* Dialog Header */}
                  <AlertDialogHeader className=" px-4  h-[308px] flex justify-center items-center ">
                    <div className="flex justify-center items-center">
                      {/* Outer Circle */}
                      <div className="w-[110px] h-[110px] bg-red-50 rounded-full flex justify-center items-center">
                        {/* Inner Circle */}
                        <div className="w-20 h-20 bg-red-100 rounded-full flex justify-center items-center">
                          {/* Warning Icon */}
                          <TriangleAlert className="w-12 h-12 text-red-600" />
                        </div>
                      </div>
                    </div>
                    {/* Warning Title */}
                    <AlertDialogTitle className="text-red-600 pt-5 text-lg">
                      Are you sure you want to delete your account?
                    </AlertDialogTitle>
                    {/* Warning Description */}
                    <AlertDialogDescription className="text-gray-500 text-sm">
                      This action is permanent and cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  {/* Footer */}
                  <AlertDialogFooter className="w-full   border-t border-gray-200  flex-1 p-6 bg-gray-50">
                    <div className=" gap-3   w-full  flex justify-center items-center">
                      {/* Cancel Button */}
                      <AlertDialogCancel asChild>
                        <Button
                          variant="secondary"
                          className="bg-gray-200 text-gray-800 hover:bg-gray-200 w-full border-none checked:"
                        >
                          Cancel
                        </Button>
                      </AlertDialogCancel>

                      {/* Confirm Delete Button */}
                      <AlertDialogAction asChild>
                        <Button
                          disabled={isLoading}
                          variant="destructive"
                          className="bg-red-600 hover:bg-red-700 w-full cursor-alias"
                          onClick={() => {
                            handleDeleteAccount();
                          }}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              deleting...
                            </>
                          ) : (
                            " Yes, delete"
                          )}
                        </Button>
                      </AlertDialogAction>
                    </div>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Save Changes Button - disabled until required fields are filled */}
              <Button
                type="submit"
                disabled={isPending || !isFormComplete}
                variant={"blue"}
                className="w-full "
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </>
  );
}
