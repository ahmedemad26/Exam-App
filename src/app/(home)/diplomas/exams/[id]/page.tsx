import React from "react";
import Exams from "../../../exams/_components/exam";

export const metadata = {
  title: "Exams Page - Subject",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  if (!id) {
    return <div>No id found</div>;
  }
  return <Exams subjectId={id} basePath="/diplomas/exams" />;
}
