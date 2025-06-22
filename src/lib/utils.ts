import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// `cn` utility: accepts any number of clsx-compatible inputs
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export const Validations = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phoneWithoutPrefix: /^[6-9]\d{9}$/,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d#@$!%*?&_]{8,}$/,
};

// Define option type for getOptions output
export interface Option {
  label: string;
  value: string;
}

export const getOptions = <T extends Record<string, any>>(
  options: T[] | undefined,
  valueKey: keyof T,
  labelKey: keyof T
): Option[] => {
  if (!options || options.length === 0) return [];

  return options.map((item) => ({
    label: String(item[labelKey]),
    value: String(item[valueKey]),
  }));
};
