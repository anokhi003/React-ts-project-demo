import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Validations } from "@/lib/utils";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface PasswordInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  errorMessage?: any;
  disabled?: boolean;
  isLabelDisplay?: boolean;
}

const PasswordInput = ({
  control,
  name,
  label,
  placeholder,
  required = false,
  errorMessage,
  disabled,
  isLabelDisplay = true,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      rules={{
        required: required ? `${label} is required` : false,
        pattern: {
          value: Validations.password,
          message:
            "Password must be 8 characters with lowercase, number, and special character.",
        },
      }}
      render={({ field }) => (
        <FormItem>
          {isLabelDisplay && (
            <Label className="block mb-1">
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
          )}
          <FormControl>
            <div className="relative p-[1px]" >
              <Input
                {...field}
                value={field.value ?? ""}
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                disabled={disabled}
                className={`lg:h-12 h-10 pr-12 ${
                  errorMessage
                    ? "border-red-500 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-0"
                    : ""
                } ring-offset-background focus:border-1 focus-visible:ring-1 focus-visible:ring-offset-0 focus:outline-none`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" strokeWidth={1.5} />
                ) : (
                  <Eye className="h-5 w-5" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PasswordInput;
