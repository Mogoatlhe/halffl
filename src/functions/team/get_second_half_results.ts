import get_half_results from "./get_half_results";
import type Half_Score from "~/types/Half_Score";

const get_second_half_results = (
  ground: string,
  halftime_score: Half_Score,
  fulltime_score: Half_Score
) => {
  const half_score = {
    home: fulltime_score.home - halftime_score.home,
    away: fulltime_score.away - halftime_score.away,
  };
  return get_half_results(ground, half_score);
};

export default get_second_half_results;
