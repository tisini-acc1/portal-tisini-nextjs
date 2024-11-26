import {
  BookText,
  Calendar,
  Calendar1,
  // Command,
  File,
  Gamepad,
  Home,
  // LifeBuoy,
  // Map,
  PersonStanding,
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
    title: "Team",
    url: "#",
    icon: ShieldHalf,
    items: [
      { title: "Players", url: "#" },
      { title: "Staffs", url: "#" },
    ],
  },
  {
    title: "Stats",
    url: "#",
    icon: PieChart,
    items: [
      { title: "Visulaization", url: "#" },
      { title: "Team Stats", url: "#" },
      { title: "Player Stats", url: "#" },
    ],
  },
  {
    title: "Schedule",
    url: "#",
    icon: Calendar1,
    items: [
      { title: "Fixtures", url: "#" },
      { title: "Results", url: "#" },
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
    url: "/home/competitions/leagues",
    icon: BookText,
  },
  {
    title: "Teams",
    url: "/home/competitions/teams",
    icon: File,
  },
  {
    title: "Fixtures",
    url: "/home/competitions/fixtures",
    icon: Calendar,
  },
  {
    title: "Players",
    url: "/home/competitions/players",
    icon: PersonStanding,
  },
];
