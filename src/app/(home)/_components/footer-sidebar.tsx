import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils/tailwind-cn'
import { LogOut, MoreVertical, UserRound } from 'lucide-react'
import { signOut } from 'next-auth/react'
import React from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function FooterSidebar() {

    const { data: session } = useSession();

    return <div className="border-t p-4 bg-[#f0f7ff]">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-10 w-10 flex-shrink-0 rounded-none border border-blue-400">
                    <AvatarImage src="" className="object-cover" />
                    <AvatarFallback className="rounded-none bg-gray-200 text-gray-600 font-mono">
                        {session?.firstName?.charAt(0) || "User"}
                    </AvatarFallback>
                </Avatar>

                <div className="flex flex-col font-mono min-w-0 leading-tight">
                    <span className={cn(
                        "text-sm font-bold text-blue-600 truncate",
                        "tracking-tight"
                    )}>
                        {session?.firstName || "User"}
                    </span>
                    <span className={cn(
                        "text-[10px] text-gray-400 truncate tracking-tighter",
                        "mt-0.5"
                    )}>
                        {session?.user?.email || "user@example.com"}
                    </span>
                </div>
            </div>



            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:bg-blue-100"
                    >
                        <MoreVertical size={16} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-[200px] font-mono font-medium"
                    align="end"
                >


                    {/* Account */}
                    <DropdownMenuItem className="cursor-pointer" asChild>
                        <Link href="/account/profile">
                            <UserRound className="w-4 h-4 mr-2" /> Account
                        </Link>
                    </DropdownMenuItem>


                    {/* Logout */}
                    <DropdownMenuItem
                        className="text-red-600 hover:text-red-600 focus:text-red-600 cursor-pointer"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                    >
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
}