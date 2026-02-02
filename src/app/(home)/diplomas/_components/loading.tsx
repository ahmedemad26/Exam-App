import { ChevronDown } from "lucide-react";

interface LoadingIndicatorProps {
    isLoading: boolean;
}

// Loading indicator component
export function LoadingIndicator({ isLoading }: LoadingIndicatorProps) {
    return (
        <div className="flex flex-col items-center justify-center py-6 text-sm text-gray-600 dark:text-gray-400">
            <span className="mb-2">
                {isLoading ? "Loading more diplomas..." : "Scroll to view more"}
            </span>
            <ChevronDown
                className={`h-5 w-5 ${isLoading ? "animate-bounce" : "animate-pulse"}`}
                aria-hidden="true"
            />
        </div>
    );
}