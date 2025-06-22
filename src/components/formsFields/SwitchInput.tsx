import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
    FormLabel,
} from "../ui/form";
import * as Switch from "@radix-ui/react-switch";
import { Label } from "../ui/label";

interface SwitchInputProps {
    control: any;
    name: string;
    label: string;
    required?: boolean;
    disabled?: boolean;
}
const SwitchInput = ({ control, name, label, required = false, disabled = false }: SwitchInputProps) => {
    return (
        <FormField
            control={control}
            name={name}
            rules={{ required: required ? `${label} is required` : false }}
            render={({ field }) => (
                <FormItem className="flex items-center justify-between space-x-4">
                    <Label htmlFor={name}>
                        {label} {required && <span className="text-red-500">*</span>}
                    </Label>
                    <FormControl>
                        <Switch.Root
                            id={name}
                            checked={field.value || false} // Always a boolean
                            onCheckedChange={(checked) => field.onChange(checked)}
                            disabled={disabled}
                            className={`relative inline-flex h-6 w-11 p-1 items-center rounded-full transition-colors 
                                ${field.value ? "bg-main" : "bg-input"} 
                                ${disabled && "opacity-50 cursor-not-allowed"}`}
                        >
                            <Switch.Thumb
                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform
                                ${field.value ? "translate-x-5" : "translate-x-0"}`}
                            />
                        </Switch.Root>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default SwitchInput;
