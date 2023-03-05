import type Score from "~/types/Score";

const get_goal_diff = (ground: string, score: Score) => {
  const goal_diff = score.fulltime.home - score.fulltime.away;

  if (ground === "home") return goal_diff;
  return -1 * goal_diff;
};

export default get_goal_diff;
