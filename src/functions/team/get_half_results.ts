import type Half_Score from "~/types/Half_Score";

const get_half_results = (ground: string, half_score: Half_Score) => {
  const score = half_score.home - half_score.away;

  const results = {
    points: 0,
    win: 0,
    lose: 0,
    draw: 0,
  };

  if (score === 0) {
    results.points = 1;
    results.draw = 1;
  } else if (ground === "home") {
    if (score > 0) {
      results.points = 3;
      results.win = 1;
    } else {
      results.points = 0;
      results.lose = 1;
    }
  } else {
    if (score < 0) {
      results.points = 3;
      results.win = 1;
    } else {
      results.points = 0;
      results.lose = 1;
    }
  }

  return results;
};

export default get_half_results;
