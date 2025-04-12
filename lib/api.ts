import { ApiError, ApiResponse } from "@/types/api-types";
import axios from "axios";

const handleApiError = (error: unknown) => {
  console.error("API Error:", error);

  if (typeof error === "object" && error !== null) {
    const err = error as ApiError;

    if (err.response) {
      throw new Error(
        err.response.data?.message || `API Error: ${err.response.status}`
      );
    } else if (err.request) {
      throw new Error("No response received from server");
    }
  }

  if (error instanceof Error) {
    throw new Error(error.message || "Error setting up API request");
  }

  throw new Error("Unknown API error occurred");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiPost = async <T = any>(data: unknown): Promise<T> => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_HOST;
    if (!baseURL) throw new Error("API host not configured");

    const res = await axios.post<ApiResponse<T>>(baseURL, data);

    if (res.status !== 200) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return res.data.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const apiGet = async () => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_HOST;

    const res = await axios.get(baseURL!);

    if (res.status !== 200) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return res.data;
  } catch (error) {
    handleApiError(error);
  }
};
