type GroupedEvent = {
  eventId: string;
  eventName: string;
  total: number;
  subEvents: SubEvent[] | [];
};

type SubEvent = {
  subevent_id: string;
  subeventName: string;
  subTotal: number;
};

type procData = { [key: string]: GroupedEvent[] };

type TableData = {
  event_id: string;
  event_name: string;
  subEvents: TableSubevent[];
  [agentName: string]: string | number | TableSubevent[];
};

type TableSubevent = {
  name: string;
  [agentName: string]: string | number;
};
