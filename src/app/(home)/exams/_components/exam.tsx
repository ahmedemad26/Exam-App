"use client";
import {  Timer } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useExams } from "../_hooks/use-exam";
import { ExamQuestionSkeleton } from "../../_components/skelton";
import HeaderExam from "./header-exam";
import ExamsSkeleton from "./skelton-exam";


// Props
interface ExamsProps {
    subjectId: string;
    basePath?: string;
}
export default function Exams({ subjectId, basePath }: ExamsProps) {
    // Mutation
    const { payload, isLoading } = useExams(subjectId);

    // Loading
    if (isLoading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <ExamsSkeleton />
            </div>
        );
    }

    return (
        <section className="flex flex-col  gap-4   min-h-screen items-center">
            {/* Header */}
            <HeaderExam />

            <div className="bg-white w-full p-6  flex-1">
                {/* Exam Details */}
                {payload?.exams.map((exam) => (
                    <Link key={exam._id} href={basePath ? `${basePath}/${subjectId}/questions/${exam._id}` : `/questions/${exam._id}`}>
                        <div className="flex  flex-row justify-between items-center p-4 bg-blue-50 font-mono mt-1">
                            {/* left side */}
                            <div className=" text-[12px] sm:text-base  flex flex-col ">
                                {/* Quiz name */}
                                <p className="text-blue-600 "> {exam.title}</p>

                                {/* Questions Number */}
                                <p className="text-gray-500 ">
                                    {exam.numberOfQuestions} Questions
                                </p>
                            </div>

                            {/* right side */}
                            <p className=" justify-center items-center  text-[12px] sm:text-base text-gray-800 gap-2 flex ">
                                {/* Icon timer */}
                                <span>
                                    <Timer className="h-3 w-3 sm:w-6 sm:h-6" />
                                </span>
                                {/* Duration */}
                                Duration: {exam.duration} minutes
                            </p>
                        </div>
                    </Link>
                ))}

                {/*In case there is no data */}
                {payload?.exams.length == 0 ? (
                    <div className="flex flex-row justify-between items-center p-4 bg-blue-50 font-mono">
                        <p>No data to show</p>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </section>
    );
}
