import type Score from "~/types/Score";

const get_goal_diff = (ground: string, score: Score) => {
  const goal_diff =
    score.halftime.home -
    score.halftime.away +
    score.fulltime.home -
    score.fulltime.away;

  if (ground === "home") return goal_diff;
  return -goal_diff;
};

export default get_goal_diff;
