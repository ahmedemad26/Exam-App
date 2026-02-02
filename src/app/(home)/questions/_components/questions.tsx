"use client";

import React from "react";
import QuizForm from "./quiz-form";
import { useQuestions } from "../_hooks/use-question";
import { ExamQuestionSkeleton } from "../../_components/skelton";
import HeaderQuestions from "./header-questions";


// Props
interface questionsProps {
  examId: string;
  basePath?: string;
}
export default function Questions({ examId, basePath }: questionsProps) {
  // Mutation
  const { payload, isLoading } = useQuestions(examId);

  // Loading state
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ExamQuestionSkeleton />
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-col  gap-4   min-h-screen items-center">
        {/* Header */}
        {payload && (
          <HeaderQuestions
            payload={payload}
            backHref={
              (() => {
                const subjectId = payload.questions?.[0]?.exam?.subject;
                if (!subjectId) return basePath ? "/diplomas" : "/exams";
                return basePath ? `${basePath}/${subjectId}` : `/exams/${subjectId}`;
              })()
            }
          />
        )}

        {/* Render QuizForm Component  */}
        <div className="bg-white w-full p-6  flex-1 ">
          {" "}
          <QuizForm examId={examId} />
        </div>
      </section>
    </>
  );
}
