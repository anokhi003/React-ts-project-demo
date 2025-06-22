import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ReactSvgs } from "@/assets/svgs/ReactSvgs";

interface AuthLayoutProps {
  children?: ReactNode;
  logo?: string;
}

const AuthLayout = ({ children, logo }: AuthLayoutProps) => {
  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="flex flex-col h-full relative">
      <div className="absolute top-0 left-0 py-2 md:py-0 px-4 md:px-8 z-50">
        <div className="md:h-24 md:w-32 h-20 w-20">
          <img
            src={ReactSvgs.appLogo}
            alt="logo"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
      <div className="flex h-full md:flex-nowrap flex-wrap px-6 mt-20 justify-between gap-4">
        <AnimatePresence mode="popLayout">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeInOut",
            }}
            className="md:w-1/2 w-full"
          >
            <div className="h-full w-full">
              <img
                src={logo}
                alt="logo"
                className="h-full w-full object-contain"
              />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center gap-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
