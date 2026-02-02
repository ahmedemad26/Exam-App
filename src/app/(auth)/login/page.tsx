import React from 'react'
import LoginForm from './_components/login-form'
import AuthFooterLayout from '../_components/layout/auth-footer-layout';
import AuthHeader from '../_components/layout/auth-header-layout';

export const metadata = {
    title: "Exam App - Login",
};

export default function Page() {
    return (
        <main className='flex items-center justify-center px-6 lg:px-0 py-10 lg:py-0 min-h-screen'>
            <div className='w-full  max-w-md space-y-10'>
                {/* Headline */}
                <AuthHeader.Title>Login</AuthHeader.Title>

                {/* Form */}
                <LoginForm />

                {/* Dont have an account */}
                <AuthFooterLayout link={{ href: '/register', text: 'Create Yours' }} text="Don't have an account? " />
            </div>
        </main>
    )
}