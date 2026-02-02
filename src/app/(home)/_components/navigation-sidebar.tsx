import { cn } from '@/lib/utils/tailwind-cn'
import { GraduationCap, UserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { useSidebar } from '@/components/ui/sidebar';

export default function NavigationSidebar() {

    // Hooks
    const pathname = usePathname();
    const { isMobile, setOpenMobile } = useSidebar();


    const links = [
        {
            href: "/diplomas",
            label: "Diplomas",
            icon: <GraduationCap className="h-5 w-5" />,
            isActive: pathname.startsWith("/diplomas")
        },
        {
            href: "/account/profile",
            label: "Account Settings",
            icon: <UserRound className="h-5 w-5" />,
            isActive: pathname.startsWith("/account")
        }
    ];

    return (
        <nav className="flex-1 p-4 space-y-2">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => isMobile && setOpenMobile(false)}
                    className={cn(
                        "flex items-center gap-3 px-4 py-3 transition-colors font-mono ",
                        link.isActive
                            ? "bg-blue-100 text-blue-600 border border-blue-500 shadow-sm"
                            : "text-gray-500 hover:bg-gray-100"
                    )}
                >
                    {link.icon}
                    <span className="text-sm font-medium">{link.label}</span>
                </Link>
            ))}
        </nav>
    );
}