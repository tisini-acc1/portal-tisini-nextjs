interface RefSubEvent {
  id: string;
  Name: string;
}

interface RefEvent {
  id: string;
  name: string;
  subevent: RefSubEvent[];
}

interface RefEventData {
  refevent: RefEvent[];
}

type CreateFixEvent = {
  action: string;
  fixture: string;
  event: string;
  subevent: string | number;
  fixtype: string;
  team: string;
  player: string | number;
  subplayer: string | number;
  minute: string;
};

type Certification = {
  id: string;
  name: string;
  date_created: string;
  date_updated: string;
  created_by: string;
  fixture_type: string;
};

type UserCert = {
  id: string;
  certid: string;
  certificate: string;
  date_created: string;
  date_updated: string;
  certdocument: string;
};

type Lineup = {
  id: string;
  date_created: string;
  team_player_id: string;
  Jersey_No: string;
  player_type: string;
  player_id: string;
  pname: string;
  lineupposition: string;
  red: string;
  GK: string;
  verify: string;
};

type RefEvents = {
  id: string;
  fixture: string;
  eventid: string;
  eventname: string;
  subeventid: string;
  subeventname: string;
  teamid: string;
  teamname: string;
  playerid: string;
  playername: string;
  subplayerid: string;
  subplayername: string;
  minute: string;
  status: string;
  createdbyid: string;
  createdby: string;
};

type MatchDetails = {
  hometeam: string;
  awayteam: string;
  game_date: string;

  status: string;
  game_status: string;
  league: string;
  matchday: string;
  fixture_type: string;
  weather_type: string;
  commisioner_comment: string;
  pitch_condition: string;
  other_comment: string;
};

type Referee = {
  id: string;
  first_name: string;
  last_name: string;
  other_name: string;
  is_active: string;
  phone_number: string;
  id_no: string;
  account_no: null;
  email: string;
  status: string;
  profileurl: null;
};

type RefData = {
  ref1: Referee[];
  ref2: Referee[];
  ref3: Referee[];
  ref4: Referee[];
};

type MatchSheet = {
  referee: RefData;
  events: RefEvents[];
  hometeamlineup: Lineup[];
  awayteamlineup: Lineup[];
  fixturedata: MatchDetails[];
};

type CreateRefComment = {
  fixture: string;
  weather_type: string;
  commisioner_comment: string;
  pitchcondition: string;
};

type CreateLineup = {
  first11: { [key: string]: TeamPlayer | null };
  subs: TeamPlayer[];
};

type ChangeJersey = {
  jerseyNo: string;
  playerid: string;
  fixture: string;
  teamid: string;
};

type SwapPlayers = {
  player: string;
  swapPlayerId: string;
  fixtureid: string;
};

type ReplacePlayers = {
  playernewid: string;
  playertype: string;
  fixture: string;
  playerid: string;
};

type Condition = {
  id: string;
  name: string;
  date_created: string;
  date_updated: string;
  created_by: string;
  status: string;
};

type RefCondComment = {
  id: string;
  weathertypeid: string;
  weathertypename: string;
  commisioner_comment: string;
  pitchconditionid: string;
  pitchconditionname: string;
  other_comment: string;
  matchplay_status: string;
};

type MatchPlayStatus = {
  id: string;
  name: string;
  date_created: string;
  date_updated: string;
  created_by: string;
};

type CreateCategory = {
  seasonid: string;
  cname: string;
};

type CreateGroup = {
  gname: string;
  categoryid: string;
};
