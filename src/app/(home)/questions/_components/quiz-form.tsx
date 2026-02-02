"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Question } from "@/lib/types/questions";
import { Progress } from "@/components/ui/progress";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useResult } from "../_hooks/use-result";
import { useQuestions } from "../_hooks/use-question";
import ResultView from "./result";

// Component Props
interface QuizFormProps {
    examId: string;
}

 
// Answer payload type
export type AnswerPayload = {
    questionId: string;
    correct?: string;
};


// Form values type
export type FormValues = {
    answers: AnswerPayload[];
    time?: number;
};

// QuizForm Component
export default function QuizForm({ examId }: QuizFormProps) {
    // States
    // State to control when to show results instead of quiz form
    const [showResult, setShowResult] = useState(false);
    // Track current question index for pagination
    const [currentIndex, setCurrentIndex] = useState(0);

    // Mutation
    // Custom hook for handling quiz submission and result fetching
    const { mutate, resultData, isSuccess, isPending } = useResult();
    // Custom hook to fetch questions for the specific exam
    const { payload, error } = useQuestions(examId);

    // Questions (memoized for stable useMemo/useEffect deps)
    const questions = useMemo<Question[]>(
        () => payload?.questions ?? [],
        [payload?.questions]
    );
    // Calculate progress percentage for progress bar
    const progress = ((currentIndex + 1) / (questions.length || 1)) * 100;
    // Timer configuration
    const MINUTES = 20;
    const TOTAL_SECONDS = MINUTES * 60;
    // Get current question and check if it's the last one
    const currentQuestion = questions[currentIndex];
    const isLast = currentIndex === questions.length - 1;

    // Use ref to store remaining time without causing re-renders
    const remainingRef = useRef<number>(TOTAL_SECONDS);

    // Form  values
    const defaultValues = useMemo<FormValues>(() => {
        return {
            answers: questions.map((q) => ({
                questionId: q._id,
                correct: undefined, // Initially no answer selected
            })),
            time: undefined,
        };
    }, [questions]);

    // Initialize react-hook-form
    const form = useForm<FormValues>({
        defaultValues,
        mode: "onChange",
        shouldUnregister: false, // Keep field values when components unmount
    });

    // Function to handle time up
    const handleTimeUp = () => {
        // Calculate time spent from remaining time
        const remaining = remainingRef.current ?? 0;
        const timeSpent = Math.max(0, TOTAL_SECONDS - remaining);

        // Set the time value in form and submit
        form.setValue("time", timeSpent);
        form.handleSubmit(onSubmit)();
    };

    // Function which returns format time into M:S (Minutes:Seconds)
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60)
            .toString()
            .padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    // Function to submit the form
    const onSubmit: SubmitHandler<FormValues> = (values) => {
        if (typeof values.time === "undefined") {
            // Calculate time spent
            const remaining = remainingRef.current ?? TOTAL_SECONDS;
            values.time = Math.max(0, TOTAL_SECONDS - remaining);
        }

        // Keep questionId for all questions, add correct answer only if provided
        const transformedAnswers = values.answers.map((a) => {
            if (a.correct && a.correct !== "") {
                return { questionId: a.questionId, correct: a.correct };
            }
            return { questionId: a.questionId }; // Unanswered question
        });

        // Final payload
        const payload = {
            ...values,
            answers: transformedAnswers,
        };

        //Submit to backend
        mutate(payload);
    };

    // Effect to show results when submission is successful
    useEffect(() => {
        if (isSuccess && resultData) {
            setShowResult(true);
        }
    }, [isSuccess, resultData]);

    // Reset form with new defaults when questions are loaded
    useEffect(() => {
        if (questions.length) {
            form.reset(defaultValues);
        }
    }, [questions, defaultValues, form]);

    // Handle error state when questions fail to load
    if (error) return <p>Error loading questions.</p>;

    // Handle case when no questions are available
    if (!questions.length) return <p>No questions found.</p>;

    // Show results page when quiz is completed
    if (showResult && resultData) {
        return (
            <ResultView
                result={resultData}
                examTitle={questions[0]?.exam?.title}
                questionsLength={questions.length}
            />
        );
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 border-none"
                role="form"
                aria-label="Quiz question form"
            >
                {/* Question Card */}
                <Card key={currentQuestion._id} className="border-none shadow-none">
                    {/* Header */}
                    <header className="w-full font-mono  text-gray-500 flex justify-between px-4 sm:px-6 ">
                        <p>Frontend Development - {questions[0].exam?.title}</p>
                        <p>
                            Question{" "}
                            <span className="text-blue-600 font-bold">
                                {currentIndex + 1}
                            </span>{" "}
                            of {questions.length}
                        </p>
                    </header>

                    {/* Progress bar */}
                    <div className="w-full px-4 sm:px-6 mb-6">
                        <Progress
                            key={`progress-${currentIndex}`}
                            value={progress}
                            className="w-full rounded-none h-5 transition-[width] duration-500 ease-in-out max-w-full"
                        />
                    </div>

                    <div className="w-full px-4 sm:px-6">
                        <CardContent className="space-y-4 p-0 m-0">
                            {/* Question and Answers Form Field */}
                            <FormField
                            control={form.control}
                            name={`answers.${currentIndex}.correct` as const}
                            render={({ field }) => (
                                <FormItem>
                                    {/* Question */}
                                    <FormLabel className="font-mono text-[24px] font-semibold text-blue-600">
                                        {currentQuestion.question}
                                    </FormLabel>

                                    <FormControl>
                                        {/* Radio group for answer options */}
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            value={field.value ?? ""}
                                        >
                                            {/* Map of answers which in current question */}
                                            {currentQuestion.answers.map((ans) => (
                                                <FormItem
                                                    key={ans.key}
                                                    className="flex items-center bg-gray-50 hover:bg-gray-100 p-4 space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <RadioGroupItem value={ans.key} />
                                                    </FormControl>

                                                    {/* Answers */}
                                                    <FormLabel className="font-mono text-gray-800 text-sm cursor-pointer w-full">
                                                        {ans.answer}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        </CardContent>
                    </div>
                </Card>

                {/* Buttons */}
                <div className="w-full px-4 sm:px-6">
                    <div className="flex justify-evenly items-center gap-4">
                    {/* Previous Button */}
                    <Button
                        className="w-1/2"
                        type="button"
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex((i) => i - 1)}
                    >
                      <ChevronLeft className="w-4 h-4" />  Previous 
                    </Button>

                    {/* Countdown Timer */}
                    <div className="flex items-center justify-center">
                        <CountdownCircleTimer
                            isPlaying // Start timer immediately
                            duration={TOTAL_SECONDS}
                            colors={["#3b82f6", "#f59e0b", "#ef4444"]}
                            colorsTime={[TOTAL_SECONDS, 60, 0]} // Color change thresholds
                            onComplete={() => {
                                handleTimeUp(); // Auto-submit when time runs out
                                return { shouldRepeat: false, delay: 0 };
                            }}
                            size={80}
                        >
                            {({ remainingTime }) => {
                                // Update ref without causing re-render
                                remainingRef.current = remainingTime;
                                return (
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <span className="text-base font-mono font-semibold">
                                            {formatTime(remainingTime)}
                                        </span>
                                    </div>
                                );
                            }}
                        </CountdownCircleTimer>
                    </div>

                    {/* Next/Submit Button*/}
                    {isLast ? (
                        <Button
                            className="w-1/2 "
                            type="submit"
                            disabled={
                                !form.watch(`answers.${currentIndex}.correct`) || isPending
                            }
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    ) : (
                        <Button
                            className="w-1/2 "
                            type="button"
                            onClick={() => setCurrentIndex((i) => i + 1)}
                            disabled={!form.watch(`answers.${currentIndex}.correct`)} // Require answer to proceed
                        >
                            Next <ChevronRight className="w-4 h-4" />
                        </Button>
                    )}
                    </div>
                </div>
            </form>
        </Form>
    );
}
