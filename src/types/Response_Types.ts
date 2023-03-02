import type League from "./League";
import type Team from "./Team";
import type Score from "./Score";

type Response_Types = {
  league: League;
  teams: { home: Team; away: Team };
  score: Score;
};

export default Response_Types;
