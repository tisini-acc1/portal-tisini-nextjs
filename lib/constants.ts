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
  PersonStanding,
  // PieChart,s
  // PlaySquare,
  // Send,
  ShieldHalf,
  Wallet,
  Workflow,
} from "lucide-react";

export const TEAMS_ITEMS = [
  {
    title: "Home",
    url: "/home/teams",
    icon: Home,
    isActive: true,
  },
  // {
  //   title: "Competitions",
  //   url: "#",
  //   icon: Gamepad,
  // },
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
  // {
  //   title: "Dashboard",
  //   url: "/home/teams/dashboard",
  //   icon: PieChart,
  //   items: [
  //     { title: "Team", url: "#" },
  //     { title: "Player", url: "#" },
  //   ],
  // },
  {
    title: "Team",
    url: "#",
    icon: ShieldHalf,
    items: [
      { title: "Team Player", url: "/home/teams/team-player" },
      { title: "Manage Player", url: "/home/teams/manage-player" },
      // { title: "Staffs", url: "#" },
    ],
  },
  {
    title: "Transfers",
    url: "/home/teams/transfers",
    icon: Gamepad,
  },
  {
    title: "Wallet",
    url: "/home/wallet",
    icon: Wallet,
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
      { title: "Transfers", url: "/home/competitions/transfers" },
    ],
  },
  {
    title: "Users",
    url: "#",
    icon: PersonStanding,
    items: [
      { title: "Players", url: "/home/competitions/players" },
      { title: "Match Officials", url: "/home/competitions/officials" },
    ],
  },
  // {
  //   title: "",
  //   url: "",
  //   icon: File,
  // },
  // {
  //   title: "",
  //   url: "",
  //   icon: PersonStanding,
  // },
  {
    title: "Wallet",
    url: "/home/wallet",
    icon: Wallet,
  },
];

export const PLAYER_ITEMS = [
  {
    title: "Home",
    url: "/home/team-player",
    icon: Home,
    isActive: true,
  },
  {
    title: "Wallet",
    url: "/home/wallet",
    icon: Wallet,
  },
];

export const REFREE_ITEMS = [
  {
    title: "Home",
    url: "/home/match-officials",
    icon: Home,
    isActive: true,
  },
  {
    title: "Fixtures",
    url: "/home/match-officials/fixtures",
    icon: Workflow,
    isActive: true,
  },
  {
    title: "Wallet",
    url: "/home/wallet",
    icon: Wallet,
  },
];

export const SUPERAGENT_ITEMS = [
  {
    title: "Home",
    url: "/home/super-agent",
    icon: Home,
    isActive: true,
  },
  {
    title: "Data Review",
    url: "/home/super-agent/review-data",
    icon: Workflow,
    isActive: true,
  },
  {
    title: "Clean Data",
    url: "/home/super-agent/clean-data",
    icon: Wallet,
  },
  {
    title: "Merge Data",
    url: "/home/super-agent/merge-data",
    icon: Wallet,
  },
];
