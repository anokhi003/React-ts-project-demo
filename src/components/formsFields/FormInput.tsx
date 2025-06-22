import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  errorMessage?: string;
  pattern?: RegisterOptions["pattern"];
  disabled?: boolean;
  isLabelDisplay?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "",
  type = "text",
  required = false,
  errorMessage,
  pattern,
  disabled = false,
  isLabelDisplay = true,
  handleChange = () => {},
  className = "",
}: FormInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      rules={{
        required: required ? `${label} is required` : false,
        pattern,
      }}
      render={({ field }) => (
        <FormItem>
          {isLabelDisplay && (
            <Label className={`block mb-1 ${className}`}>
              {label}
              {required && <span className="text-red-500">*</span>}
            </Label>
          )}
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                placeholder={placeholder}
                min={0}
                type={type === "password" && showPassword ? "text" : type}
                value={field.value || ""}
                disabled={disabled}
                className={`w-full ${
                  errorMessage
                    ? "border-red-500 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-0"
                    : ""
                } focus:border-0 focus-visible:ring-1 focus-visible:ring-offset-0 focus:outline-none flex-1`}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange(e);
                }}
                autoComplete="off"
              />
              {type === "password" && (
                <Button
                  variant="link"
                  size="sm"
                  type="button"
                  className="absolute inset-y-1 right-2 flex items-center text-primary p-0"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-primary" />
                  ) : (
                    <Eye size={20} className="text-primary" />
                  )}
                </Button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
