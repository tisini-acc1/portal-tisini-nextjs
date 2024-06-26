import { Icon } from "@iconify/react";

import { SideNavItem } from "./types";

export const TEAMS_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/home/team",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "My Teams",
    path: "/home/team/my-teams",
    icon: <Icon icon="lucide:users" width="24" height="24" />,
  },
  {
    title: "Fixtures",
    path: "/home/team/fixtures",
    icon: <Icon icon="lucide:users" width="24" height="24" />,
  },
  {
    title: "Competitions",
    path: "/home/team/competitions",
    icon: <Icon icon="lucide:users" width="24" height="24" />,
  },
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
  {
    title: "Stats",
    path: "/home/team/stats",
    icon: <Icon icon="lucide:area-chart" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Visulaization", path: "/home/team/settings/account" },
      { title: "Team Stats", path: "/home/team/stats/team" },
      { title: "Player Stats", path: "/home/team/stats/player" },
    ],
  },
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
