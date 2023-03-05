import type Team from "~/types/Team";
import type Response_Types from "~/types/Response_Types";
import add_teams from "./add_teams";
import sort_teams_by_points from "./sort_teams_by_points";

const get_teams = (responses: Response_Types[]) => {
  const teams = Array(0) as Team[];
  const league_ids = responses.map((response) => response.league.id);

  let index = 0;
  for (const response of responses) {
    const league_id = league_ids[index];
    const score = response.score;
    const response_teams = response.teams;
    index += 1;

    // avoids having to change function call in multiple places.
    for (const key in response_teams) {
      if ((key === "home" || key === "away") && typeof league_id === "number") {
        if (
          score.halftime.away === null ||
          score.halftime.home === null ||
          score.fulltime.away === null ||
          score.fulltime.home === null
        )
          continue;
        add_teams(teams, response_teams[key], league_id, score, key);
      }
    }
  }

  sort_teams_by_points(teams);
  return teams;
};

export default get_teams;
