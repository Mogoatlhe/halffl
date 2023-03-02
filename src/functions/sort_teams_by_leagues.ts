import type Team from "~/types/Team";

const sort_teams_by_leagues = (teams: Team[]) => {
  teams.sort((team_1, team_2) => {
    if (team_1.league_id < team_2.league_id) {
      return -1;
    } else if (team_1.league_id > team_2.league_id) {
      return 1;
    }

    return 0;
  });
};

export default sort_teams_by_leagues;
