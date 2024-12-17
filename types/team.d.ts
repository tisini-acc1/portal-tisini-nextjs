type TeamTournament = {
  tournamentname: string;
  tournamentid: string;
  status: string;
  fixture_type: string | null;
  date_from: string | null;
  date_to: string | null;
  season: TeamSeason[];
};

type TeamSeason = {
  id: string;
  name: string;
  date_from: string;
  date_to: string;
  status: string;
  total: number;
  fixture: TeamFixture[];
};

type TeamFixture = {
  id: string;
  team1_name: string;
  team2_name: string;
  game_moment: string;
  game_date: string;
  game_status: string;
  total: number;
};
