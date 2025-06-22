import { Toaster as Sonner, ToasterProps } from "sonner";
import {
  Loader2,
  X,
  BadgeInfo,
  BadgeCheck,
  BadgeX,
  TriangleAlert,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const Toaster = (props: ToasterProps) => {
  const theme = useSelector((state: RootState) => state.fields.theme);
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border group-[.toaster]:shadow-md",
          success:
            "group-[.toaster]:bg-success group-[.toaster]:text-success-foreground group-[.toaster]:border-success-foreground/70",
          error:
            "group-[.toaster]:bg-error group-[.toaster]:text-error-foreground group-[.toaster]:border-error-foreground",
          warning:
            "group-[.toaster]:bg-warning group-[.toaster]:text-warning-foreground group-[.toaster]:border-warning-foreground",
          info:
            "group-[.toaster]:bg-info group-[.toaster]:text-info-foreground group-[.toaster]:border-info-foreground/70",
          loading:
            "group-[.toaster]:bg-muted group-[.toaster]:text-muted-foreground group-[.toaster]:border-muted-foreground/70",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          closeButton: "p-[1px] border-2 border-foreground",
        },
      }}
      icons={{
        success: <BadgeCheck className="h-5 w-5" />,
        error: <BadgeX className="h-5 w-5" />,
        warning: <TriangleAlert className="h-5 w-5" />,
        info: <BadgeInfo className="h-5 w-5" />,
        loading: <Loader2 className="h-4 w-4 animate-spin" />,
        close: <X className="h-4 w-4" />,
      }}
      richColors
      closeButton
      position="bottom-right"
      gap={8}
      visibleToasts={5}
      duration={5000}
      swipeDirections={["left", "right"]}
      pauseWhenPageIsHidden
      {...props}
    />
  );
};

export { Toaster };
