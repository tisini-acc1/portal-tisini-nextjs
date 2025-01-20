import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string | null;
  role: string | null;
  name: string;
  phone: string;
};

export type Store = {
  user: User;
  tournament: string;
  series: string;
  team: string;
  teamName: string;
  fixture: string;
  officials: Official[];
};

export type State = {
  user: Store;
};

export type Actions = {
  updateUser: (name: string, id: string, role: string, phone: string) => void;
  updateTournament: (id: string) => void;
  updateSeries: (serie: string) => void;
  updateTeam: (team: string) => void;
  updateTeamName: (name: string) => void;
  updateFixture: (fixture: string) => void;
  updateOfficials: (officials: Official[]) => void;
};

const initialState: Store = {
  user: {
    id: "",
    role: "",
    name: "",
    phone: "",
  },
  tournament: "",
  series: "",
  team: "",
  teamName: "",
  fixture: "",
  officials: [],
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: initialState,
      updateUser: (name: string, id: string, role: string, phone: string) =>
        set((state) => ({
          user: {
            ...state.user,
            user: { ...state.user.user, name, id, role, phone },
          },
        })),
      updateTournament: (id: string) =>
        set((state) => ({ user: { ...state.user, tournament: id } })),
      updateSeries: (serie: string) =>
        set((state) => ({ user: { ...state.user, series: serie } })),
      updateTeam: (team: string) =>
        set((state) => ({ user: { ...state.user, team: team } })),
      updateTeamName: (name: string) =>
        set((state) => ({ user: { ...state.user, teamName: name } })),
      updateFixture: (fixture: string) =>
        set((state) => ({ user: { ...state.user, fixture: fixture } })),
      updateOfficials: (officials: Official[]) =>
        set((state) => ({ user: { ...state.user, officials: officials } })),
    }),
    { name: "store" }
  )
);
