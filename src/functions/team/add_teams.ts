import type Team from "~/types/Team";
import type Score from "~/types/Score";
import get_goal_diff from "./get_goal_diff";
import get_fulltime_results from "./get_fulltime_results";
import get_new_team from "./get_new_team";
import get_half_results from "./get_half_results";

const add_teams = (
  teams: Team[],
  team: Team,
  league_id: number,
  score: Score,
  ground: string
) => {
  const goal_diff = get_goal_diff(ground, score);
  const results = get_fulltime_results(ground, score.halftime, score.fulltime);
  const real_league_results = get_half_results(ground, score.fulltime);

  const existing_team_index = teams.findIndex((t) => t.id === team.id);

  if (existing_team_index !== -1) {
    const existing_team = teams[existing_team_index];

    if (existing_team !== undefined && existing_team.goal_diff !== undefined) {
      existing_team.goal_diff += goal_diff;
      existing_team.points += results.points;
      existing_team.draws += results.draw;
      existing_team.wins += results.win;
      existing_team.losses += results.lose;
      existing_team.times_played += 1;
      existing_team.real_league_points += real_league_results.points;
    }

    return;
  }

  const real_league_points = real_league_results.points;
  const new_team = get_new_team(
    league_id,
    goal_diff,
    team,
    results,
    real_league_points
  );
  teams.push(new_team);
};

export default add_teams;
