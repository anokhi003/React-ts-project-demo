import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SidebarComponent from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import { Home, Users } from "lucide-react";
import ThemeProvider from "@/lib/contexts/theme-provider";

interface NavRoute {
  menuId: string;
  title: string;
  route: string;
  icon?: any; // You can refine this if needed with React.ElementType
  children: Array<{
    menuId: string;
    title: string;
    route: string;
  }>;
}

function DefaultLayout() {
  const [open, setOpen] = useState(true);

  const sidebarRoutes: Array<{
    title: string;
    navMain: NavRoute[];
  }> = [
    {
      title: "Main",
      navMain: [
        {
          menuId: "home",
          title: "Home",
          route: "/",
          icon: Home,
          children: [],
        },
        {
          menuId: "userProfile",
          title: "User Profile",
          route: "/user-profile",
          icon: Users,
          children: [],
        },
      ],
    },
  ];

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <SidebarProvider
        open={open}
        onOpenChange={setOpen}
        className="h-screen overflow-hidden p-5 bg-sidebar"
      >
        <SidebarComponent open={open} sidebarRoutes={sidebarRoutes} />
        <SidebarInset className="flex flex-col h-full w-[calc(100%-16rem)]">
          <Navbar />
          <section
            className={`relative lg:ml-4 rounded-2xl mt-4 mb-4 scrollbar-hide`}
            style={{
              height: `calc(100vh - 4rem - 3.5rem)`,
            }}
          >
            <div className="bg-background border rounded-2xl px-4 py-5 h-full overflow-x-auto overflow-y-auto">
              <Outlet />
            </div>
          </section>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default DefaultLayout;
