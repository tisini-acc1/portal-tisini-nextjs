// lib/api.ts
import axios from "axios";

const handleApiError = (error: any) => {
  console.error("API Error:", error);
  if (error.response) {
    // The request was made and the server responded with a status code
    throw new Error(
      error.response.data.message || `API Error: ${error.response.status}`
    );
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error("No response received from server");
  } else {
    // Something happened in setting up the request
    throw new Error(error.message || "Error setting up API request");
  }
};

export const apiPost = async (data: any) => {
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_HOST;

    const res = await axios.post(baseURL!, data);

    if (res.status !== 200) {
      throw new Error(`Request failed with status ${res.status}`);
    }

    return res.data;
  } catch (error) {
    handleApiError(error);
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
