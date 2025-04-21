import { AsyncResponse } from "@/types";
import { AxiosError } from "axios";

export const asyncHandler = async <T>(
  asyncFn: () => Promise<T>
): Promise<AsyncResponse<T>> => {
  try {
    const data = await asyncFn();
    return {
      data,
      error: null,
      status: "success",
    };
  } catch (err: any) {
    const isAxiosError = err instanceof AxiosError;
    const errorMessage = isAxiosError
      ? err.response?.data?.message
      : err?.response?.data?.message;
    const error = errorMessage || err.message || "Something went wrong";
    throw new Error(error);
  }
};
