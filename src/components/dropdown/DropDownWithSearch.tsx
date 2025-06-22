import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { cn } from "@/lib/utils";
import { Control, FieldValues, Path } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useTheme } from "@/lib/contexts/theme-provider";

type OptionType = {
  value: string | number;
  label: string | number;
};

interface DropDownWithSearchProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  options: OptionType[];
  placeholder?: string;
  emptyText?: string;
  buttonWidth?: string;
  errorMessage?: string;
  disabled?: boolean;
  isLabelDisplay?: boolean;
  handleChange?: (value: string | number) => void;
  className?: string;
}

function DropDownWithSearch<T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  options = [],
  placeholder = "Select an option...",
  emptyText = "No options found.",
  buttonWidth = "100%",
  errorMessage,
  disabled = false,
  isLabelDisplay = true,
  handleChange,
  className,
}: DropDownWithSearchProps<T>) {
  const [open, setOpen] = React.useState(false);
 const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const commandListRef = React.useRef<HTMLDivElement>(null);

  const handleWheel = (event: React.WheelEvent) => {
    const list = commandListRef.current;
    if (!list) return;

    const { scrollTop, scrollHeight, clientHeight } = list;
    const isScrollable = scrollHeight > clientHeight;
    if (!isScrollable) return;

    const isScrollingUp = event.deltaY < 0;
    const isScrollingDown = event.deltaY > 0;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight === scrollHeight;

    if ((isScrollingUp && isAtTop) || (isScrollingDown && isAtBottom)) {
      return;
    }

    event.stopPropagation();
  };

  const buttonStyles: React.CSSProperties = {
    width: buttonWidth,
    backgroundColor: isDarkMode ? "" : "hsl(210, 100%, 98.8%)",
    color: isDarkMode
      ? "hsl(0 0% 67%)"
      : label
      ? "hsl(0 0% 35%)"
      : "hsl(204, 100%, 33.3%)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 1rem",
  };

  const popoverStyles: React.CSSProperties = {
    backgroundColor: isDarkMode ? "hsl(0 0% 30%)" : "hsl(0, 0%, 98%)",
    color: isDarkMode
      ? "hsl(0 0% 78%)"
      : label
      ? "hsl(0 0% 35%)"
      : "hsl(204, 100%, 33.3%)",
    width: "100%",
  };

  const commandItemStyles: React.CSSProperties = {
    color: isDarkMode
      ? "hsl(0 0% 78%)"
      : label
      ? "hsl(0 0% 35%)"
      : "hsl(204, 100%, 33.3%)",
  };

  return (
    <FormField
      control={control}
      name={name}
      rules={{ required: required ? `${label} is required` : false }}
      render={({ field }) => (
        <FormItem className="w-full">
          {isLabelDisplay && (
            <FormLabel className={`block mb-1 ${className}`}>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Popover open={!disabled && open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  disabled={disabled}
                  className={cn(
                    "justify-between border shadow-sm w-full",
                    errorMessage
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-input",
                    field.value ? "text-primary" : "text-muted-foreground",
                    disabled && "opacity-50 cursor-not-allowed"
                  )}
                  style={buttonStyles}
                >
                  <span
                    className={cn(
                      field.value && label ? "text-primary" : "",
                      "truncate"
                    )}
                  >
                    {field.value
                      ? options.find((option) => option.value === field.value)
                          ?.label
                      : placeholder}
                  </span>
                  <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="p-0 w-[var(--radix-popover-trigger-width)]"
                style={popoverStyles}
                align="start"
              >
                <Command className="max-h-[500px]">
                  <CommandInput
                    placeholder="Search..."
                    className="h-9 sticky top-0"
                    style={commandItemStyles}
                  />
                  <CommandList
                    ref={commandListRef}
                    className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
                    onWheel={handleWheel}
                  >
                    <CommandEmpty style={commandItemStyles}>
                      {emptyText}
                    </CommandEmpty>
                    <CommandGroup>
                      {options.map((option: any) => (
                        <CommandItem
                          key={option.value}
                          value={option.label as any}
                          onSelect={() => {
                            field.onChange(option.value);
                            handleChange?.(option.value);
                            setOpen(false);
                          }}
                          style={commandItemStyles}
                          className="cursor-pointer"
                        >
                          {option.label}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              field.value === option.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                            style={commandItemStyles}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DropDownWithSearch;
