"use client";

import React from "react";
import Link from "next/link";
import {
    UserRound,
    FolderCode,
    LogOut,
} from "lucide-react";
import {
    Sidebar,
    SidebarProvider,
    SidebarHeader,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import SidebarHeaderComponent from "./sidebar-header";
import NavigationSidebar from "./navigation-sidebar";
import FooterSidebar from "./footer-sidebar";
import MainHeader from "./main-header";
export default function SidebarHome({
    children,
}: {
    children: React.ReactNode;
}) {

    // Hooks
    const { data: session } = useSession();

    return (
        <SidebarProvider>
            <Sidebar>
                <div className="flex flex-col h-full font-mono">
                    {/* Header */}
                    <SidebarHeader className="pt-10 pb-8 px-6">
                        <SidebarHeaderComponent />
                    </SidebarHeader>

                    {/* Navigation */}
                    <NavigationSidebar />

                    {/* Footer */}
                    <FooterSidebar />

                </div>
            </Sidebar>

            <SidebarInset>
                <main id="main-scroll" className="flex-1 overflow-auto">
                    {/* Mobile Header with Menu Button */}
                    <header className="lg:hidden sticky top-0 z-40 bg-white border-b">
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center gap-3">
                                {/* Menu Button - uses sidebar context on mobile */}
                                <SidebarTrigger className="lg:hidden" />

                                <div className="flex items-center gap-2">
                                    <FolderCode className="h-5 w-5 text-blue-600" />
                                    <span className="font-semibold text-base text-blue-600 font-mono">
                                        Exam App
                                    </span>
                                </div>
                            </div>

                            {/* Mobile User Avatar */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="" />
                                            <AvatarFallback>
                                                {session?.user?.name?.charAt(0) || "M"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </div>
                    </header>

                    {/* Breadcrumb - Only on desktop */}
                    <div className="hidden lg:block">
                        <MainHeader />
                    </div>

                    {/* Page Content */}
                    <div className="flex-1 p-4 lg:p-6">
                        {children}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}