import { Button } from "@/components/ui/button";
import notFoundImage from "../../assets/images/notFound.png";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full flex flex-col items-center space-y-8">
        {/* Image container */}
        <div className="relative w-full aspect-[16/9] max-w-xl">
          <img
            src={notFoundImage}
            alt="Page not found illustration"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text content */}
        <h1 className="text-3xl md:text-4xl font-bold text-sidebar-foreground text-center">
          Page Not Found
        </h1>

        <p className="text-lg md:text-xl text-primary text-center">
          {`Oops! We couldn't find the page that you are looking for.`}
        </p>

        {/* Button */}
        <Button
          variant="default"
          className="bg-primary text-secondary px-6 py-2"
          onClick={() => (window.location.href = "/")}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
