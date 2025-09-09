import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TeamStore = {
  teams: Team[];
  serie: string;
  userTeam: Team;
  fixType: string;
  fixture: string;
  tournament: string;
  userFix: TeamFixture;
};

export type State = {
  store: TeamStore;
};

export type Actions = {
  setTeams: (teams: Team[]) => void;
  setUserTeam: (team: Team) => void;
  updateSerie: (serie: string) => void;
  updateFixType: (type: string) => void;
  updateTournament: (id: string) => void;
  updateFixture: (fixture: string) => void;
  upateUserFixture: (fixture: TeamFixture) => void;
};

const initialState: TeamStore = {
  teams: [],
  userTeam: {} as Team,
  serie: "",
  fixture: "",
  fixType: "",
  tournament: "",
  userFix: {} as TeamFixture,
};

export const useTeamStore = create<State & Actions>()(
  persist(
    (set) => ({
      store: initialState,
      setTeams: (teams: Team[]) =>
        set((state) => ({
          store: { ...state.store, teams: teams },
        })),
      setUserTeam: (team: Team) =>
        set((state) => ({ store: { ...state.store, userTeam: team } })),
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
      updateFixType(type: string) {
        set((state) => ({
          store: { ...state.store, fixType: type },
        }));
      },
      upateUserFixture(fixture: TeamFixture) {
        set((state) => ({
          store: { ...state.store, userFix: fixture },
        }));
      },
    }),
    { name: "team-store" }
  )
);
