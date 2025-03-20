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
  player: string;
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

type RefStats = {
  events: RefData[];
};

type RefData = {
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
