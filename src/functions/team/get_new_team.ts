import type Team from "~/types/Team";
import type Results from "~/types/Results";

const get_new_team = (
  league_id: number,
  goal_diff: number,
  team: Team,
  results: Results
): Team => {
  return {
    id: team.id,
    name: team.name,
    logo: team.logo,
    points: results.points,
    goal_diff,
    wins: results.win,
    losses: results.lose,
    draws: results.draw,
    times_played: 1,
    league_id,
  };
};

export default get_new_team;
