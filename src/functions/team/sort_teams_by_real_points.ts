import type Team from "~/types/Team";

const sort_teams_by_real_league_points = (teams: Team[]) => {
  const temp_teams = JSON.parse(JSON.stringify(teams)) as Team[];
  temp_teams.sort((team_1, team_2) => {
    if (team_1.real_league_points > team_2.real_league_points) return -1;

    if (team_1.real_league_points < team_2.real_league_points) return 1;

    if (team_1.goal_diff > team_2.goal_diff) return -1;

    if (team_1.goal_diff < team_2.goal_diff) return 1;

    return 0;
  });

  return temp_teams;
};

export default sort_teams_by_real_league_points;
