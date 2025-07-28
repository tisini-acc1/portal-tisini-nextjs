"use client";

import { useTeamStore } from "@/store/team.store";
import {
  BookText,
  // Calendar,
  Calendar1,
  // Command,
  // File,
  Gamepad,
  Home,
  Merge,
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
import { createSlug } from "./utils";
import { useStore } from "@/store/store";

export const GenerateSidebarItems = () => {
  const userRole = useStore((state) => state.store.user.role);

  const team = useTeamStore((state) => state.store.userTeam);
  const url = createSlug(team.teamname);

  if (userRole === "2") {
    // TEAMS
    return [
      {
        title: "Home",
        url: `/teams/${url}-${team.team_id}/`,
        icon: Home,
        isActive: true,
      },
      {
        title: "Competitions",
        url: `/teams/${url}-${team.team_id}/leagues`,
        icon: Gamepad,
      },
      {
        title: "Schedule",
        url: `/teams/${url}-${team.team_id}/fixtures`,
        icon: Calendar1,
      },
      {
        title: "Results",
        url: `/teams/${url}-${team.team_id}/results`,
        icon: Gamepad,
      },
      // {
      //   title: "Dashboard",
      //   url: `/teams/${url}-${team.team_id}/dashboard`,
      //   icon: PieChart,
      //   items: [
      //     { title: "Team", url: "#" },
      //     { title: "Player", url: "#" },
      //   ],
      // },
      {
        title: "Players",
        url: `/teams/${url}-${team.team_id}/players/all`,
        icon: ShieldHalf,
      },
      {
        title: "Transfers",
        url: `/teams/${url}-${team.team_id}/transfers`,
        icon: Gamepad,
      },
      {
        title: "Wallet",
        url: `/home/wallet`,
        icon: Wallet,
      },
    ];
  } else if (userRole === "6") {
    // TOURNAMENTS
    return [
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
          { title: "Stats", url: "/home/competitions/stats" },
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
      {
        title: "Wallet",
        url: "/home/wallet",
        icon: Wallet,
      },
    ];
  } else if (userRole === "5") {
    // PLAYER
    return [
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
  } else if (userRole === "9" || userRole === "17") {
    // REFREE
    return [
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
  } else if (userRole === "7") {
    return [
      {
        title: "Home",
        url: "/home/super-agent",
        icon: Home,
      },
      {
        title: "Data Review",
        url: "/home/super-agent/review-data",
        icon: Workflow,
      },
      {
        title: "Wallet",
        url: "/home/wallet",
        icon: Wallet,
      },
      // {
      //   title: "Clean Data",
      //   url: "/home/super-agent/clean-data",
      //   icon: Wallet,
      // },
      {
        title: "Merge",
        url: "#",
        icon: Merge,
        isActive: true,
        items: [
          // { title: "Data", url: "/home/super-agent/merge-data" },
          { title: "Player", url: "/home/super-agent/merge-players" },
        ],
      },
    ];
  } else if (userRole === "1") {
    return [
      {
        title: "Home",
        url: "/home/tisini-agent",
        icon: Home,
      },
      {
        title: "My Fixtures",
        url: "/home/tisini-agent/fixtures",
        icon: Workflow,
      },
      {
        title: "Wallet",
        url: "/home/wallet",
        icon: Wallet,
      },
    ];
  } else {
    return [];
  }
};
