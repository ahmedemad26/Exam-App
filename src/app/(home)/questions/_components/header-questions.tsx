import { Button } from '@/components/ui/button'
import { GetQuestionsResponse } from '@/lib/types/questions'
import { ChevronLeft, CircleQuestionMark } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const examTitle = (payload: GetQuestionsResponse) =>
    payload?.questions?.[0]?.exam?.title ?? 'Exam'

export default function HeaderQuestions({
    payload,
    backHref,
}: {
    payload: GetQuestionsResponse;
    backHref: string;
}) {

    // Get exam title
    const title = examTitle(payload)
    return (
        <header className="w-full flex gap-[10px] flex-row-reverse">
            <div className="bg-blue-600 flex flex-row items-center justify-center md:justify-start w-full min-h-[77px] h-[77px] text-[#FFFFFF] px-4 py-3 text-xl sm:text-2xl md:text-3xl font-inter font-semibold leading-tight overflow-visible">
                {/* Mobile: quiz name only */}
                <span className="truncate md:hidden">{title}</span>
                {/* Desktop Show Icon and Title */}
                <div className="hidden md:flex flex-row items-center gap-3">
                    <CircleQuestionMark className="h-11 w-11 shrink-0" />
                    <span className="text-2xl truncate min-w-0">[{title}] Questions</span>
                </div>
            </div>

            {/* Navigation to exams page */}
            <Link href={backHref}>
                <Button className="h-[77px] w-[38px] shrink-0 cursor-pointer bg-white border-2 hover:bg-white border-blue-600">
                    <ChevronLeft className="h-6 w-6 text-blue-600" />
                </Button>
            </Link>
        </header>
    )
}                   
