import apiPHP from "./api-php";

class FixtureService {
  async getFixtures(): Promise<Fixture[]> {
    try {
      const res = await apiPHP.post({ action: "fixtures", seasonid: 30 });
      console.log(res);
      return res;
    } catch (error: any) {
      console.error(error);
      return error.message;
    }
  }
}

export default new FixtureService();
