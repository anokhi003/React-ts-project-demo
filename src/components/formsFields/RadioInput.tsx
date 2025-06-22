import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Label } from "../ui/label";

interface RadioInputProps {
  control: any;
  name: string;
  label: string;
  options: any;
  required: boolean;
  errorMessage: any;
  disabled: boolean;
}
export const RadioInput = ({
  control,
  name,
  label,
  options,
  required,
  errorMessage,
  disabled = false
}: RadioInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      rules={{
        required: required ? `${label} is required` : false,
      }}
      render={({ field }) => (
        <>
          <FormItem>
            {/* Label for the radio button group */}
            <Label className={`block mb-2`} >
              {label} {required && <span className="text-red-500">*</span>}
            </Label>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                disabled={disabled}
                className={`${errorMessage
                  ? "border-red-500 focus-visible:outline-none focus-visible:ring-offset-0 focus-visible:ring-0"
                  : ""
                  } focus:border-0 focus-visible:ring-1 focus-visible:ring-offset-0 focus:outline-none flex-1`}
                style={{ display: "flex", flexDirection: "row", gap: "16px" }}
              >
                {options?.map((option: any) => (
                  <FormItem
                    key={option.fieldId}
                    className="flex items-center space-x-3 space-y-0"
                  >
                    <FormControl>
                      <RadioGroupItem value={option.defaultCaption} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-medium text-primary cursor-pointer">
                        {option.defaultCaption}
                      </FormLabel>
                    </div>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
          <FormMessage />
        </>
      )}
    />
  );
};


export default RadioInput;