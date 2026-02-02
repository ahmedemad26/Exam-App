import React from 'react'
import logo from "@/assets/Logo.png";
import Image from 'next/image';
import { FolderCode } from 'lucide-react';

export default function SidebarHeaderComponent() {
    return <div className="flex flex-col gap-2">
        <div className="mb-2">
            <Image
                src={logo}
                alt="ELEVATE"
                width={120}
                height={30}
                className="filter brightness-0 w-32"
            />
        </div>
        <div className="flex items-center gap-2">
            <FolderCode className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-lg text-blue-600 font-mono">
                Exam App
            </span>
        </div>
    </div>
}
