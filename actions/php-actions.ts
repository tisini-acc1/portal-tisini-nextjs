"use server";

import axios from "axios";
import { getToken } from "./actions";
import { footballData } from "./fix-data";

// Get Team Players
export const getTournaments = async (): Promise<Competition[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}?gettoken=${token}`, {
      action: "usertournament",
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch tournaments: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching user tournaments."
    );
  }
};

// Get Tournament Fixtures
export const getTournFixtures = async (id: number): Promise<Fixture[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}?gettoken=${token}`, {
      action: "fixtures",
      seasonid: `${id}`,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch tournaments fixtures: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching tournament fixtures."
    );
  }
};

// Get Series Teams
export const getSeriesTeams = async (tourn: string, serie: string) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}?gettoken=${token}`, {
      action: "current",
      tournamentid: tourn,
      seriesid: serie,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch tournaments fixtures: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching tournament teams."
    );
  }
};

// Create Fixtures
export const createFixture = async (data: CreateFix) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      ...data,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to create fixture: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while creating fixture."
    );
  }
};

// Create Fixtures
export const getUserTeams = async (): Promise<Team[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}?gettoken=${token}`, {
      action: "userteam",
    });
    console.log(`${baseURL}?gettoken=${token}`);

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch user teams: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "An error occurred while fetching teams.");
  }
};

// Create Fixtures
export const getTeamTournaments = async (
  teamId: string
): Promise<TeamTournament[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "teamtournamentseries",
      teamid: teamId,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch tournaments for team: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching tournament teams."
    );
  }
};

// Create Fixtures
export const getTeamPlayers = async (
  tournId: string,
  serieId: string,
  teamId: string
): Promise<TeamPlayer[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "teamplayerseries",
      tournamentid: tournId,
      seriesid: serieId,
      teamid: teamId,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch players for team: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching team players."
    );
  }
};

// get all teamplayers {"action":"teamplayers","teamid":"1"}
// Get All Players
export const getAllPlayers = async (teamId: string): Promise<TeamPlayer[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "teamplayers",
      teamid: parseInt(teamId),
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch players for team: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching players."
    );
  }
};

// Create Fixtures
export const getFixtureStats = async (fixId: string): Promise<FixtureData> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.get(
      `https://apis.tisini.co.ke/apiagent7.php?event=${fixId}`
    );

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fixture stats: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching fixture stats."
    );
  }
};

export const getCountry = async (): Promise<Country[]> => {
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "nationality",
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch countries: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching countries."
    );
  }
};

export const createPlayer = async (data: CreatePlayer) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "registeruser",
      ...data,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to create player: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while creating player."
    );
  }
};

export const createPlayerTransfer = async (data: TransferPlayer) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      ...data,
      action: "transfer",
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to initiate player transfer: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while initiating player transfer."
    );
  }
};
