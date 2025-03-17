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
