import { cn } from '@/lib/utils/tailwind-cn'
import {  CircleX } from 'lucide-react'
import React from 'react'

export default function ErrorMessage({ className , children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    if (!children) return null;
    return (
        <p  {...props} className={cn(" relative text-sm p-2.5 font-medium text-red-500 mb-20 flex items-center justify-center text-center border border-red-600 bg-red-50 ", className)} >
            {/* Icon */}
            <CircleX  size={18} className='text-red-600 bg-white absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' />

            {/* Message */}
            {children}
        </p>
    )
}
