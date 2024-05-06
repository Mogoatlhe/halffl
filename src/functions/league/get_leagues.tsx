import type Response_Types from "~/types/Response_Types";

const get_leagues = (responses: Response_Types[]) => {
  const leagues = responses
    .filter((response) => response != null)
    .map((response) => {
      const league = response.league;

      return league;
    });

  // removes duplicates
  return leagues.filter(
    (league, index, self) =>
      index === self.findIndex((league_temp) => league.id === league_temp.id)
  );
};

export default get_leagues;
