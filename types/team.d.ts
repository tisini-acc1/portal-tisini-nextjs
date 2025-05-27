type TeamOverview = {
  team_id: string;
  team_name: string;
  date_created: string;
  date_updated: string;
  status: string;
  tournaments: OverviewTourn[];
};

type OverviewTourn = {
  tournamentname: string;
  tournamentid: string;
  status: string;
  fixture_type: string;
  date_from: string | null;
  date_to: string | null;
  season: OverviewSeason[];
};

type OverviewSeason = {
  id: string;
  name: string;
  date_from: string;
  date_to: string;
  status: string;
  total: number;
  fixtures: SeasonFixture;
  season_snapshot: SeasonSnapshot;
  recent_form: string[];
  GF: number;
  GA: number;
};

type SeasonSnapshot = {
  W: number;
  D: number;
  L: number;
};

type SeasonFixture = {
  played: OverviewFixture[];
  upcoming: OverviewFixture[];
  ongoing: OverviewFixture[];
};

type OverviewFixture = {
  id: string;
  team1_name: string;
  team2_name: string;
  team1_id: string;
  team2_id: string;
  game_moment: string;
  game_date: string;
  game_status: string;
  scores: TeamScore;
};

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

type TeamScore = {
  Home: string;
  Away: string;
};

type TeamFixture = {
  id: string;
  team1_name: string;
  team2_name: string;
  game_moment: string;
  game_date: string;
  game_status: string;
  total: number;
  pay_status: number;
  team1_id: string;
  team2_id: string;
  pay_status: number;
  amount: string;
  billitem: string;
  accountbalance: number;
  scores: TeamScore;
};

type TeamPlayer = {
  id: string;
  pname: string;
  dob: string;
  id_no: string;
  current_jersey_no: string;
  signed_date: string;
  nationality: string;
  player_id: string;
  status: string;
  system_user_id: string;
  team_id: string;
  passportphoto: string;
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
  home_score: string;
  away_score: string;
  winner: null | string;
  start_app: string;
  hybrid: string;
  hybridhome: string | null;
  hybridaway: string | null;
  lite: string;
  location_id: string;
  category: string;
  groupid: string;
  matchtime: string;
  tmvplayer: string;
};

type SubEvent = {
  subeventid: string;
  subeventname: string;
  totalsubevent: string;
  team: string;
  gameidid: string;
};

type EventData = {
  event_id: string;
  name: string;
  total: string;
  team: string;
  fixtureid: string;
  "sub-event": SubEvent[];
};

type Stats = {
  [eventName: string]: EventData;
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
  id: string;
  fixture_id: string;
  date_created: string;
  team_player_id: string;
  Jersey_No: string;
  system_user_id: string;
  player_type: string;
  player_id: string;
  teamId: string;
  pname: string;
  last_updated: string;
  lineupposition: string;
  red: string;
  GK: string;
  verify: string;
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
  zone_id: string | null;
  tss: string | null;
};

type FixtureData = {
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
  hPossession: number;
  aPossession: number;
};

type Stat = {
  home: number;
  away: number;
};

type TotalStat = {
  home: { value: number; total: number };
  away: { value: number; total: number };
};

type FootballAttack = {
  keyPass: Stat;
  setPiece: Stat;
  freekick: Stat;
  boxTouch: Stat;
  boxCarry: Stat;
  offside: Stat;
  shotInBox: TotalStat;
  shotOutBox: TotalStat;
};

type RugbyAttack = {
  tries: Stat;
  carries: Stat;
  handlingErrors: Stat;
  linebreaks: Stat;
  offloads: Stat;
  oppVisit22: Stat;
  passAcc: TotalStat;
  conversion: TotalStat;
};

type FootballDiscipline = {
  fouls: Stat;
  cards: Cards;
};

type FootballChance = {
  chances: Stat;
  cross: Stat;
  keyPass: Stat;
  freeKick: Stat;
  throwin: Stat;
  cornerKick: Stat;
};

type RugbyDiscipline = {
  penalty: Stat;
  cards: Cards;
};

type FootballPassing = {
  corner: Stat;
  ballLost: Stat;
  ballWon: Stat;
  secondBall: Stat;
  throwIn: Stat;
  longThrowIn: Stat;
  pass: TotalStat;
  progPass: TotalStat;
  crossRight: TotalStat;
  crossLeft: TotalStat;
};

type FootballDuels = {
  aerial: TotalStat;
  ground: TotalStat;
};

type FootballDefense = {
  clearance: Stat;
  blocks: Stat;
  foulWon: Stat;
  intercptOwn: Stat;
  intercptOpp: Stat;
  tackles: TotalStat;
};

type RugbyDefense = {
  negTackle: Stat;
  posTackle: Stat;
  missedTackle: Stat;
  turnoversWon: Stat;
  succTackle: TotalStat;
};

type FootballGK = {
  saves: Stat;
  runOuts: Stat;
  kickOuts: Stat;
  throwOuts: Stat;
  claims: TotalStat;
  goalkick: TotalStat;
};

type RugbySetPiece = {
  setPieceWon: Stat;
  scrumPenalty: Stat;
  scrumSteal: Stat;
  lineoutSteal: Stat;
  successfulMaul: Stat;
  unsuccessfulMaul: Stat;
  lineoutRetention: TotalStat;
  scrumRetention: TotalStat;
};

type RugbyRestarts = {
  restarts: Stat;
  restartsRetention: TotalStat;
};

type RugbyZones = {
  own22: Stat;
  own50: Stat;
  opp50: Stat;
  opp22: Stat;
};

type FootballData = {
  details: Details;
  attack: FootballAttack;
  discipline: FootballDiscipline;
  passing: FootballPassing;
  duels: FootballDuels;
  defense: FootballDefense;
  gk: FootballGK;
  chance: FootballChance;
};

type RugbyData = {
  details: Details;
  defense: RugbyDefense;
  attack: RugbyAttack;
  setPiece: RugbySetPiece;
  discipline: RugbyDiscipline;
  restarts: RugbyRestarts;
  zones: RugbyZones;
};

type Country = {
  id: string;
  alpha_2_code: string;
  en_short_name: string;
  nationality: string;
  phonecode: string;
  created_by: string;
  date_created: string;
};

type TransferPlayer = {
  player: string;
  team1: string;
  team2: string;
  amount: string;
  fees: string;
  tournament_id: string;
};

type Transfer = {
  id: string;
  playerid: string;
  pname: string;
  team1: string;
  team1name: string;
  team2: string;
  team2name: string;
  date_created: string;
  date_updated: string;
  created_by: string;
  createdby: string;
  approved_by: string | null;
  declined_by: string | null;
  transfer_cost: string;
  union_cost: string;
  tournament: string;
  tournamentid: string;
};

type TournaCreate = {
  name: string;
  fixtype: string;
  from: string;
  to: string;
  position: string;
};

type TournaOfficial = {
  id_no: string;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  sirname: string;
  password: string;
  role: string;
};

type Official = {
  id: string;
  first_name: string;
  last_name: string;
  other_name: string;
  is_active: string;
};

type FixOfficials = {
  fixture: string;
  ref1: string;
  ref2: string | number;
  ref3: string | number;
  ref4: string | number;
};

type RefreeFix = {
  id: string;
  date_created: string;
  game_date: string;
  referee1_id: string;
  referee2_id: string;
  referee3_id: string;
  referee4_id: string;
  system_user_id: string;
  team1_name: string;
  team2_name: string;
  team1_id: string;
  team2_id: string;
  game_status: string;
  minute: string;
  second: string;
  game_moment: string;
  league: string;
  last_localid: string;
  home_score: string;
  away_score: string;
  matchday: string;
  fixture_type: string;
  matchtime: string;
};

type FixtureType = {
  id: string;
  type_name: string;
  type_code: string;
  sub_type: string;
  order_type: string;
  no_player: string;
  fix_time: string;
};

type TeamPlayerData = {
  home: PData[];
  away: PData[];
};

type PData = {
  playerid: string;
  gameid: string;
  pname: string;
  pnameanddata: Stats;
};

type PlayerEvent = {
  name: string;
  rating: string;
  goal: string;
  assist: string;
  chances: string;
  "box-touch": string;
  "box-carry": string;
  shots: string;
  crosses: string;
  pass: string;
  "prog-pass": string;
  tackles: string;
  "ball-efficiency": string;
  "second-ball": string;
  interception: string;
  clearance: string;
  blocks: string;
  aerial: string;
  fouls: string;
  cards: string;
  claims: string;
  distribution: string;
  runouts: string;
  throwouts: string;
  saves: string;
  [key: string]: string; // Index signature
};

type RugbyPlayerStat = {
  tries: number;
  goal_kicks: string;
  assist: number;
  linebreak: number;
  comp_pass: number;
  carries: number;
  offload: number;
  handling_errors: string;
  ptackles: string;
  turnover_won: number;
  penalties: number;
  cards: string;
  plineout_throw: string;
  lineout_steals: number;
  pscrum_won: string;
  retained_kicks: number;
  Kicking_errors: number;
  name: string;
  rating: string;
};

type BasketballPlayerStats = {
  point: number;
  assist: number;
  rebound: number;
  block: number;
  turnover: number;
  steal: number;
  foul: number;
  twoPoint: string;
  threePoint: string;
  freeThrow: string;
  name: string;
};

type FixPay = {
  username: string;
  password: string;
  amount: string;
  reference: string;
  tcode: string;
};

type EventType = {
  id: string;
  name: string;
  is_active: string;
  fixture_type: string;
  ranker: string;
  gke: string;
  isPlayer: string;
  closewindow: string;
  uploaddata: string;
};

type VideoEvent = {
  id: string;
  event_name: string;
  time: string;
  team: string;
  gameid: string;
  player_id: string;
  subevent_id: string;
  subplayer_id: string;
  game_minute: string;
  game_second: string;
  game_moment: string;
  quarter: string;
  app_timelog: null | string;
  player_type: string;
  pname: string;
  Jersey_No: string;
  subsubevent_id: string;
  subeventname: string;
  zone_id: string;
  KickFrom: string;
  KickLanding: string;
  MetersMade: string;
  NoPlayersRuck: string;
  NoPlayersLineout: string;
  defenderbeaten: string;
  PlayStartEndtimevideo: string;
  PlayTimeinvideo: string;
  x: string;
  y: string;
  eventid: string;
  videourl: string;
  Passer: string;
  Receiver: string;
};

type MatchSequence = {
  team_id: string;
  outcome_stats: {
    Positive: number;
    Negative: number;
    Neutral: number;
  };
  event_enders: EventEnder[];
  player_enders: PlayerEnder[];
  sequences: Sequence[];
  all_events: VideoEvent[];
};

type EventEnder = {
  Next_Event: string;
  Sequence_End_Count: number;
};

type PlayerEnder = {
  Player: string;
  Next_Event: string;
  Count: number;
};

type Sequence = {
  Team: string;
  Pass_Count: number;
  Next_Event: string;
  Player: string;
  Pass_Type: string;
  Quarter: string;
  Minute: string;
  Second: string;
  Outcome: string;
};
