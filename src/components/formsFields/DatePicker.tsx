import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Label } from "../ui/label";
import { useState } from "react";
import { format } from "date-fns";
import {
  Control,
  FieldValues,
  Path,
} from "react-hook-form";

interface DatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  isLabelDisplay?: boolean;
}

function DatePicker<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select date",
  required = false,
  errorMessage,
  disabled = false,
  isLabelDisplay = true,
}: DatePickerProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      rules={{
        required: required ? `${label} is required` : false,
      }}
      render={({ field }) => {
        const selectedDate = field.value ? new Date(field.value) : null;

        return (
          <FormItem>
            {isLabelDisplay && (
              <Label className="block mb-1">
                {label}
                {required && <span className="text-red-500"> *</span>}
              </Label>
            )}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <div className={disabled ? "hover:cursor-not-allowed" : ""}>
                    <Button
                      type="button"
                      disabled={disabled}
                      variant="outline"
                      className={`w-full justify-start text-left font-normal border ${
                        errorMessage ? "border-red-500" : ""
                      }`}
                      onClick={() => setOpen((prev) => !prev)}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "dd/MM/yyyy")
                      ) : (
                        <span className="text-muted-foreground">
                          {placeholder}
                        </span>
                      )}
                    </Button>
                  </div>
                </FormControl>
              </PopoverTrigger>
              {!disabled && (
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate ?? undefined}
                    onSelect={(date) => {
                      if (date) {
                        const cleanDate = new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          date.getDate()
                        );
                        field.onChange(cleanDate);
                      }
                      setOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              )}
            </Popover>
            <FormMessage>{errorMessage}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
}

export default DatePicker;
