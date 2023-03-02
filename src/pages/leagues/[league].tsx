import { useRouter } from "next/router";
import type Half_Score from "~/types/Half_Score";
import type Score from "~/types/Score";
import type Team from "~/types/Team";
import League from "~/types/League";
import type Response_Types from "~/types/Response_Types";
import type Api_Response from "~/types/Api_Response";

const League = () => {
  const router = useRouter();
  const { league } = router.query;

  return (
    <>
      <p>{league}</p>;
    </>
  );
};

export async function getStaticProps() {
  const responses = await get_football_api_data();
  const leagues = get_leagues(responses);

  return {
    props: { responses },
    revalidate: 1800,
  };
}
export function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const paths = [
    {
      params: { league: "epl" },
    },
  ];

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

const get_two_digit_month_number = (month_number: number) => {
  const num_of_digits = month_number.toString().length;
  const two_digit_month_num =
    num_of_digits === 1 ? `0${month_number}` : month_number;
  return two_digit_month_num;
};

const get_current_date = () => {
  const date = new Date();
  const month_number = date.getMonth() + 1;
  const two_digit_month_num = get_two_digit_month_number(month_number);
  return `${date.getFullYear()}-${two_digit_month_num}-${date.getDate()}`;
};

const get_football_api_urls = () => {
  const start_year = 2022;
  const from_date = "2022-07-01";
  const league_ids = [288, 39]; // , 140, 61, 135, 78, 88, 94];
  const current_date = get_current_date();

  const urls = league_ids.map(
    (league_id) =>
      `https://v3.football.api-sports.io/fixtures?league=${league_id}&season=${start_year}&to=${current_date}&from=${from_date}`
  );

  return urls;
};

const get_requests = (urls: string[]) => {
  return urls.map((url) =>
    fetch(url, {
      headers: {
        "x-rapidapi-key": process.env.FOOTBALL_API_KEY as string,
      },
    }).then((response) => response.json())
  );
};

const get_football_api_data = async () => {
  const urls = get_football_api_urls();
  const requests = get_requests(urls);
  const responses = await Promise.all<Api_Response>(requests);
  const combined_responses = responses
    .map((response) => response.response)
    .flat();

  return combined_responses;
};

const get_leagues = (responses: Response_Types[]) => {
  const leagues = responses.map((response) => {
    const league = response.league;

    return league;
  });

  // removes duplicates
  return leagues.filter(
    (league, index, self) =>
      index === self.findIndex((league_temp) => league.id === league_temp.id)
  );
};

const get_teams = (responses: Response_Types[]) => {
  const teams = Array(0) as Team[];
  const league_ids = responses.map((response) => response.league.id);

  let index = 0;
  for (const response of responses) {
    index += 1;
    const league_id = league_ids[index];
    const score = response.score;
    const response_teams = response.teams;

    // avoids having to change function call in multiple places.
    for (const key in response_teams) {
      if ((key === "home" || key === "away") && typeof league_id === "number")
        add_teams(teams, response_teams[key], league_id, score, key);
    }
  }

  return teams;
};

const add_teams = (
  teams: Team[],
  team: Team,
  league: number,
  score: Score,
  ground: string
) => {
  const goal_diff = get_goal_diff(ground, score);
  const results = get_fulltime_results(ground, score.halftime, score.fulltime);

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
    }

    return;
  }
};

const get_goal_diff = (ground: string, score: Score) => {
  const goal_diff =
    score.halftime.home -
    score.halftime.away +
    score.fulltime.home -
    score.fulltime.away;

  if (ground === "home") return goal_diff;
  return -goal_diff;
};

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
    }

    results.points = 0;
    results.lose = 1;
  } else {
    if (score < 0) {
      results.points = 3;
      results.win = 1;
    }

    results.points = 0;
    results.lose = 1;
  }

  return results;
};

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
    lose: firsthalf_results.win + secondhalf_results.lose,
    draw: firsthalf_results.win + secondhalf_results.draw,
  };
};

export default League;
