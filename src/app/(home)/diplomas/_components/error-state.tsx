interface ErrorStateProps {
    error: Error | unknown;
}

// Error state component
export function ErrorState({ error }: ErrorStateProps) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h2 className="mb-2 text-xl font-semibold text-red-600">
                    Failed to load diplomas
                </h2>
                <p className="text-sm text-gray-600">
                    {error instanceof Error ? error.message : "Something went wrong"}
                </p>
            </div>
        </div>
    );
}

ErrorState.displayName = "ErrorState";