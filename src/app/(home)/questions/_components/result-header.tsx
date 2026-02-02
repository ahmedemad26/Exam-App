import React from "react";

type ResultHeaderProps = {
  examTitle?: string;
  currentIndex: number;
  questionsLength: number;
};

export default function ResultHeader({
  examTitle = "Quiz",
  currentIndex,
  questionsLength,
}: ResultHeaderProps) {
  return (
    <header className="w-full font-mono text-gray-500 flex justify-between py-2 ">
      <h1>Frontend Development - {examTitle}</h1>
      <p aria-label={`Question ${currentIndex + 1} of ${questionsLength}`}>
        Question{" "}
        <span className="text-blue-600 font-bold">{currentIndex + 1}</span> of{" "}
        {questionsLength}
      </p>
    </header>
  );
}
