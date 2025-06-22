import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import axiosInstance from "./AxiosInterceptor";
import { toast } from "sonner";

interface ApiRequestParams {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: any;
  token?: string | undefined
  showToast?: boolean;
  isApplicationJson?: boolean;
}

interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  status?: number;
}

const apiRequest = async <T = any>({
  url,
  method,
  data,
  token,
  showToast = true,
  isApplicationJson = false,
}: ApiRequestParams): Promise<{ success: boolean; data?: T }> => {
  try {
    const headersProp = token ? { Authorization: `Bearer ${token}` } : {};
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance({
      url,
      method,
      data,
      headers: {
        "Content-Type": isApplicationJson
          ? "application/json"
          : "multipart/form-data",
        ...headersProp,
      },
    });

    console.log("🚀 ~ response:", response.data);

    if (response.data.success) {
      if (showToast) {
        toast.success(response.data.message || "Success");
      }
      return {
        success: true,
        data: response.data.data,
      };
    } else {
      if (response.status === 401) {
        localStorage.clear();
        toast.error(response.data.message || "Unauthorized");
      } else {
        toast.error(response.data.message || "Error occurred");
      }
      return {
        success: false,
        data: response.data.data,
      };
    }
  } catch (error) {
    console.log("🚀 ~ error:", error);

    const axiosError = error as AxiosError<ApiResponse>;

    let errorMsg = "Something went wrong!";

    if (axiosError.response) {
      if (axiosError.response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
        return { success: false }; // To satisfy return type
      }

      const responseData = axiosError.response.data;
      if (responseData && typeof responseData === "object") {
        errorMsg = responseData.message || errorMsg;
      }
    } else if (axiosError.message) {
      errorMsg = axiosError.message;
    }

    if (toast) {
      toast.error(errorMsg);
    }

    throw error;
  }
};

export default apiRequest;
