import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ReactDOM from "react-dom"; // Import ReactDOM for manual portal creation
interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

const Tooltip = ({ children, content }:TooltipProps) => {
  return (
    <TooltipProvider>
      <TooltipPrimitive delayDuration={150} disableHoverableContent>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {/* Use a portal to render the TooltipContent outside the table */}
        {ReactDOM.createPortal(
          <TooltipContent className="z-[1000]">{content}</TooltipContent>,
          document.body // Render the tooltip in the body
        )}
      </TooltipPrimitive>
    </TooltipProvider>
  );
};

export default Tooltip;
