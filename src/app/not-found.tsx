"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
    const pathname = usePathname();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Animated Icon */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-blue-500/20 dark:bg-amber-500/10 rounded-full animate-pulse" />
                    </div>
                    <div className="relative flex items-center justify-center">
                        <AlertTriangle className="w-24 h-24 text-blue-500 animate-bounce" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Title */}
                <div className="space-y-3">
                    <h1 className="text-8xl font-bold text-slate-900 dark:text-slate-100 tracking-tighter">
                        404
                    </h1>
                    <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
                        Page Not Found
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                        Oops! The page{" "}
                        {pathname && (
                            <span className="inline-block px-2 py-1 bg-slate-200/70 dark:bg-slate-800/70 rounded">
                                <code className="text-sm font-mono text-blue-600 dark:text-blue-400">
                                    {pathname}
                                </code>
                            </span>
                        )}{" "}
                        you are looking for does not exist. It might have been moved or deleted.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                        <Link href="/diplomas">
                            Go Back Home
                        </Link>
                    </Button>
                </div>

                {/* Decorative Element */}
                <div className="pt-8 opacity-50">
                    <p className="text-sm text-slate-500 dark:text-slate-600">
                        Error Code: 404 • Not Found
                    </p>
                </div>
            </div>
        </div>
    );
}