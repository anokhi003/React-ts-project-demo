import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control, FieldValues, Path } from "react-hook-form";

interface CheckboxInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  isLabelDisplay?: boolean;
}

const CheckboxInput = <T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  disabled = false,
  isLabelDisplay = true,
}: CheckboxInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field }) => (
        <>
          <FormItem
            className={`flex gap-2 ${isLabelDisplay ? "items-center" : ""} space-y-0`}
          >
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={disabled}
              />
            </FormControl>
            {isLabelDisplay && (
              <div className="space-y-1 leading-none">
                <FormLabel className="block text-sm font-medium text-primary cursor-pointer">
                  {label} {required && <span className="text-red-500">*</span>}
                </FormLabel>
              </div>
            )}
          </FormItem>
          <FormMessage />
        </>
      )}
    />
  );
};

export default CheckboxInput;
