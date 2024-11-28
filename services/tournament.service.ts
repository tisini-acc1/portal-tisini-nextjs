import { Response } from "@/types/api-types";
import apiPHP from "./api-php";

class TournamentService {
  async getTournaments(): Promise<Response<Competition[]>> {
    try {
      const res = await apiPHP.post({ action: "usertournament" });
      return { success: true, data: res };
    } catch (error: any) {
      return {
        success: false,
        data: error,
      };
    }
  }
}

export default new TournamentService();
