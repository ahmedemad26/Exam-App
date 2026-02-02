import { ChevronDown } from "lucide-react";

// Empty state component
export function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-gray-100 dark:bg-gray-800 p-6">
                <ChevronDown className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                No diplomas available
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
                Check back later for new courses
            </p>
        </div>
    );
}