type Role = {
  id: number;
  role: string;
  img: string;
};

type SidebarData = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  navMain: NavItem[];
  navSecondary: NavItem[];
  projects: {
    name: string;
    url: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  }[];
};

type Competition = {
  tournament_id: string;
  tournament: string;
  date_created: string;
  date_updated: string;
  created_by: string;
  position: string;
  status: string;
  season: [];
};

type CompSeason = {
  id: string;
  name: string;
  ranker: string;
  tournament: string;
  date_created: string;
  date_updated: string;
  created_by: string;
  date_from: string;
  date_to: string;
  status: string;
};

type Tournament = {
  id: string;
  name: string;
  date_created: string;
  date_updated: string;
  fixture_type: string | null;
  created_by: string;
  date_from: string | null;
  date_to: string | null;
  status: string;
  series: Serie[];
};

type CompTeam = {
  id: string;
  name: string;
  date_created: string;
};

type Team = {
  team_id: string;
  teamname: string;
  date_created: string;
  date_updated: string;
  status: string;
};

type Serie = {
  id: string;
  name: string;
  ranker: string;
  tournament: string;
  date_created: string;
  date_updated: string;
  created_by: string;
  date_from: string | null;
  date_to: null | string;
  status: string;
  number_of_teams: number;
  total_players: number;
  duration: string;
  matches_played: number;
};

type Fixture = {
  id: string;
  team1_id: string;
  team2_id: string;
  game_date: string;
  team1_name: string;
  team2_name: string;
  status: string;
  game_status: string;
  minute: string;
  second: string;
  game_moment: string;
  league: string;
  matchday: string;
  fixture_type: string;
  series: string;
  matchtime: string;
};

type CreateFix = {
  action: string;
  team1: string;
  team2: string;
  gamedate: string;
  tournamentid: string;
  matchday: string;
  fixturetype: string;
  live: string;
  teamview: string;
  series: string;
  hybrid: string;
  category: string;
  group: string;
  gametime: string;
  pitch: string;
  playeradd: string;
};

type CreatePlayer = {
  idno: string;
  phone: string;
  fname: string;
  oname: string;
  sname: string;
  playerdob: string;
  countrycode: string;
  position: string;
  agent: string;
  teamid: string;
  jersey: string;
  contract: string;
};

type Player = {
  id: string;
  player_id: string;
  pname: string;
  dob: string;
  nationality: string;
  id_no: null | string;
  team_id: string;
  current_jersey_no: string;
  signed_date: string;
  status: string;
};

//
// OLD API
//

// type Team = {
//   id: string;
//   team_name: string;
//   team_type: string;
//   team_logo: string | null;
//   description: string | null;
//   children: Team[];
// };

// type NewTeam = {
//   id: string;
//   team: {
//     id: string;
//     team_name: string;
//   };
// };

// type Meta = {
//   totalDocs: number;
//   totalPages: number;
//   page: number;
//   limit: number;
//   hasNextPage: boolean | null;
//   hasPrevPage: boolean | null;
//   nextPage: boolean | null;
//   prevPage: boolean | null;
// };

// type Comp = {
//   id: string;
//   competition_name: string;
//   competition_type: string;
//   season: string;
//   teams: NewTeam[];
//   fixtures: [];
//   created_at: string;
//   children: Competition[];
// };

// type Competition = {
//   meta: Meta;
//   data: Comp[];
// };

// type User = {
//   id: string;
//   username: string;
//   email: string;
//   phone_number: string;
//   first_name: string;
//   last_name: string;
// };

// type Player = {
//   id: number;
//   player: {
//     id: number;
//     user: User;
//     middle_name: string;
//     dob: string;
//     nationality: string;
//     profile_picture: string | null;
//     license_no: string;
//   };
//   current_jersey_no: number;
//   current_position: string;
//   signed_date: string;
//   expiry_date: string;
//   status: boolean;
// };

// type Staff = {
//   id: number;
//   staff: { first_name: string; last_name: string };
//   team: {
//     id: string;
//     team_name: string;
//   };
//   position: string;
// };

// type FixtureTeam = {
//   id: number;
//   team: {
//     id: string;
//     team_name: string;
//   };
//   travelling_squad: [];
// };

// type Fixture = {
//   id: number;
//   fixtures: {
//     id: number;
//     fixture_data: {
//       id: number;
//       game_date: string;
//       matchday: string;
//       game_status: string;
//       score_home_team: null | number;
//       score_away_team: null | number;
//       field: {
//         id: number;
//         name: string;
//       };
//       fixture_type: string;
//       referees: [];
//     };
//     teams: {
//       id: number;
//       home_team: FixtureTeam;
//       away_team: FixtureTeam;
//     };
//   };
// };

// type NavItem = {
//   title: string;
//   url: string;
//   icon: React.ForwardRefExoticComponent<
//     Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
//   >;
//   isActive?: boolean;
// };
