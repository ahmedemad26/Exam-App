"use client";

import Link from "next/link";
import Image from "next/image";
import { useSubjects } from "../_hooks/use-subject";
import dynamic from "next/dynamic";
import { GetSubjectsResponse } from "@/lib/types/subjects";
import { ExamQuestionSkeleton } from "../../_components/skelton";
import { EmptyState } from "./empty-state";
import { LoadingIndicator } from "./loading";
import { ErrorState } from "./error-state";


// Dynamic import for InfiniteScroll
const InfiniteScroll = dynamic(
  () => import("react-infinite-scroll-component"),
  { ssr: false }
);

export function SubjectCard() {
  const {
    response,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error,
  } = useSubjects();

  // Flatten all subjects from paginated data
  const subjects =
    response?.pages?.flatMap((page: GetSubjectsResponse) => page.subjects) ??
    [];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-start justify-center pt-20">
        <ExamQuestionSkeleton />
      </div>
    );
  }

  // Error state
  // Error state
  if (error) {
    return <ErrorState error={error} />;
  }

  // Empty state
  if (subjects.length === 0) {
    return <EmptyState />;
  }

  // Main render
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <InfiniteScroll
        dataLength={subjects.length}
        scrollableTarget="main-scroll"
        scrollThreshold={0.9}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<LoadingIndicator isLoading={isFetchingNextPage} />}
        endMessage={
          <p className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            You have reached the end
          </p>
        }
      >
        {/* Subjects Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {subjects.map((subject) => (
            <Link
              key={subject._id}
              href={`/diplomas/exams/${subject._id}`}
              className="group block w-full"
              aria-label={`View ${subject.name} course`}
            >
              <article className="relative h-64 sm:h-80 md:h-96 overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
                {/* Subject Image */}
                <Image
                  src={subject.icon}
                  alt={subject.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={false}
                  quality={85}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Subject Name */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                  <h3 className="text-white font-semibold text-lg sm:text-xl md:text-2xl line-clamp-2 drop-shadow-lg">
                    {subject.name}
                  </h3>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </section>
  );
}

SubjectCard.displayName = "SubjectCard";