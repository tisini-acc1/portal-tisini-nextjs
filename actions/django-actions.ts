"use server";

import axios from "axios";

import { getToken } from "@/actions/actions";

// Get Team Players
export const getPlayers = async (teamId: string): Promise<Player[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  try {
    const res = await axios.get(
      `${baseURL}/api/teams/${token}/${teamId}/players/`
    );

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      console.log(res);
      throw new Error(`Failed to fetch players: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching players."
    );
  }
};

// Get Tournaments
export const getTournaments = async (): Promise<Tournament[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  try {
    const res = await axios.get(`${baseURL}/api/tournaments/${token}/`);

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      console.log(res);
      throw new Error(`Failed to fetch tournaments: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching tournaments."
    );
  }
};

// Get Team Players
export const getTournamentTeams = async (
  tourna: string,
  serie: string
): Promise<CompTeam[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  try {
    const res = await axios.get(
      `${baseURL}/api/tournaments/${token}/${tourna}/series/${serie}/teams/`
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

// Get Tornament overview
export const getTournamentOverview = async (): Promise<Tournament[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  try {
    const res = await axios.get(`${baseURL}/api/tournament_overview/${token}/`);

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch tournament overview: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching tournament overview."
    );
  }
};

// Get Team Players
export const getTournamentSeries = async (tourna: string): Promise<Serie[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  try {
    const res = await axios.get(
      `${baseURL}/api/tournaments/${token}/${tourna}/series/`
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

// Get Tornament overview
export const getTeamOverview = async (): Promise<TeamOverview[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

  try {
    const res = await axios.get(`${baseURL}/api/team_overview/${token}/`);

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch team overview: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching team overview."
    );
  }
};
