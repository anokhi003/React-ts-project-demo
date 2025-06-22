import axiosInstance from "@/axios/AxiosInterceptor";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

export interface ApiResponse<T = any> {
  data?: T;
  statusCode?: number;
  message?: string;
}

interface ApiRequestParams {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  token?: string;
  showToast?: boolean;
  isApplicationJson?: boolean;
}

export const apiRequest = async <T>({
  url,
  method,
  data,
  token,
  showToast = true,
  isApplicationJson = false,
}: ApiRequestParams): Promise<ApiResponse<T>> => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": isApplicationJson ? "application/json" : "multipart/form-data",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response: AxiosResponse = await axiosInstance({
      url,
      method,
      data,
      headers,
    });
    // Fix: Destructure from response.data instead of response
    const { statusCode, message, data: responseData } = response;
    
    if (statusCode === 200) {
      if (showToast) toast.success(message || "Success");
      return {
        statusCode,
        message,
        data: responseData
      };
    } else {
      if (statusCode === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      if (showToast) toast.error(message || "Error occurred");
      return {
        statusCode,
        message,
        data: responseData
      };
    }
  } catch (error) {
    console.log('error :>> ', error);
    const axiosError = error as AxiosError<any>;
    let errorMsg = "Something went wrong!";

    if (axiosError.response) {
      const { statusCode, data } = axiosError.response.data || {};
      if (statusCode === 401) {
        localStorage.clear();
        window.location.href = "/login";
      }
      errorMsg = data?.message || errorMsg;
    } else if (axiosError.message) {
      errorMsg = axiosError.message;
    }

    if (showToast) toast.error(errorMsg);
    throw error;
  }
};