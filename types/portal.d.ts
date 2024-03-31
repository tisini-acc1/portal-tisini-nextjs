type Team = {
  id: string;
  team_name: string;
  team_type: string;
  team_logo: string | null;
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

type Meta = {
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  hasNextPage: boolean | null;
  hasPrevPage: boolean | null;
  nextPage: boolean | null;
  prevPage: boolean | null;
};

type Comp = {
  id: string;
  competition_name: string;
  competition_type: string;
  season: string;
  teams: NewTeam[];
  fixtures: [];
  created_at: string;
  children: Competition[];
};

type Competition = {
  meta: Meta;
  data: Comp[];
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
  id: number,
  fixtures: {
      id: number;
      team_a: NewTeam;
      team_b: NewTeam;
      date_created: string;
      game_date: string;
      field: string | null;
      game_status: string;
      score_team_a: string | null;
      score_team_b: string | null;
      fixture_type: string;
  }
}
