"use client";

import { getSubjects } from "@/lib/api/subjects/subject.api";
import { useInfiniteQuery } from "@tanstack/react-query";
export const useSubjects = () => {
  const {
    data: response,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    fetchNextPage,
  } = useInfiniteQuery({
    // Unique Key
    queryKey: ["subjects"],

    // Function that fetches data for each page
    queryFn: ({ pageParam = 1 }) => getSubjects(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (
        lastPage.metadata &&
        lastPage.metadata.currentPage === lastPage.metadata.numberOfPages
      ) {
        // Return undefined if no more pages available
        return undefined;
      }

      // Return the next page number, or undefined if metadata is missing
      return lastPage.metadata ? lastPage.metadata.currentPage + 1 : undefined;
    },
  });

  return {
    response,
    isLoading,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
};
