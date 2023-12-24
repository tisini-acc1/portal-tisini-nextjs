type Team = {
  id: string;
  team_name: string;
  team_type: string;
  description: string | null;
};

type Competition = {
  id: string;
  competition_type: string;
  competition_name: string;
  created_at: string;
  start_period: string;
  end_period: string;
  teams: Team[];
};
