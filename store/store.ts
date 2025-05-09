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
  teamId: string;
  serie: string;
  fixture: string;
  balance: number;
  tournament: string;
  officials: Official[];
  overview: TeamOverview;
  refFix: RefreeFix;
  userFix: TeamFixture;
  fixType: string;
  sheetFix: SheetFix;
  playerFix: PlayerFixture;
  matchStatus: MatchPlayStatus[];
};

export type State = {
  store: Store;
};

export type Actions = {
  updateUser: (user: User) => void;
  updateTeam: (team: Team) => void;
  updateTeamId: (teamId: string) => void;
  updateSerie: (serie: string) => void;
  updateTournament: (id: string) => void;
  updateFixture: (fixture: string) => void;
  updateOfficials: (officials: Official[]) => void;
  updateBalance: (balance: number) => void;
  updateOverview: (overview: TeamOverview) => void;
  updateRefFixture: (fixture: RefreeFix) => void;
  upateUserFixture: (fixture: TeamFixture) => void;
  updateFixType: (type: string) => void;
  updateSheetFix: (type: SheetFix) => void;
  updatePlayerFix: (type: PlayerFixture) => void;
  updateMatchStatus: (status: MatchPlayStatus[]) => void;
};

const initialState: Store = {
  serie: "",
  fixture: "",
  balance: 0,
  officials: [],
  fixType: "",
  tournament: "",
  teamId: "",
  team: { id: "", name: "" },
  user: { id: "", name: "", role: "", phone: "", profileurl: "", account: "" },
  overview: {} as TeamOverview,
  refFix: {} as RefreeFix,
  userFix: {} as TeamFixture,
  sheetFix: {} as SheetFix,
  playerFix: {} as PlayerFixture,
  matchStatus: [],
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
      updateTeamId: (teamId: string) =>
        set((state) => ({
          store: { ...state.store, teamId: teamId },
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
      updateFixType(type: string) {
        set((state) => ({
          store: { ...state.store, fixType: type },
        }));
      },
      updateOfficials: (officials: Official[]) =>
        set((state) => ({
          store: { ...state.store, officials: officials },
        })),
      updateMatchStatus: (status: MatchPlayStatus[]) =>
        set((state) => ({
          store: { ...state.store, matchStatus: status },
        })),
      updateBalance: (balance: number) =>
        set((state) => ({
          store: { ...state.store, balance: balance },
        })),
      updateOverview: (overview: TeamOverview) =>
        set((state) => ({
          store: { ...state.store, overview: overview },
        })),
      updateRefFixture: (fixture: RefreeFix) =>
        set((state) => ({
          store: { ...state.store, refFix: fixture },
        })),
      upateUserFixture(fixture: TeamFixture) {
        set((state) => ({
          store: { ...state.store, userFix: fixture },
        }));
      },
      updateSheetFix: (fixture: SheetFix) =>
        set((state) => ({
          store: { ...state.store, sheetFix: fixture },
        })),
      updatePlayerFix: (fixture: PlayerFixture) => {
        set((state) => ({
          store: { ...state.store, playerFix: fixture },
        }));
      },
    }),
    { name: "store" }
  )
);
