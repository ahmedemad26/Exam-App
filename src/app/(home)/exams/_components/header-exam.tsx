import { Button } from '@/components/ui/button'
import { BookOpenCheck, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function HeaderExam() {
    return < header className = "w-full flex gap-[10px] flex-row-reverse" >
            <div className="bg-blue-600 flex flex-row  w-full h-[77px]   text-[#FFFFFF] p-4 text-3xl font-inter font-semibold ">
                {/* Icon */}
                <BookOpenCheck className=" h-11 w-11" />

                {/* Title */}
                <span className=" flex justify-center items-center px-3">
                    Exams
                </span>
            </div>

    {/* Navigate to diplomas page */ }
    <Link href={`/diplomas`}>
        <Button className="h-[77px] w-[38px] cursor-pointer  bg-white  border-2 hover:bg-white border-blue-600">
            <ChevronLeft className="h-6 w-6 text-blue-600" />
        </Button>
    </Link>
  </header >
}
