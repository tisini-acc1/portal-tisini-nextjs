import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  role: string;
  name: string;
  phone: string;
  profileurl: string;
  account: string;
};

type Team = { id: string; name: string };
// type Serie = { id: string; name: string };
// type Tournament = { id: string };

export type Store = {
  user: User;
  team: Team;
  serie: string;
  fixture: string;
  balance: number;
  tournament: string;
  officials: Official[];
  overview: TeamOverview;
};

export type State = {
  store: Store;
};

export type Actions = {
  updateUser: (user: User) => void;
  updateTeam: (team: Team) => void;
  updateSerie: (serie: string) => void;
  updateTournament: (id: string) => void;
  updateFixture: (fixture: string) => void;
  updateOfficials: (officials: Official[]) => void;
  updateBalance: (balance: number) => void;
  updateOverview: (overview: TeamOverview) => void;
};

const initialState: Store = {
  serie: "",
  fixture: "",
  balance: 0,
  officials: [],
  tournament: "",
  team: { id: "", name: "" },
  user: { id: "", name: "", role: "", phone: "", profileurl: "", account: "" },
  overview: {
    team_id: "",
    team_name: "",
    date_created: "",
    date_updated: "",
    status: "",
    last_5_fixtures: [],
    upcoming_fixtures: [],
    ongoing_matches: [],
    recent_form: [],
  },
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      store: initialState,
      updateUser: (user: User) =>
        set((state) => ({
          store: { ...state.store, user },
        })),
      updateTeam: (team: Team) =>
        set((state) => ({
          store: { ...state.store, team },
        })),
      updateSerie: (serie: string) =>
        set((state) => ({
          store: { ...state.store, serie: serie },
        })),
      updateTournament: (id: string) =>
        set((state) => ({
          store: { ...state.store, tournament: id },
        })),
      updateFixture: (fixture: string) =>
        set((state) => ({
          store: { ...state.store, fixture: fixture },
        })),
      updateOfficials: (officials: Official[]) =>
        set((state) => ({
          store: { ...state.store, officials: officials },
        })),
      updateBalance: (balance: number) =>
        set((state) => ({
          store: { ...state.store, balance: balance },
        })),
      updateOverview: (overview: TeamOverview) =>
        set((state) => ({
          store: { ...state.store, overview: overview },
        })),
    }),
    { name: "store" }
  )
);
