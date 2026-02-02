import React from "react";
import Questions from "../../../../../questions/_components/questions";

export const metadata = {
  title: "Questions",
};

interface PageProps {
  params: Promise<{ id: string; examId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { examId } = await params;
  if (!examId) {
    return <div>No exam id found</div>;
  }
  return <Questions examId={examId} basePath="/diplomas/exams" />;
}
