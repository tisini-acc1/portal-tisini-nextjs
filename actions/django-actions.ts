"use server";

import axios from "axios";

import { getToken } from "@/actions/actions";

// Get Team Players
export const getPlayers = async (teamId: number): Promise<Player[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;
  console.log(`${baseURL}/teams/${token}/${teamId}/players/`);
  try {
    const res = await axios.get(`${baseURL}/teams/${token}/${teamId}/players/`);

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch players: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching players."
    );
  }
};

// Get Team Players
export const getTournamentTeams = async (
  tourna: number,
  serie: number
): Promise<CompTeam[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;
  console.log(
    `${baseURL}/tournaments/${token}/${tourna}/series/${serie}/teams/`
  );
  try {
    const res = await axios.get(
      `${baseURL}/tournaments/${token}/${tourna}/series/${serie}/teams/`
    );

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch tournament teams: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching players."
    );
  }
};

// Get Team Players
export const getTournamentSeries = async (tourna: number): Promise<Serie[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  try {
    const res = await axios.get(
      `${baseURL}/tournaments/${token}/${tourna}/series/`
    );

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch tournament series: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching players."
    );
  }
};
