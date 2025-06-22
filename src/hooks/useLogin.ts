import { useState } from "react";
import { useApiCall } from "./useApiCall";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  data: any;
  mobileNumber?: string;
}

const useLogin = () => {
  const { callApi } = useApiCall();
  const navigate = useNavigate();
const [ isPending, setIsPending ] = useState(false);
  const form = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [customError, setCustomError] = useState<string>("");

  // const handleLoginApi = async (formData: LoginFormInputs): Promise<ApiResponse> => {
  //   const response = await callApi({
  //     url: "/Account/SignIn",
  //     method: "POST",
  //     data: { ...formData },
  //   });
  //   return { success: response?.success, data: response?.data, mobileNumber: response?.mobileNumber };
  // };

  // const { mutate, isLoading: isPending } = useMutation(handleLoginApi, {
  //   onSuccess: (data) => {
  //     if (data?.success) {
  //       localStorage.setItem(
  //         "userData",
  //         JSON.stringify({ mode: "login", phone: data?.mobileNumber })
  //       );
  //       navigate("/");
  //     } else {
  //       setCustomError("Login failed");
  //     }
  //   },
  //   onError: (error: unknown) => {
  //     setCustomError("Login failed. Please try again.");
  //   },
  // });

  const handleLogin: SubmitHandler<LoginFormInputs> = (data) => {
    setCustomError(""); // reset error on new submit
    // mutate(data);
  };

  return {
    customError,
    handleLogin,
    isPending,
    form,
  };
};

export default useLogin;
