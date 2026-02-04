"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuizResultResponse } from "@/lib/types/result";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import ResultHeader from "./result-header";
import FooterBtnResult from "./footer-btn-result";

// Props
type Props = {
  result: QuizResultResponse;
  examTitle?: string;
  questionsLength?: number;
};

export default function ResultView({
  result,
  examTitle = "Quiz",
  questionsLength,
}: Props) {

  // Variables
  const total = questionsLength ?? result.correct + result.wrong;
  const COLORS = ["#00BC7D", "#EF4444"];
  const data = [
    { name: "Correct", value: result.correct },
    { name: "Wrong", value: result.wrong },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress Bar */}
      <div className="w-full px-4 sm:px-6">

        {/* Header */}
        <ResultHeader
          examTitle={examTitle}
          currentIndex={total - 1}
          questionsLength={total}
        />

        {/* Progress bar */}
        <Progress value={100} className="h-3.5 rounded-none max-w-full" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section: Pie Chart */}
          <div className="lg:w-1/3">
            <Card className="border-none shadow-none">
              <CardContent className="flex flex-col items-center justify-center p-6">
                {/* Pie Chart - explicit size avoids Recharts "width/height -1" warning */}
                <div className="w-[200px] h-[200px] min-w-[200px] min-h-[200px] mb-6">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={data}
                        innerRadius={60}
                        outerRadius={100}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {data.map((entry, i) => (
                          <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-emerald-500 rounded-sm" />
                    <span className="text-sm font-medium">Correct: {result.correct}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 bg-red-500 rounded-sm" />
                    <span className="text-sm font-medium">Incorrect: {result.wrong}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section: Questions List - scroll with fade edges */}
          <div className="flex-1 relative bg-white border rounded-lg max-h-[600px]">
            {/* Top fade - subtle grey like scroll hint */}
            <div
              className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-100/90 to-transparent z-10 pointer-events-none rounded-t-lg"
              aria-hidden
            />
            {/* Scrollable content */}
            <div className="answers-scroll overflow-y-auto max-h-[600px] p-6 pt-8 pb-8">
              <div className="space-y-6">
                {/* Wrong Questions */}
                {result.WrongQuestions.map((question) => (
                  <div key={question.QID} className="space-y-4">
                    <h3 className="text-lg font-medium text-blue-600">
                      {question.Question}
                    </h3>

                    <div className="space-y-3">
                      {/* Wrong Answer */}
                      <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                        <div className="relative flex-shrink-0">
                          <div className="w-5 h-5 rounded-full border-2 border-red-500 bg-red-500">
                            <div className="absolute inset-1 bg-white rounded-full" />
                          </div>
                        </div>
                        <span className="text-gray-700">
                          {question.answers[
                            question.inCorrectAnswer as keyof typeof question.answers
                          ] || question.inCorrectAnswer}
                        </span>
                      </div>

                      {/* Correct Answer */}
                      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                        <div className="relative flex-shrink-0">
                          <div className="w-5 h-5 rounded-full border-2 border-green-500 bg-green-500">
                            <div className="absolute inset-1 bg-white rounded-full" />
                          </div>
                        </div>
                        <span className="text-gray-700">
                          {question.answers[
                            question.correctAnswer as keyof typeof question.answers
                          ] || question.correctAnswer}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Correct Questions */}
                {result.correctQuestions.map((question) => (
                  <div key={question.QID} className="space-y-4">
                    <h3 className="text-lg font-medium text-blue-600">
                      {question.Question}
                    </h3>

                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <div className="relative flex-shrink-0">
                        <div className="w-5 h-5 rounded-full border-2 border-green-500 bg-green-500">
                          <div className="absolute inset-1 bg-white rounded-full" />
                        </div>
                      </div>
                      <span className="text-gray-700">
                        {question.answers[
                          question.correctAnswer as keyof typeof question.answers
                        ] || question.correctAnswer}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-100/90 to-transparent z-10 pointer-events-none rounded-b-lg"
              aria-hidden
            />
            
          </div>
        </div>
      </div>

      {/* Footer Buttons */} 
      <FooterBtnResult />
    </div>
  );
}