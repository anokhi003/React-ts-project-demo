import { Fragment, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { LogOutIcon, Moon, Sun } from "lucide-react";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import defaultImg from "../../assets/images/default.svg";
import { Breadcrumb, BreadcrumbList } from "../ui/breadcrumb";
import { useTheme } from "@/lib/contexts/theme-provider";
import { useSelector } from "react-redux";

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { isMobile } = useSidebar();

  const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  // useEffect(() => {
  //   if (userData) {
  //     setProfileImg(userData.profileImage || defaultImg);
  //     setUserName(userData.firstName + " " + userData.lastName);
  //   }
  // }, [userData]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <Fragment>
      <header className="sticky z-40 top-0 shrink-0 lg:pl-4">
        <div className="bg-background w-full flex items-center justify-between gap-2 border h-16 rounded-2xl ps-2 pr-4 text-sidebar-foreground">
          <div className="flex items-center gap-1">
            {isMobile && (
              <div>
                <SidebarTrigger className="w-full px-3 text-sidebar-foreground" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-transparent hover:border text-sidebar-foreground rounded-full hover:scale-110 hover:shadow-md transform transition-transform duration-300"
            >
              {theme === "light" ? (
                <Moon className="fill-current" />
              ) : (
                <Sun className="fill-current" />
              )}
            </Button>

            <Breadcrumb className="hidden sm:flex items-center justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <BreadcrumbList className="cursor-pointer">
                    <Avatar className="h-[40px] w-[40px] rounded-full overflow-hidden bg-gray-200">
                      <AvatarImage
                        src={profileImg}
                        alt="User avatar"
                        className="object-cover w-full h-full"
                      />
                      <AvatarFallback>
                        <img
                          src={defaultImg}
                          alt="fallback"
                          className="w-full h-full object-cover"
                        />
                      </AvatarFallback>
                    </Avatar>
                    <p className="hidden sm:block text-sm text-sidebar-foreground">
                      {userName}
                    </p>
                  </BreadcrumbList>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-200 hover:text-black transition-all duration-500"
                      onClick={handleLogout}
                    >
                      <LogOutIcon className="mr-2" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </Breadcrumb>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Navbar;
