import { JSON_HEADER } from "@/lib/constant/shared.constant";
import { GetSubjectsResponse } from "@/lib/types/subjects";

export const getSubjects = async (
  page: number = 1
): Promise<GetSubjectsResponse> => {
  const response = await fetch(`/api/subjects?page=${page}&limit=6`, {
    method: "GET",
    headers: {
      ...JSON_HEADER,
    },
    credentials: "include", // send cookies
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch subjects: ${response.statusText}`);
  }

  return response.json();
};
