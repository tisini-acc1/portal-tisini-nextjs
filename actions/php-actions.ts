"use server";

import axios from "axios";
import { getToken } from "./actions";

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
export const getTournFixtures = async (id: number): Promise<AgentFixture[]> => {
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

// Create Fixture Event by Ref
export const createFixtureEvent = async (data: CreateFixEvent) => {
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
      throw new Error(`Failed to create fixture event: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while creating fixture event."
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

    if (res.status === 200) {
      console.log("server 119", res.data);
      if (res.data && res.data.error === "1") {
        throw new Error("userNotAuthenticated");
      }

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
  // playerId: string
): Promise<TeamTournament[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "teamtournamentseries",
      teamid: teamId,
      // playerid: playerId,
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
    // const res = await axios.get(
    //   `https://apis.tisini.co.ke/apiagent7.php?event=${fixId}`
    // );
    const res = await axios.post(`${baseURL}`, {
      action: "teamdata",
      fixture: fixId,
      gettoken: token,
    });

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

// Create Fixtures
export const getVideoEvents = async (fixId: string) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "fixtureevents",
      fixtureid: fixId,
      gettoken: token,
    });

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

// Get Players Data
export const getPlayersData = async (
  fixId: string,
  player: number
): Promise<TeamPlayerData> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "playerdata",
      fixture: fixId,
      playerid: player,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      if (res.data.error === "1") {
        throw new Error(
          res.data.message || "The fixture has not been paid for"
        );
      }
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

// Create Fixtures
export const getFixtureStatsById = async (
  fixId: string
): Promise<FixtureData> => {
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

export const addPlayer = async (data: CreatePlayer) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "addPlayer",
      ...data,
      channel: "web",
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

export const getTeamTransfers = async (teamId: string): Promise<Transfer[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "teamtransfer",
      teamid: teamId,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch team transfers: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "An error occurred while team transfers.");
  }
};

export const getTournamentTransfers = async (
  id: string
): Promise<Transfer[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      gettoken: token,
      action: "tournamenttransfer",
      tournamentid: id,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch tournament transfers: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while tournament transfers."
    );
  }
};

export const createOfficial = async (data: TournaOfficial) => {
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      ...data,
      // action: "registeruser",
      // gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to create match official: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while creating match official."
    );
  }
};

export const createFixtureLineup = async (data: CreateLineup, id: string) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      lineup: data,
      action: "createlineup",
      fixture: id,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to create fixture lineup: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while creating fixture lineup."
    );
  }
};

// create fix comments
export const createFixtureComments = async (data: CreateRefComment) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      ...data,
      action: "fixotherdata",
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to create fixture lineup: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while creating fixture lineup."
    );
  }
};

// create fix comments
export const changeJersey = async (data: ChangeJersey) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      ...data,
      action: "changeJersey",
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to change player's jersey number: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while changing player jersey no."
    );
  }
};

// swap lineup players
export const swapLineupPlayers = async (data: SwapPlayers) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      ...data,
      action: "swapPlayer",
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to change swap players: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while swapping players."
    );
  }
};

// Replace lineup players
export const replaceLineupPlayers = async (data: ReplacePlayers) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      ...data,
      action: "replacePlayer",
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to change replace players: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while replacing players."
    );
  }
};

export const getOfficials = async (): Promise<Official[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      gettoken: token,
      action: "refereelist",
      fixtype: "1",
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch tournament officials: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while tournament officials."
    );
  }
};

export const getOfficialsEvents = async (id: string): Promise<RefEventData> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      gettoken: token,
      action: "refevent",
      fixtype: id,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch officials events: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while officials events."
    );
  }
};

export const updateFixOfficial = async (data: FixOfficials) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "updateReferee",
      ...data,
      gettoken: token,
    });
    console.log(res);
    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to create match official: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while creating match official."
    );
  }
};

// {"action":"", }
export const getRefreeFixtures = async (id: string): Promise<RefreeFix[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      gettoken: token,
      action: "refereefixture",
      refid: id,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch refree fixtures: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while refree fixtures."
    );
  }
};

export const getTeamLineup = async (
  fixId: string,
  teamId: string
): Promise<Lineup[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      gettoken: token,
      action: "fixturelineup",
      fixture: fixId,
      teamid: teamId,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch team lineups: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching team lineups."
    );
  }
};

export const getFixType = async (): Promise<FixtureType[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "fixturetype",
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch fixture types: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "An error occurred while fixture types.");
  }
};

export const getFixRefEvents = async (id: string): Promise<MatchSheet> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "refevents",
      fixture: id,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch fixture types: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "An error occurred while fixture types.");
  }
};

export const getCertification = async (
  id: string
): Promise<Certification[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "certification",
      fixtype: id,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch fixture types: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message || "An error occurred while fixture types.");
  }
};

export const getUserCerts = async (): Promise<UserCert[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "usercertification",
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch user certs: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching user certs."
    );
  }
};

export const getWeatherCond = async (): Promise<Condition[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "weathertype",
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch weather condition: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching weather conditions."
    );
  }
};

export const getMatchPlayStatus = async (): Promise<MatchPlayStatus[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "fetchmatchplaystatus",
      gettoken: token,
    });

    if (res.status === 200) {
      // console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch match play status: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching match play status."
    );
  }
};

export const getFixConditions = async (
  id: string
): Promise<RefCondComment[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "fetchfixotherdata",
      fixture: id,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch weather condition: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching weather conditions."
    );
  }
};

export const getPitchCond = async (): Promise<Condition[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "pitchcondition",
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to fetch pitch condition: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching pitch conditions."
    );
  }
};

export const verifyPlayer = async (id: string) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "verifylineup",
      lineupid: id,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to verify player: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while verifying the player."
    );
  }
};

export const uploadPhotoUrl = async ({
  url,
  id,
}: {
  url: string;
  id: string;
}): Promise<any> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "passportphoto",
      photourl: url,
      playerid: id,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to upload player photo: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while uploading player url."
    );
  }
};

export const uploadTeamLogo = async ({
  url,
  id,
}: {
  url: string;
  id: string;
}): Promise<any> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "teamlogo",
      photourl: url,
      teamid: id,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to upload player photo: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while uploading player url."
    );
  }
};

export const uploadCertUrl = async ({
  url,
  id,
}: {
  url: string;
  id: string;
}): Promise<any> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "createcertificate",
      documenturl: url,
      certificate: id,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to upload player cert: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while uploading player cert."
    );
  }
};

export const createTournament = async (data: TournaCreate) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "createtournament",
      ...data,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to create a new tournament: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while creating new tournament."
    );
  }
};

// fixture payment
export const fixturePayment = async (data: FixPay) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "utilize",
      ...data,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to make fixture payment: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while making fixture payment."
    );
  }
};

// fixture payment
export const PlayerFixtures = async () => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "fixtures",
      playerid: 6857,
      gettoken: token,
    });

    if (res.status === 200) {
      console.log("server", res.data);
      return res.data;
    } else {
      throw new Error(`Failed to get fixture players: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while fetching player fixtures."
    );
  }
};

// Create Fixtures
export const getSuperAgentFixtures = async (): Promise<AgentFixture[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "fixtures",
      all: "",
      limit: "200",
      from: "0",
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

//  {"action":"fixtures","fixtureid":1}
export const getFixture = async (): Promise<AgentFixture[]> => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "fixtures",
      fixtureid: 7285,
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

//  {"action":"fixtures","fixtureid":1}
export const getMainEvents = async () => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      getmainevent: "event",
      fixture_type: "football",
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

//  {"action":"fixtures","fixtureid":1}
export const ModifyOnlineFixture = async (data: {
  fixtureid: string;
  live: string;
}) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "activateonline",
      ...data,
      gettoken: token,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Failed to modify fixture online status: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while modifing fixture status."
    );
  }
};

//  {"action":"fixtures","fixtureid":1}
export const ModifyFixture = async (data: UpdateFix) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "updatefixture",
      ...data,
      gettoken: token,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Failed to modify fixture online status: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while modifing fixture status."
    );
  }
};

//  {"action":"fixtures","fixtureid":1}
export const DeleteFixture = async (id: string) => {
  const token = await getToken();
  const baseURL = process.env.NEXT_PUBLIC_API_HOST;

  try {
    const res = await axios.post(`${baseURL}`, {
      action: "deletefixture",
      fixtureid: id,
      gettoken: token,
    });

    if (res.status === 200) {
      return res.data;
    } else {
      throw new Error(`Failed to modify fixture online status: ${res.status}`);
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(
      error.message || "An error occurred while modifing fixture status."
    );
  }
};
