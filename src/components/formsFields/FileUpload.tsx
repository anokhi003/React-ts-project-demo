import { Fragment, useEffect, useRef, useState } from "react";
import { Eye, Upload, XCircle } from "lucide-react";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import FormModalLayout from "@/layout/formModalLayout/FormModalLayout";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Control, FieldValues, Path } from "react-hook-form";

interface FileUploadProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  accept?: string;
  required?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (file: File | null) => void;
  defaultValue?: string;
  enableImageView?: boolean;
}

const FileUpload = <T extends FieldValues>({
  control,
  name,
  label,
  accept,
  required = false,
  errorMessage,
  disabled = false,
  onChange,
  defaultValue = "",
  enableImageView = false,
}: FileUploadProps<T>) => {
  const [fileName, setFileName] = useState<string>(defaultValue || "");
  const [isImageViewOpen, setIsImageViewOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const file = control._formValues?.[name];

    if (file instanceof File) {
      setFileName(file.name);
      if (enableImageView) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
      }
    } else if (typeof file === "string") {
      setFileName(file);
    } else {
      setFileName("");
      setSelectedImage(null);
    }
  }, [control._formValues?.[name]]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.toLowerCase();

      if (fileType === "image/svg+xml") {
        toast.error("SVG files are not allowed!");
        if (fileInputRef.current) fileInputRef.current.value = "";
        return;
      }

      setFileName(file.name);
      field.onChange(file);
      onChange?.(file);

      if (enableImageView) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
      }
    } else {
      setFileName("");
      field.onChange(null);
      onChange?.(null);
      if (enableImageView) {
        setSelectedImage(null);
      }
    }
  };

  const handleClearFile = (field: any) => {
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    field.onChange(null);
    onChange?.(null);
    if (enableImageView) {
      setSelectedImage(null);
    }
  };

  const handleImageView = () => {
    if (selectedImage) {
      setIsImageViewOpen(true);
    }
  };

  const handleImageClose = () => {
    setIsImageViewOpen(false);
  };

  return (
    <Fragment>
      <div className="flex items-center gap-2">
        <div className="flex-1 w-36">
          <FormField
            control={control}
            name={name}
            rules={{
              required: required ? errorMessage ?? `${label} is required` : false,
            }}
            render={({ field }) => (
              <FormItem>
                <Label className="block mb-1">
                  {label} {required && <span className="text-red-500">*</span>}
                </Label>
                <FormControl>
                  <div className="relative">
                    <Input
                      name={name}
                      type="file"
                      accept={accept}
                      ref={fileInputRef}
                      onChange={(e) => handleFileChange(e, field)}
                      className="hidden"
                      disabled={disabled}
                    />
                    <div
                      className={`flex items-center justify-between p-2 lg:h-12 h-10 bg-background border rounded-xl
                        ${errorMessage ? "border-red-500" : "border-input"}
                        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                      onClick={() => !disabled && fileInputRef.current?.click()}
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        {fileName ? (
                          <span className="text-sm truncate">{fileName}</span>
                        ) : (
                          <>
                            <Upload className="h-5 w-5 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Choose a file
                            </span>
                          </>
                        )}
                      </div>
                      {fileName && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="link"
                            size="sm"
                            type="button"
                            disabled={disabled}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClearFile(field);
                            }}
                            className={`${disabled ? "cursor-not-allowed" : "hover:text-red-500"} text-gray-500 p-0`}
                          >
                            <XCircle className="h-5 w-5 text-primary" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {enableImageView && selectedImage && (
          <div
            className="py-3 px-3 border border-input mt-[22px] bg-background rounded-xl cursor-pointer flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              handleImageView();
            }}
          >
            <Eye className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
      </div>

      {enableImageView && (
        <FormModalLayout
          isOpen={isImageViewOpen}
          onClose={handleImageClose}
          title=""
        >
          {selectedImage ? (
            <div className="h-96">
              <img
                src={selectedImage}
                alt="View"
                className="object-contain w-full h-full"
              />
            </div>
          ) : (
            <p className="text-center text-gray-500">No image selected</p>
          )}
        </FormModalLayout>
      )}
    </Fragment>
  );
};

export default FileUpload;
