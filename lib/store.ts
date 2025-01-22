import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  role: string;
  name: string;
  phone: string;
  profileurl: string;
};

type Team = { id: string; name: string };
// type Serie = { id: string; name: string };
// type Tournament = { id: string };

export type Store = {
  user: User;
  team: Team;
  serie: string;
  fixture: string;
  tournament: string;
  officials: Official[];
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
};

const initialState: Store = {
  serie: "",
  fixture: "",
  officials: [],
  tournament: "",
  team: { id: "", name: "" },
  user: { id: "", name: "", role: "", phone: "", profileurl: "" },
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
    }),
    { name: "store" }
  )
);

// export type Store = {
//   user: User;
//   tournament: string;
//   series: string;
//   team: string;
//   teamName: string;
//   fixture: string;
//   officials: Official[];
// };

// export type State = {
//   user: Store;
// };

// export type Actions = {
//   updateUser: (name: string, id: string, role: string, phone: string) => void;
//   updateTournament: (id: string) => void;
//   updateSeries: (serie: string) => void;
//   updateTeam: (team: string) => void;
//   updateTeamName: (name: string) => void;
//   updateFixture: (fixture: string) => void;
//   updateOfficials: (officials: Official[]) => void;
// };

// const initialState: Store = {
//   user: {
//     id: "",
//     role: "",
//     name: "",
//     phone: "",
//   },
//   tournament: "",
//   series: "",
//   team: "",
//   teamName: "",
//   fixture: "",
//   officials: [],
// };

// export const useStore = create<State & Actions>()(
//   persist(
//     (set) => ({
//       user: initialState,
//       updateUser: (name: string, id: string, role: string, phone: string) =>
//         set((state) => ({
//           user: {
//             ...state.user,
//             user: { ...state.user.user, name, id, role, phone },
//           },
//         })),
//       updateTournament: (id: string) =>
//         set((state) => ({ user: { ...state.user, tournament: id } })),
//       updateSeries: (serie: string) =>
//         set((state) => ({ user: { ...state.user, series: serie } })),
//       updateTeam: (team: string) =>
//         set((state) => ({ user: { ...state.user, team: team } })),
//       updateTeamName: (name: string) =>
//         set((state) => ({ user: { ...state.user, teamName: name } })),
//       updateFixture: (fixture: string) =>
//         set((state) => ({ user: { ...state.user, fixture: fixture } })),
//       updateOfficials: (officials: Official[]) =>
//         set((state) => ({ user: { ...state.user, officials: officials } })),
//     }),
//     { name: "store" }
//   )
// );
