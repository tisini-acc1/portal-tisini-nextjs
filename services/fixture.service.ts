import apiPHP from "./api-php";

class FixtureService {
  async getFixtures(): Promise<Fixture[]> {
    try {
      const res = await apiPHP.post({ action: "fixtures", tournament: 31 });

      return res;
    } catch (error: any) {
      console.error(error);
      return error.message;
    }
  }
}

export default new FixtureService();
