import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { ReactNode } from "react";

type MaxWidth =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";

interface FormModalLayoutProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  title: string;
  children: ReactNode;
  className?: string;
  maxWidth?: MaxWidth;
  isShowCloseIcon?: boolean;
}

const FormModalLayout: React.FC<FormModalLayoutProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  maxWidth = "lg",
  isShowCloseIcon = true
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`
          ${className}
          ${maxWidth === "sm" ? "max-w-md" : ""}
          ${maxWidth === "md" ? "max-w-lg" : ""}
          ${maxWidth === "lg" ? "max-w-xl" : ""}
          ${maxWidth === "xl" ? "max-w-2xl" : ""}
          ${maxWidth === "2xl" ? "max-w-3xl" : ""}
          ${maxWidth === "3xl" ? "max-w-4xl" : ""}
          ${maxWidth === "4xl" ? "max-w-5xl" : ""}
          ${maxWidth === "5xl" ? "max-w-6xl" : ""}
          ${maxWidth === "6xl" ? "max-w-7xl" : ""}
          ${maxWidth === "7xl" ? "max-w-[90rem]" : ""}
          bg-background rounded-2xl shadow-lg
          flex flex-col max-h-[90vh] text-primary
        `}
        isShowCloseIcon={isShowCloseIcon}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="p-2 flex-grow overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default FormModalLayout;
