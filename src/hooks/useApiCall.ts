import apiRequest from "@/axios/useApi";
import { useNavigate } from "react-router-dom";

export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiCallParams<T = any> {
  url: string;
  method: ApiMethod;
  data?: any;
  showToast?: boolean;
  isApplicationJson?: boolean;
  toast?: boolean;
  token?: string | undefined;
}

export interface ApiResponse<T = any> {
  data?:T;
  status?: number;
  statusCode?: number;
}

export const useApiCall = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken")||"";

  const callApi = async <T = any>(
    params: ApiCallParams
  ): Promise<ApiResponse<T> | null> => {
    const { url, method, data, showToast, isApplicationJson } = params;

    const response = await apiRequest({
      url,
      method,
      data,
      token,
      showToast,
      isApplicationJson,
    });

    if (response?.data?.statusCode === 401) {
      navigate("/login");
      return null;
    }

    return response;
  };

  return { callApi };
};