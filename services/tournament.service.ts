import apiPHP from "./api-php";

class TournamentService {
  async getTournaments(): Promise<Competition[]> {
    try {
      const res = await apiPHP.post({ action: "usertournament" });
      return res;
    } catch (error: any) {
      console.error(error);
      return error;
    }
  }
}

export default new TournamentService();
