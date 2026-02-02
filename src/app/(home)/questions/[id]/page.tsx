import React from "react";
import Questions from "../_components/questions";

export const metadata = {
  title: "Questions",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <Questions examId={id} />;
}
