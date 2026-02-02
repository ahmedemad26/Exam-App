import { cn } from '@/lib/utils/tailwind-cn';
import Link from 'next/link'



type AuthProps = {
    link: {
        href: string;
        text: string;
    };
    text: string;
} & React.HtmlHTMLAttributes<HTMLParagraphElement>;

export default function AuthFooterLayout({ link, text, className, ...props }: AuthProps) {
    return (
        // Text
        <p className={cn("font-medium text-sm text-gray-500 text-center", className)} {...props}>{text}
            <Link href={link.href} className={cn("text-blue-600 hover:underline", className)}>{link.text}</Link>
        </p>
    )
}
