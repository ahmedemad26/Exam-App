'use client'

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import { useEmail } from "../../_hooks/use-email";
import { toast } from "sonner";
import { cn } from "@/lib/utils/tailwind-cn";

// Props
type ResendOtpProps = {
    email: string | null;
} & React.HTMLAttributes<HTMLParagraphElement>;

export default function ResendOtp({ email, className, ...props }: ResendOtpProps) {

    // Variable
    const title = {
        available: "You can request another code in: ",
        notAvailable: "Didn't receive the code? ",
    }

    // Mutation
    const { email: mutateEmail, isPending } = useEmail();

    // State
    const [timer, setTimer] = useState(60);

    // Function
    const handleResendOtp = () => {
        mutateEmail({ email: email! }, {
            onSuccess: () => {
                toast.success("A new OTP has been sent to your email");
                setTimer(60);
            },
            onError: (error) => {
                toast.error(error.message);
            },
        });
    }

    // Start Timer
    useEffect(() => {
        const intervalTime = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(intervalTime);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(intervalTime);
    }, [timer]);

    return (
        <p className={cn("flex items-center gap-1 text-sm text-gray-500", className)} {...props}>
            {timer > 0 ? title.available : title.notAvailable}

            {timer > 0 && (
                <span className="font-medium">{timer}s</span>
            )}

            {/* Resend Button */}
            {timer <= 0 && (
                <Button
                    type="button"
                    onClick={handleResendOtp}
                    variant="link"
                    disabled={isPending}
                    className="h-auto p-0 text-sm font-semibold text-blue-600 disabled:bg-transparent cursor-pointer"
                >
                    Resend
                </Button>
            )}
        </p>
    )
}