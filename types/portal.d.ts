type Team = {
  id: string;
  team_name: string;
  team_type: string;
  description: string | null;
  children: Team[];
};

type NewTeam = {
  id: string;
  team: {
    id: string;
    team_name: string;
  };
};

type Competition = {
  id: string;
  competition_type: string;
  competition_name: string;
  created_at: string;
  start_period: string;
  end_period: string;
  teams: NewTeam[];
  children: Competition[];
};

type User = {
  id: string;
  username: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
};

type Player = {
  id: number;
  player: {
    id: number;
    user: User;
    middle_name: string;
    dob: string;
    nationality: string;
    profile_picture: string | null;
    license_no: string;
  };
  current_jersey_no: number;
  current_position: string;
  signed_date: string;
  expiry_date: string;
  status: boolean;
};

type Staff = {
  id: number;
  staff: { first_name: string; last_name: string };
  team: {
    id: string;
    team_name: string;
  };
  position: string;
};

type Role = {
  id: number;
  role: string;
  img: string;
};

type Fixture = {
  "id": number,
  "fixtures": {
      "id": number,
      "team_a": NewTeam,
      "team_b": NewTeam,
      "date_created": string,
      "game_date": string,
      "field": string | null,
      "game_status": string,
      "score_team_a": string | null,
      "score_team_b": string | null,
      "fixture_type": string
  }
}
