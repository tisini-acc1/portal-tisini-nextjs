type RefStat = {
  id: string;
  fixture_id: string;
  event_id: string;
  event_name: string;
  sub_event_id: string;
  sub_event_name: string;
  team_id: string;
  team_name: string;
  player_id: string;
  player_name: string;
  sub_player_id: string;
  sub_player_name: string;
  minute: string;
  date_created: string;
  date_updated: string;
  status: string;
  created_by: string;
};

type PlayerFixture = {
  fixture: string;
  id: string;
  player_id: string;
  team_id: string;
  pname: string;
  Jersey_No: string;
  lineupposition: string;
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
  refdata: RefStat[];
};
type AgentFixture = {
  fixture: string;
  team1_id: string;
  team1_logo: string;
  team2_id: string;
  team2_logo: string;
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
  tisiniscores: {
    Home: number;
    Away: number;
  };
  refdata: RefStat[];
};

type SheetFix = {
  team1_name: string;
  team1_id: string;
  team2_name: string;
  team2_id: string;
  fixId: string;
  fixType: string;
};
