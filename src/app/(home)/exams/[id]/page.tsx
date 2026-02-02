import React from "react";
import Exams from "../_components/exam";

export const metadata = {
  title: "Exams Page - Subject",
};

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const { id } = params;
  if (!id) {
    return <div>No id found</div>;
  }
  return <Exams subjectId={id} />;
}
