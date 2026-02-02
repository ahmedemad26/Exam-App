import ForgetPasswordSteps from "./forget-password-steps";
import AuthFooterLayout from "../_components/layout/auth-footer-layout";


export const metadata = {
    title: "Exam App - Forget Password",
};

export default function Page() {
    return <main className='flex items-center justify-center px-5  lg:px-0 py-10 lg:py-0 min-h-full'>
        <div className='max-w-md space-y-10 w-full'>

            {/* Form */}
            <ForgetPasswordSteps />

            {/* Dont have an account */}
            <AuthFooterLayout link={{ href: '/register', text: 'Create Yours' }} text="Don't have an account? " />

        </div>
    </main>
}
