import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const TEAMS_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/home/team",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Admin",
    path: "/home/team/admin-area",
    icon: <Icon icon="lucide:users" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "My Teams", path: "/home/team/admin-area/my-teams" },
      { title: "Competitons", path: "/home/team/admin-area/competitions" },
    ],
  },
  // {
  //   title: "Match Reports",
  //   path: "/home/team/match-reports",
  //   icon: <Icon icon="lucide:bitcoin" width="24" height="24" />,
  // },
  // {
  //   title: "Schedule",
  //   path: "/home/team/match-reports",
  //   icon: <Icon icon="lucide:bitcoin" width="24" height="24" />,
  // },
  // {
  //   title: "Stats",
  //   path: "/home/team/settings",
  //   icon: <Icon icon="lucide:settings" width="24" height="24" />,
  //   submenu: true,
  //   subMenuItems: [
  //     { title: "Visulaization", path: "/home/team/settings/account" },
  //     { title: "Team Stats", path: "/home/team/settings/privacy" },
  //     { title: "Player Stats", path: "/home/team/settings/privacy" },
  //   ],
  // },
  {
    title: "Team",
    path: "/home/team/teams",
    icon: <Icon icon="lucide:users" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      // { title: "All", path: "/home/properties" },
      { title: "Players", path: "/home/team/teams/players" },
      { title: "Staffs", path: "/home/team/teams/staffs" },
    ],
  },
];

export const COMPS_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/home/competitions",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Admin",
    path: "/home/competitions/admin",
    icon: <Icon icon="lucide:users" width="24" height="24" />,
    // submenu: true,
    // subMenuItems: [
    //   { title: "My Teams", path: "/home/competitions/admin-area/my-teams" },
    //   {
    //     title: "Competitons",
    //     path: "/home/competitions/admin-area/competitions",
    //   },
    // ],
  },
  {
    title: "Competitions",
    path: "/home/competitions/competitions",
    icon: <Icon icon="lucide:users" width="24" height="24" />,
    // submenu: true,
    // subMenuItems: [
    //   // { title: "All", path: "/home/properties" },
    //   { title: "Players", path: "/home/competitions/competitionss/players" },
    //   { title: "Staffs", path: "/home/competitions/competitionss/staffs" },
    // ],
  },
];
