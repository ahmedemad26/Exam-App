"use client";

import { useState } from 'react'
import EmailStep from './_components/steps/email-step';
import VerifyStep from './_components/steps/verify-step';
import CreatePasswordStep from './_components/steps/create-password-step';
import { FORGOT_PASSWORD_STEPS } from '@/lib/constant/auth.constant';
import { ForgotPasswordSteps } from '@/lib/types/auth';
import { Button } from '@/components/ui/button';
import AuthHeader from '../_components/layout/auth-header-layout';
import PreviousButton from './_components/previous-button';



export default function ForgetPasswordSteps() {
    // State
    const [email, setEmail] = useState<string | null>(null);
    const [step, setStep] = useState<ForgotPasswordSteps>(FORGOT_PASSWORD_STEPS.EMAIL);
    // Variable
    const steps = {
        [FORGOT_PASSWORD_STEPS.EMAIL]: {
            previous: null,
            component: <EmailStep email={email} setEmail={setEmail} setStep={setStep} />,
            title: <AuthHeader.Title>Forget Password</AuthHeader.Title>,
            description: <AuthHeader.Description>Don’t worry, we will help you recover your account.</AuthHeader.Description>,
        },
        [FORGOT_PASSWORD_STEPS.VERIFY]: {
            previous: FORGOT_PASSWORD_STEPS.EMAIL,
            component: <VerifyStep setStep={setStep} email={email} />,
            title: <AuthHeader.Title>Verify OTP</AuthHeader.Title>,
            description: <AuthHeader.Description>Please enter the 6-digits code we have sent to: <span className="block"><span className="text-gray-800">{email}</span> <Button variant="link" onClick={() => setStep(FORGOT_PASSWORD_STEPS.EMAIL)} className="text-blue-600 underline cursor-pointer p-0 h-fit">Edit</Button></span></AuthHeader.Description>,

        },
        [FORGOT_PASSWORD_STEPS.CREATE_PASSWORD]:
        {
            previous: null,
            component: <CreatePasswordStep email={email} />,
            title: <AuthHeader.Title>Create New Password</AuthHeader.Title>,
            description: <AuthHeader.Description>Create a new strong password for your account.</AuthHeader.Description>,
        },
    }
    return <>


        {/* Previous Button */}
        {steps[step].previous && <PreviousButton onClick={() => setStep(steps[step].previous!)} />}

        {/* Headline */}
        <AuthHeader>
            {/* Title */}
            {steps[step].title}

            {/* Description */}
            {steps[step].description}
        </AuthHeader>

        {/* Steps */}
        {steps[step].component}
    </>;
} 