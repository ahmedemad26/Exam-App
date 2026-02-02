import { Button } from '@/components/ui/button'
import { GetQuestionsResponse } from '@/lib/types/questions'
import { ChevronLeft, CircleQuestionMark } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function HeaderQuestions({
    payload,
    backHref,
}: {
    payload: GetQuestionsResponse;
    backHref: string;
}) {
    return < header className="w-full flex gap-[10px] flex-row-reverse" >
        <div className="bg-blue-600 flex flex-row  w-full h-[77px]   text-[#FFFFFF] p-4 text-3xl font-inter font-semibold ">
            {/* Question mark icon */}
            <CircleQuestionMark className=" h-11 w-11" />
            {/* Title */}
            <span className="flex justify-center items-center px-3 ">
                [{payload?.questions[0].exam?.title}] Questions
            </span>
        </div>

    {/* Navigation to exams page */ }
    <Link href={backHref}>
        <Button className="h-[77px] w-[38px] cursor-pointer  bg-white  border-2 hover:bg-white border-blue-600">
            <ChevronLeft className="h-6 w-6 text-blue-600" />
        </Button>
    </Link>
  </header >
}                   
