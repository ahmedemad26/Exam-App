import RegisterForm from './_components/register-form';
import AuthFooterLayout from '../_components/layout/auth-footer-layout';
import AuthHeader from '../_components/layout/auth-header-layout';

export const metadata = {
    title: "Exam App - SignUp",
};

export default function Page() {
    return (
        <main className='flex items-center justify-center px-5  lg:px-0 py-10 lg:py-0 min-h-full'>
            <div className='max-w-md space-y-10 w-full'>
                {/* Headline */}
                <AuthHeader.Title>Register</AuthHeader.Title>

                {/* Form */}
                <RegisterForm />

                {/* Dont have an account */}
                <AuthFooterLayout link={{ href: '/login', text: 'Login' }} text="Already have an account? " />
            </div>
        </main>
    )
}