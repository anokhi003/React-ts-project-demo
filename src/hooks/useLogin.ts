import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { apiRequest, ApiResponse } from "@/axios/useApi";
import { toast } from "sonner";
import { setUserData } from "@/redux/slices/supportSlice";
import { useDispatch } from "react-redux";

interface LoginFormInputs {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  phoneVerified: boolean;
  countryCode: string;
  isActive: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  roleId: string;
  permission: string[];
  __v: number;
  access_token: string;
}

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [customError, setCustomError] = useState<string>("");

  const { mutate, isPending } = useMutation<ApiResponse<User>, Error, LoginFormInputs>({
    mutationFn: async (loginData) => {
      return apiRequest<User>({
        url: "user/login",
        method: "POST",
        data: loginData,
        isApplicationJson: true,
      });
    },
    onSuccess: (response) => {
      if (response?.statusCode  === 200 && response.data) {
        localStorage.setItem("userToken", response.data.access_token);
        dispatch(setUserData(response.data));
        navigate("/"); // Redirect to dashboard or home
      } else {
        setCustomError(response.message || "Login failed");
      }
    },
    onError: (error: Error) => {
      setCustomError("Login failed. Please try again.");
    },
  });

  const handleLogin: SubmitHandler<LoginFormInputs> = (data) => {
    mutate(data);
  };

  return {
    customError,
    handleLogin,
    isPending,
    form,
  };
};

export default useLogin;
