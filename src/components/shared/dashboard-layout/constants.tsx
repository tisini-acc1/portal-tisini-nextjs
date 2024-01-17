import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/home",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Admin",
    path: "/home/admin-area",
    icon: <Icon icon="lucide:users" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "My Teams", path: "/home/admin-area/my-teams" },
      { title: "Competitons", path: "/home/admin-area/competitions" },
    ],
  },
  // {
  //   title: "Match Reports",
  //   path: "/home/match-reports",
  //   icon: <Icon icon="lucide:bitcoin" width="24" height="24" />,
  // },
  // {
  //   title: "Schedule",
  //   path: "/home/match-reports",
  //   icon: <Icon icon="lucide:bitcoin" width="24" height="24" />,
  // },
  // {
  //   title: "Stats",
  //   path: "/home/settings",
  //   icon: <Icon icon="lucide:settings" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: "Visulaization", path: "/home/settings/account" },
  //     { title: "Team Stats", path: "/home/settings/privacy" },
  //     { title: "Player Stats", path: "/home/settings/privacy" },
  //   ],
  // },
  {
    title: "Team",
    path: "/home/teams",
    icon: <Icon icon="lucide:users" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      // { title: "All", path: "/home/properties" },
      { title: "Players", path: "/home/teams/players" },
      { title: "Staffs", path: "/home/teams/staffs" },
    ],
  },
];
