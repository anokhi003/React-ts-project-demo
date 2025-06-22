import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { ReactSvgs } from "@/assets/svgs/ReactSvgs";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Breadcrumb, BreadcrumbList } from "../ui/breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedMenu } from "@/redux/slices/supportSlice";
import { RootState } from "@/redux/store/store";

// Types
interface RouteItem {
  title: string;
  route: string;
  menuId?: string;
  icon?: React.ElementType;
  children?: RouteItem[];
}

interface RouteGroup {
  title: string;
  navMain: RouteItem[];
}

interface SidebarProps {
  open: boolean;
  sidebarRoutes: RouteGroup[];
}

const SidebarComponent: React.FC<SidebarProps> = ({ open, sidebarRoutes }) => {
  const dispatch = useDispatch();
  const { isMobile } = useSidebar();
  const { pathname } = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const userData = useSelector((state: RootState) => state.fields.userData);
  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const findMenuItemByPathname = (
    pathname: string,
    routes: RouteGroup[]
  ): RouteItem | null => {
    for (const group of routes) {
      for (const item of group.navMain) {
        if (item.route === pathname) return item;

        if (item.children) {
          const childItem = item.children.find((child) => child.route === pathname);
          if (childItem) return childItem;
        }
      }
    }
    return null;
  };

  useEffect(() => {
    const selectedMenuItem = findMenuItemByPathname(pathname, sidebarRoutes);

    if (selectedMenuItem) {
      dispatch(
        setSelectedMenu({
          menuId: selectedMenuItem?.menuId || "",
          title: selectedMenuItem.title || "",
          route: selectedMenuItem.route,
        })
      );
    } else {
      dispatch(setSelectedMenu(null));
    }
  }, [pathname, sidebarRoutes, dispatch]);

  const handleMenuClick = (item: RouteItem) => {
    dispatch(
      setSelectedMenu({
        menuId: item?.menuId || "",
        title: item?.title || "",
        route: item.route,
      })
    );
  };

  return (
    <Sidebar collapsible="icon" className="rounded-2xl ml-5 bg-background">
      <SidebarHeader className="h-20">
        <div className="w-full flex h-full flex-grow items-center justify-between">
          <Link
            to="/"
            className={`${open ? "block" : "hidden"} transition-all h-24 w-24 aspect-square lg:ml-2 mb-3`}
          >
            <img
              src={ReactSvgs.appLogo}
              alt="logo"
              className="h-full w-full"
              height={100}
              width={100}
            />
          </Link>
          {!open && isMobile && (
            <Link to="/" className="h-24 w-24 aspect-square">
              <img
                src={ReactSvgs.appLogo}
                alt="logo"
                className="h-full w-full"
                height={100}
                width={100}
              />
            </Link>
          )}
          <SidebarTrigger
            className={`${!open && !isMobile ? "flex-grow transition-all" : ""} dark:hover:bg-hoverColor text-sidebar-foreground px-5 mb-auto`}
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1">
        {sidebarRoutes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarMenu>
              {group.navMain.map((item) => (
                <React.Fragment key={item.title}>
                  <SidebarMenuItem className={open ? "" : "justify-center h-12"}>
                    <Link
                      to={item.children?.length === 0 ? item.route : "#"}
                      className="w-full flex justify-center items-center py-1"
                      onClick={(e) => {
                        if (item.children?.length && open) {
                          e.preventDefault();
                          toggleSubmenu(item.title);
                        }
                      }}
                    >
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={
                          item.route === pathname ||
                          (item.route !== "/" && pathname.includes(item.route))
                        }
                        className="py-5 pr-2"
                      >
                        <div className="h-12 w-12 flex items-center justify-center">
                          {item.icon && (
                            <item.icon
                              className={`${item.route === pathname ||
                                  (item.route !== "/" && pathname.includes(item.route))
                                  ? "text-main"
                                  : "text-sidebar-foreground"
                                } pr-[5px] fill-current`}
                            />
                          )}
                        </div>
                        <span
                          className={`${item.route === pathname ||
                              (item.route !== "/" && pathname.includes(item.route))
                              ? "text-main"
                              : "text-sidebar-foreground"
                            }`}
                        >
                          {item.title}
                        </span>
                        {item.children && item.children?.length > 0 && (
                          <motion.div
                            animate={{
                              rotate: openSubmenus[item.title] ? 90 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                            className="ml-auto h-4 w-4"
                          >
                            <ChevronRight
                              className={`ml-auto size-4 ${pathname.includes(item.route)
                                  ? "text-main"
                                  : "text-sidebar-foreground"
                                }`}
                            />
                          </motion.div>
                        )}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>

                  <AnimatePresence>
                    {item.children && openSubmenus[item.title] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <SidebarMenuSub className="relative ms-5 pl-4">
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title} data-active={pathname === child.route}>
                              <Link
                                to={child.route}
                                className="w-full flex justify-center items-center"
                                onClick={() => handleMenuClick(child)}
                              >
                                <SidebarMenuButton
                                  tooltip={child.title}
                                  isActive={pathname === child.route}
                                  className={cn("p-0 relative py-5")}
                                >
                                  <span
                                    className={`${pathname === child.route
                                        ? "text-main"
                                        : "text-sidebar-foreground"
                                      } text-xs pl-2`}
                                  >
                                    {child.title}
                                  </span>
                                </SidebarMenuButton>
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="items-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <Breadcrumb className="lg:hidden flex items-center justify-between w-full p-2">
              <BreadcrumbList>
                <Avatar className="h-[40px] w-[40px] rounded-lg">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="CN"
                    className="rounded-full"
                  />
                  <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                </Avatar>
                <p className="text-sm text-sidebar-foreground">
                  {(() => {
                    if (!userData?.firstName) return "John Doe";
                    return `${userData.firstName}${userData.lastName ? ` ${userData.lastName}` : ''}`;
                  })()}
                </p>
              </BreadcrumbList>
            </Breadcrumb>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarComponent;
