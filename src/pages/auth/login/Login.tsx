import { useEffect } from "react";
import { ReactSvgs } from "@/assets/svgs/ReactSvgs";
import AuthLayout from "@/layout/authLayout/AuthLayout";
import ModalLayout from "@/layout/modalLayout/ModalLayout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import useLogin from "@/hooks/useLogin";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { UseRenderFields } from "@/hooks/useRenderFields";
import { clearAllState, setUserData } from "@/redux/slices/supportSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/store";

interface LoginFormFields {
  fieldId: string;
  fieldName: string;
  fieldValueType: string;
  defaultCaption: string;
  isMandatory: boolean;
}

function Login() {
  const dispatch = useDispatch();
  const { customError, handleLogin, isPending, form } = useLogin();
  
  const userData = useSelector((state: RootState) => state.fields.userData);
  const {
    handleSubmit,
    formState: { errors },
  } = form as UseFormReturn<any>; // Use more specific type if you have one

  useEffect(() => {
    if (!userData) {
      localStorage.removeItem("userToken");
      dispatch(clearAllState());
    }
  }, [userData, dispatch]);

  const loginFormFields: LoginFormFields[] = [
    {
      fieldId: "1",
      fieldName: "email",
      fieldValueType: "EMAIL",
      defaultCaption: "Email",
      isMandatory: true,
    },
    {
      fieldId: "2",
      fieldName: "password",
      fieldValueType: "PASSWORD",
      defaultCaption: "Password",
      isMandatory: true,
    },
  ];

  return (
    <ModalLayout>
      <AuthLayout logo={ReactSvgs.login}>
        <AnimatePresence mode="sync">
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="md:max-w-[500px] w-full flex flex-col gap-3"
          >
            <FormProvider {...form}>
              <div className="flex flex-col gap-2">
                <h3 className="md:text-4xl text-3xl font-semibold text-start">
                  Welcome
                </h3>
                <p className="md:text-lg text-sm px-1 font-light text-start">
                  Enter your credentials to continue
                </p>
              </div>

              <div className="flex flex-col gap-2 space-y-1 px-1">
                {loginFormFields.map((item) => (
                  <UseRenderFields
                    key={item.fieldId}
                    item={item}
                    form={form}
                    errors={errors as any}
                  />
                ))}
              </div>

              {customError && (
                <p className="mt-1 text-red-500 text-xs">{customError}</p>
              )}

              <div className="py-5 border-b">
                <Button
                  className="w-full h-12 bg-main text-xl hover:bg-main/90"
                  onClick={handleSubmit(handleLogin)}
                  isLoading={isPending}
                >
                  Login
                </Button>
              </div>
            </FormProvider>
          </motion.div>
        </AnimatePresence>
      </AuthLayout>
    </ModalLayout>
  );
}

export default Login;
