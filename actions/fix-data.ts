export const rugbyData = (data: FixtureData) => {
  const details = data["fixture"][0];
  const scores = data["scores"];
  // const home = data["home"];
  // const away = data["away"];

  const fixture = {} as Details;

  fixture["homeId"] = details.team1_id;
  fixture["awayId"] = details.team2_id;
  fixture["home"] = details.team1_name;
  fixture["away"] = details.team2_name;
  fixture["homeScore"] = scores.Home;
  fixture["awayScore"] = scores.Away;
  fixture["league"] = details.league;
  fixture["round"] = details.matchday;
  fixture["status"] = details.game_status;
  fixture["minute"] = details.minute;

  // getEvent(home, "44");

  const rugbyData = {} as RugbyData;

  rugbyData["details"] = fixture;

  // console.log(rugbyData);
  return rugbyData;
};
