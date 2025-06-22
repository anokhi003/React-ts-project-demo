import { Edit, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
  handleButtonClick?: () => void;
  buttonLabel?: string;
  headerLabel: string;
  disableButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  handleButtonClick,
  buttonLabel,
  headerLabel,
  disableButton = false,
}) => {
  return (
    <div className="mb-6 flex flex-row justify-between items-center">
      <h1 className="text-lg md:text-3xl font-semibold text-sidebar-foreground">
        {headerLabel}
      </h1>
      {buttonLabel && !disableButton && (
        <Button onClick={handleButtonClick} variant="main">
          {buttonLabel === "Password" ? <Edit /> : <Plus className="h-5 w-5" />}
          <span className="text-sm sm:text-base max-[319px]:hidden">{buttonLabel}</span>
        </Button>
      )}
    </div>
  );
};

export default Header;
