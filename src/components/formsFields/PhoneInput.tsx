import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Validations } from "@/lib/utils";

interface PhoneInputProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  isLabelDisplay?: boolean
}
const PhoneInput = ({
  control,
  name,
  label,
  placeholder,
  required = false,
  errorMessage,
  disabled,
  isLabelDisplay = true
}:PhoneInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={{
        required: required ? `${label} is required` : false,
        pattern: {
          value: Validations.phoneWithoutPrefix,
          message: "Please enter a valid Indian mobile number",
        },
      }}
      render={({ field }) => {
        return (
          <FormItem>
            {
              isLabelDisplay && (
                <FormLabel className="block mb-1">
                  {label} {required && <span className="text-red-500">*</span>}
                </FormLabel>
              )
            }
            <FormControl>
            <div
                className={`flex items-center overflow-hidden rounded-xl border border-input focus-within:border-ring ${
                  errorMessage ? "border-red-500" : ""
                } lg:h-12 h-10`}
              >
                {/* Phone number input */}
                <Input
                  {...field}
                  type="tel"
                  placeholder={placeholder}
                  className="flex-1 h-full px-3 border-0 focus:outline-none focus-visible:ring-0 lg:rounded-none rounded-none"
                  onChange={(e) => {
                    // Allow only digits and limit to 10 characters
                    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                    // Update the field value with "91" as prefix
                    field.onChange(value);
                  }}
                  value={field.value}
                  disabled={disabled}
                />
              </div>
            </FormControl>
            <FormMessage>{errorMessage}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};

export default PhoneInput;
