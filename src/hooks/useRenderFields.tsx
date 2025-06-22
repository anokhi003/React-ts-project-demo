import React from "react";
import FileUpload from "@/components/formsFields/FileUpload";
import FormInput from "@/components/formsFields/FormInput";
import CheckboxInput from "@/components/formsFields/CheckboxInput";
import SelectInput from "@/components/formsFields/SelectInput";
import PasswordInput from "@/components/formsFields/PasswordInput";
import { AnimatePresence, motion } from "framer-motion";
import CustomPhoneInput from "@/components/formsFields/PhoneInput";
import DatePicker from "@/components/formsFields/DatePicker";
import { Validations } from "@/lib/utils";
import DropDownWithSearch from "../components/dropdown/DropDownWithSearch";
import RadioInput from "@/components/formsFields/RadioInput";

interface FieldItem {
  fieldId: string;
  fieldName: string;
  fieldValueType: string;
  defaultCaption: string;
  isMandatory?: boolean;
  disabled?: boolean;
  isHidden?: boolean;
  isLabelDisplay?: boolean;
  isSearchable?: boolean;
  isCreatable?: boolean;
  options?: any[];
  enableImageView?: boolean;
}

interface FormErrors {
  [key: string]: {
    message?: string;
  };
}

interface DropdownOptionsMap {
  [key: string]: any[];
}

interface UseRenderFieldsProps {
  item: FieldItem;
  form: any; // You can further type this if you know the form library types
  name?: string;
  errors: FormErrors;
  dropdownOptionsMap?: DropdownOptionsMap;
}

export const UseRenderFields: React.FC<UseRenderFieldsProps> = ({
  item,
  form,
  name = "",
  errors,
  dropdownOptionsMap = {},
}) => {
  const getDropdownOptions = (fieldName: string) => {
    if (item.options && Array.isArray(item.options)) {
      return item.options as { label: string | number, value: string | number }[];
    }
    if (dropdownOptionsMap[fieldName]) {
      return dropdownOptionsMap[fieldName];
    }
    return [];
  };

  const handleChange = () => {
    // You can add your change logic here if needed
  };

  const commonProps = {
    control: form?.control,
    name: name ? name : item.fieldName,
    handleChange,
    label: item.defaultCaption,
    placeholder: `${item.defaultCaption}`,
    required: item.isMandatory,
    disabled: item.disabled,
    min: 0,
    errorMessage: errors[item.fieldName]?.message,
    isLabelDisplay: item?.isLabelDisplay ?? true,
    pattern:
      item.fieldName === "email"
        ? {
          value: Validations.email,
          message: "Invalid email address",
        }
        : item.fieldName === "phoneNumber"
          ? {
            value: Validations.phoneWithoutPrefix,
            message: "Invalid phone number",
          }
          : undefined,
  };

  switch (item.fieldValueType) {
    case "INT":
      return (
        <div key={item.fieldId} className="flex flex-row gap-2 w-full relative">
          <div className="w-full pt-[2px]">
            <FormInput type="number" {...commonProps} />
          </div>
        </div>
      );

    case "DATE":
      return (
        <div className="w-full" key={item.fieldId}>
          <DatePicker {...commonProps} />
        </div>
      );

    case "STRING":
      return (
        <div
          key={item.fieldId}
          className={`flex flex-row justify-between gap-2 w-full relative`}
        >
          <div className="w-full pt-[2px]">
            <FormInput  {...commonProps} />
          </div>
        </div>
      );
      
    case "PASSWORD":
      return (
        <AnimatePresence>
          <motion.div
            key={item.fieldId}
            initial={{ height: 0, opacity: 0, scale: 0.8, y: -20 }}
            animate={{ height: "auto", opacity: 1, scale: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, scale: 0.8, y: -20 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: 0.1,
            }}
            className="overflow-hidden"
          >
            <PasswordInput {...commonProps} />
          </motion.div>
        </AnimatePresence>
      );

    case "PHONE":
      return (
        <div className="w-full" key={item.fieldId}>
          <CustomPhoneInput {...commonProps} />
        </div>
      );

    case "EMAIL":
      return (
        <div className="w-full" key={item.fieldId}>
          <FormInput  {...commonProps} />
        </div>
      );

    case "BOOL":
      return (
        <div key={item.fieldId}>
          <CheckboxInput {...commonProps} />
        </div>
      );
    case "RADIO":
      return (
        <div key={item.fieldId}>
          {/* <RadioInput {...commonProps} options={item.options} /> */}
        </div>
      )

    case "DROPDOWN":
      if (item.isSearchable) {
        return (
          <DropDownWithSearch
            key={item.fieldId}
            {...commonProps}
            control={form.control}
            options={getDropdownOptions(item.fieldName) || []}
            placeholder={item.defaultCaption || ""}
            emptyText="No data found"
          />
        );
      }
      return (
        <div className="w-full" key={item.fieldId}>
          <SelectInput
            {...commonProps}
            options={getDropdownOptions(item.fieldName) || []}
            required={commonProps.required}
          />
        </div>
      );

    case "FILE":
      return (
        <div className="w-full" key={item.fieldId}>
          <FileUpload {...commonProps} accept="image/*" enableImageView={item.enableImageView} />
        </div>
      );
    case "NUMBER":
      return (
        <div key={item.fieldId}>
          <FormInput {...commonProps} type="number" />
        </div>
      );

    default:
      return null;
  }
};
