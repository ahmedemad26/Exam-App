export interface Subject {
  _id: string;
  name: string;
  icon: string; // URL string
  createdAt: string; // ISO 8601 date string format
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface GetSubjectsResponse {
  message: "success" | string; // usually "success"
  metadata: Metadata;
  subjects: Subject[];
}