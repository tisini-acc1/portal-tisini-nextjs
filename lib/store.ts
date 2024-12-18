import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Store = {
  user: string | null;
  role: string | null;
  tournament: string;
  series: string;
  team: string;
};

export type State = {
  user: Store;
};

export type Actions = {
  updateUser: (userId: string) => void;
  updateRole: (role: string) => void;
  updateTournament: (id: string) => void;
  updateSeries: (serie: string) => void;
  updateTeam: (team: string) => void;
};

const initialState = {
  user: null,
  role: null,
  tournament: "",
  series: "",
  team: "",
};

export const useStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: initialState,
      updateUser: (userId: string) =>
        set((state) => ({ user: { ...state.user, user: userId } })),
      updateRole: (role: string) =>
        set((state) => ({ user: { ...state.user, role: role } })),
      updateTournament: (id: string) =>
        set((state) => ({ user: { ...state.user, tournament: id } })),
      updateSeries: (serie: string) =>
        set((state) => ({ user: { ...state.user, series: serie } })),
      updateTeam: (team: string) =>
        set((state) => ({ user: { ...state.user, team: team } })),
    }),
    { name: "store" }
  )
);
