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
  subevent: string;
  fixtype: string;
  team: string;
  player: string;
  subplayer: string;
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
