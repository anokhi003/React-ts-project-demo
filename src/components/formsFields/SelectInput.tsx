import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Control, FieldValues, Path } from "react-hook-form";

type OptionType = {
  label: string;
  value: string | number;
};

interface SelectInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  options: OptionType[];
  errorMessage?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  isLabelDisplay?: boolean;
  handleChange?: (value: string) => void;
  className?: string;
}

function SelectInput<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  placeholder = "Select",
  options = [],
  errorMessage,
  disabled = false,
  defaultValue,
  isLabelDisplay = true,
  handleChange,
  className,
}: SelectInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field }) => (
        <FormItem>
          {isLabelDisplay && (
            <FormLabel className={`block mb-1 ${className}`}>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              handleChange?.(value);
            }}
            value={String(defaultValue ?? field.value)}
            disabled={
              name === "freight.0.chargeId" && field.value === "CM-1"
                ? true
                : disabled
            }
          >
            <FormControl>
              <SelectTrigger
                className={`border ${errorMessage
                    ? "border-red-500 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-0"
                    : "border-input"
                  } focus-visible:ring-1 focus-visible:ring-offset-0 focus:outline-none flex-1 ${field.value ? "text-primary" : "text-muted-foreground"
                  } `}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options?.length > 0 ? (
                options.map((item) => (
                  <SelectItem key={item.value} value={String(item.value)}>
                    {item.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled value="No Options">
                  No Options
                </SelectItem>
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SelectInput;
