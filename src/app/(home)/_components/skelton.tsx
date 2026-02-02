import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/tailwind-cn";

type SkeletonGridProps = {
    cols?: 1 | 2 | 3 | 4;
    count?: number;
    choices?: number;
};

const colsClass: Record<NonNullable<SkeletonGridProps["cols"]>, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
};

export function ExamQuestionSkeleton({
    cols = 3,
    count = 6,
    choices = 4,
}: SkeletonGridProps) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-6",
                colsClass[cols]
            )}
        >
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={cn(
                        "relative overflow-hidden",
                        "space-y-5 p-6 border rounded-2xl bg-background shadow-sm w-full"
                    )}
                >
                    {/* subtle shimmer overlay */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-muted/40 to-transparent" />

                    {/* Header row: badge + time */}
                    <div className="flex items-center justify-between gap-3">
                        <Skeleton className="h-5 w-20 rounded-full" />
                        <Skeleton className="h-4 w-16 rounded-full" />
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-5/6" />
                        <Skeleton className="h-5 w-2/3" />
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                        {Array.from({ length: choices }).map((_, j) => (
                            <div key={j} className="flex items-center gap-3">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        ))}
                    </div>

                    {/* Footer actions */}
                    <div className="flex items-center justify-between pt-1">
                        <Skeleton className="h-9 w-28 rounded-xl" />
                        <Skeleton className="h-9 w-9 rounded-xl" />
                    </div>
                </div>
            ))}

            {/* shimmer keyframes (Tailwind arbitrary animation needs this) */}
            <div className="animate-[shimmer_1.6s_infinite]" />
        </div>
    );
}
