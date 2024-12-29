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

type TeamPlayer = {
  id: string;
  pname: string;
  dob: string;
  id_no: string;
  current_jersey_no: string;
  signed_date: string;
};

type Fixture = {
  id: string;
  team1_id: string;
  team2_id: string;
  game_date: string;
  referee: string;
  team1_name: string;
  team2_name: string;
  status: string;
  game_status: string;
  game_time: string;
  minute: string;
  second: string;
  game_moment: string;
  game_minute: string;
  league: string;
  home_score: string;
  away_score: string;
  matchday: string;
  fixture_type: string;
  series: string;
};

type FixtureDetails = {
  fixture_type: string;
  game_date: string;
  game_moment: string;
  game_status: string;
  id: string;
  league: string;
  leagueid: string;
  live: string;
  matchday: string;
  minute: string;
  second: string;
  series: string;
  team1_id: string;
  team1_name: string;
  team2_id: string;
  team2_name: string;
  teamview: string;
};

type SubEvent = {
  subeventid: string;
  subeventname: string;
  totalsubevent: string;
  team: string;
  gameidid: string;
};

type Event = {
  event_id: string;
  name: string;
  total: string;
  team: string;
  fixtureid: string;
  "sub-event": SubEvent[];
};

type Stats = {
  [eventName: string]: Event;
};

type Scores = {
  Away: string;
  Home: string;
};

type Cards = {
  Awayred: number;
  Awayyellow: number;
  Homered: number;
  Homeyellow: number;
};

type Fouls = {
  Awaycommitted: number;
  Awaywon: number;
  Homecommitted: number;
  Homewon: number;
};

type Lineup = {
  Jersey_No: string;
  fixture_id: string;
  id: string;
  last_updated: string;
  player_id: string;
  player_type: string;
  pname: string;
  teamId: string;
  team_player_id: string;
  lineupposition: string;
  red: string;
};

type GameHighlights = {
  event_name: string;
  event_id: string;
  team: string;
  gameid: string;
  narration: string;
  player_id: string;
  subevent_id: string;
  subeventName: string;
  subplayer_id: string;
  subplayer_name: string;
  game_minute: string;
  game_second: string;
  game_moment: string;
  teamplayer_id: string;
  player_type: string;
  pname: string;
  Jersey_No: string;
  subsubevent_id: string;
  zone_id: null;
  tss: null;
};

type SingleFixtureStats = {
  fixture: FixtureDetails[];
  home: Stats;
  away: Stats;
  scores: Scores;
  players: Lineup[];
  cards: Cards;
  fouls: Fouls;
  standing: [];
  gamedetails: GameHighlights[];
};

type Details = {
  homeId: string;
  awayId: string;
  home: string;
  away: string;
  homeScore: string;
  awayScore: string;
  league: string;
  round: string;
  status: string;
  minute: string;
};

type RugbyData = {
  details: Details;
};
