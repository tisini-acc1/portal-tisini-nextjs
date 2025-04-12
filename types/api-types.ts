export type SuccessResponse<T> = {
  success: true;
  data: T;
};

export type ErrorResponse = {
  success: false;
  data: string;
};

export type Response<T> = SuccessResponse<T> | ErrorResponse;

// types/api.ts
export interface ApiError extends Error {
  response?: {
    status: number;
    data: {
      message?: string;
      [key: string]: any;
    };
  };
  request?: any;
  config?: any;
  isAxiosError?: boolean;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}
