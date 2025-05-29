export interface DocStoryResponseBody<T> {
  code: number;
  message: string;
  data: T | null;
}

export type UUID = string;