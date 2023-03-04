import type Half_Score from "~/types/Half_Score";
import get_half_results from "./get_half_results";

const get_fulltime_results = (
  ground: string,
  halftime_score: Half_Score,
  fulltime_score: Half_Score
) => {
  const firsthalf_results = get_half_results(ground, halftime_score);
  const secondhalf_results = get_half_results(ground, fulltime_score);

  return {
    points: firsthalf_results.points + secondhalf_results.points,
    win: firsthalf_results.win + secondhalf_results.win,
    lose: firsthalf_results.lose + secondhalf_results.lose,
    draw: firsthalf_results.draw + secondhalf_results.draw,
  };
};

export default get_fulltime_results;
