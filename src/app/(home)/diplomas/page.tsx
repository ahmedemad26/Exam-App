import { GraduationCap } from "lucide-react";
import React from "react";
import { SubjectCard } from "./_components/subject";

export const metadata = {
    title: "Exam App - Diplomas",
};

export default function DiplomasPage() {
    return (
        <div>
            {/* Header */}
            <header className="bg-blue-600 flex flex-row items-center w-full h-[77px] text-[#FFFFFF] p-4 text-2xl sm:text-3xl font-inter font-semibold">
                {/* Icon */}
                <GraduationCap className="h-8 w-8 sm:h-11 sm:w-11" />

                {/* Page Title */}
                <span className="flex justify-center px-3">Diplomas</span>
            </header>

            {/* Subjects List */}
            <SubjectCard />
        </div>
    );
}