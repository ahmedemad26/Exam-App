"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type ExamsSkeletonProps = {
    rows?: number;
};

export default function ExamsSkeleton({ rows = 6 }: ExamsSkeletonProps) {
    return (
        <section className="flex flex-col gap-4 min-h-screen items-center">
            {/* Header  */}
            <div className="w-full">
                <div className="flex items-center gap-3 p-4">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </div>

            {/* Body */}
            <div className="bg-white w-full p-6 flex-1">
                {Array.from({ length: rows }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-row justify-between items-center p-4 bg-blue-50 font-mono mt-1"
                    >
                        {/* left side */}
                        <div className="text-[12px] sm:text-base flex flex-col gap-1">
                            <Skeleton className="h-4 w-40 sm:w-56" />
                            <Skeleton className="h-3 w-32 sm:w-40" />
                        </div>

                        {/* right side */}
                        <div className="flex items-center gap-2 text-[12px] sm:text-base">
                            <Skeleton className="h-3 w-3 sm:h-6 sm:w-6 rounded" />
                            <Skeleton className="h-3 w-28 sm:h-4 sm:w-36" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
