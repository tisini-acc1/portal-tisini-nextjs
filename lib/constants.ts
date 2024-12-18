import {
  BookText,
  // Calendar,
  Calendar1,
  // Command,
  // File,
  Gamepad,
  Home,
  // LifeBuoy,
  // Map,
  // PersonStanding,
  PieChart,
  // PlaySquare,
  // Send,
  ShieldHalf,
} from "lucide-react";

export const TEAMS_ITEMS = [
  {
    title: "Home",
    url: "/home/teams",
    icon: Home,
    isActive: true,
  },
  {
    title: "Competitions",
    url: "#",
    icon: Gamepad,
  },
  {
    title: "Schedule",
    url: "/home/teams/fixtures",
    icon: Calendar1,
    // items: [
    //   { title: "Fixtures", url:  },
    //   { title: "Results", url: "#" },
    // ],
  },
  {
    title: "Results",
    url: "/home/teams/results",
    icon: Gamepad,
  },
  {
    title: "Team",
    url: "#",
    icon: ShieldHalf,
    items: [
      { title: "Players", url: "/home/teams/players" },
      { title: "Staffs", url: "#" },
    ],
  },
  {
    title: "Visulaization",
    url: "#",
    icon: PieChart,
    items: [
      { title: "Team", url: "#" },
      { title: "Player", url: "#" },
    ],
  },

  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings2,
  //   items: [
  //     {
  //       title: "General",
  //       url: "#",
  //     },
  //     {
  //       title: "Team",
  //       url: "#",
  //     },
  //     {
  //       title: "Billing",
  //       url: "#",
  //     },
  //     {
  //       title: "Limits",
  //       url: "#",
  //     },
  //   ],
  // },
];

export const COMPS_ITEMS = [
  {
    title: "Home",
    url: "/home/competitions",
    icon: Home,
    isActive: true,
  },
  {
    title: "Competitions",
    url: "#",
    icon: BookText,
    isActive: true,
    items: [
      { title: "leagues", url: "/home/competitions/leagues" },
      { title: "Teams", url: "/home/competitions/teams" },
      { title: "Fixtures", url: "/home/competitions/fixtures" },
      { title: "Players", url: "/home/competitions/players" },
    ],
  },
];
