"use client";

import * as React from "react";
import Image from "next/image";
import {
  BookOpen,
  Frame,
  LifeBuoy,
  // LucideProps,
  Map,
  PieChart,
  Send,
} from "lucide-react";

import { useStore } from "@/lib/store";
// import { NavProjects } from "@/components/nav-projects";
import {
  COMPS_ITEMS,
  PLAYER_ITEMS,
  REFREE_ITEMS,
  SUPERAGENT_ITEMS,
  TEAMS_ITEMS,
} from "@/lib/constants";
// import { NavSecondary } from "@/components/sidebar/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
// import SelectTournament from "./select-tournament";

// interface NavItem {
//   title: string;
//   url: string;
//   icon: React.ForwardRefExoticComponent<
//     Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
//   >;
//   isActive: boolean;
// }

const data: SidebarData = {
  user: {
    name: "McMaina",
    email: "m@example.com",
    avatar: "/shadcn.jpg",
  },
  navMain: [],
  navSecondary: [
    { title: "Definitions", url: "#", icon: BookOpen },
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { store } = useStore((state) => state);

  const userRole = store.user.role;

  data.navMain =
    userRole === "2"
      ? TEAMS_ITEMS
      : userRole === "6"
      ? COMPS_ITEMS
      : userRole === "5"
      ? PLAYER_ITEMS
      : userRole === "9" || userRole === "17"
      ? REFREE_ITEMS
      : userRole === "7"
      ? SUPERAGENT_ITEMS
      : [];

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-sidebar-border text-sidebar-primary-foreground">
                  <Image
                    src={"/Tisini.png"}
                    alt="Tisini"
                    width={70}
                    height={70}
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Tisini</span>
                  <span className="truncate text-xs">
                    Sports-Data-Education
                  </span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* {userRole === "6" && <SelectTournament />} */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
