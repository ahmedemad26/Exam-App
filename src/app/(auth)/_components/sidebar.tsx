import { cn } from '@/lib/utils/tailwind-cn'
import { BookOpenCheck, Brain, FolderCode, RectangleEllipsis } from 'lucide-react'
import React from 'react'

export default function Sidebar() {
    // List items Variables
    const listItems = [
        {
            icon: <Brain size={24} strokeWidth={1.5} />,
            tittle: 'Tailored Diplomas',
            desc: 'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
        },
        {
            icon: <BookOpenCheck size={24} strokeWidth={1.5} />,
            tittle: 'Foucsed Exams',
            desc: 'Access topic-specific tests including HTML, CSS, JavaScript, and more.',
        },
        {
            icon: <RectangleEllipsis size={24} strokeWidth={1.5} />,
            tittle: 'Smart Multi-Step Forms',
            desc: 'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
        },
    ]

    return (
        <aside className={
            cn(
                'py-8 px-6 lg:py-16 lg:px-32 relative overflow-hidden flex flex-col items-center justify-center h-screen',
                'before:absolute before:rounded-full before:right-[-10%] before:top-[10%] before:size-80 before:bg-blue-400 before:-z-[2]',
                'after:absolute after:rounded-full after:left-[10%] after:bottom-[-10%] after:size-80 after:bg-blue-400 after:-z-[2]',
            )

        }>
            {/* Overlay */}
            <div className='absolute inset-0 bg-blue-50/70 z-[-1] backdrop-blur-3xl' />

            {/* Content Wrapper */}
            <div className='w-full max-w-md lg:max-w-none'>
                {/* Header */}
                <header className='text-lg lg:text-xl w-full font-semibold flex items-center gap-2.5 mb-8 lg:mb-[16%]' >
                    <FolderCode className='text-blue-600' size={25} /> Exam App
                </header>

                {/* Content */}
                <div className='space-y-8 lg:space-y-8'>
                    <p className='font-inter font-semibold text-xl lg:text-2xl'>Empower your learning journey with our smart exam platform.</p>

                    {/* List */}
                    <ul className='flex flex-col gap-6 lg:gap-9'>
                        {listItems.map((item, i) => (
                            <li key={i} className='flex gap-4 lg:gap-5'>
                                {/* Icon */}
                                <span className='size-9 flex items-center justify-center border border-blue-600 shrink-0 text-blue-600'>
                                    {item.icon}
                                </span>
                                <div className='flex flex-col gap-2 lg:gap-2.5'>
                                    {/* Tittle */}
                                    <p className='text-blue-600 font-semibold text-lg lg:text-xl'>{item.tittle}</p>

                                    {/* Description */}
                                    <p className='text-gray-700 font-medium text-sm lg:text-base'>{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </aside>
    )
}