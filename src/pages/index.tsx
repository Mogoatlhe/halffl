import type Api_Response from "~/types/Api_Response";
import get_teams from "~/functions/team/get_teams";
import type League from "~/types/League";
import type Team from "~/types/Team";
import get_leagues from "~/functions/league/get_leagues";

let leagues_count: number;

const Home = ({ leagues, teams }: { leagues: League; teams: Team }) => {
  return (
    <>
      <p>lol</p>
    </>
  );
};

export async function getStaticProps() {
  const responses = await get_football_api_data();
  const leagues = get_leagues(responses);
  const teams = get_teams(responses);
  const max_allowed_req = 51840;

  return {
    props: { leagues, teams },
    revalidate: max_allowed_req * leagues_count,
  };
}

const get_two_digit_date_number = (date_number: number) => {
  const num_of_digits = date_number.toString().length;
  const two_digit_month_num =
    num_of_digits === 1 ? `0${date_number}` : date_number;
  return two_digit_month_num;
};

const get_current_date = () => {
  const date = new Date();
  const month_number = date.getMonth() + 1;
  const two_digit_month_num = get_two_digit_date_number(month_number);
  const two_digit_day_num = get_two_digit_date_number(date.getDate());
  return `${date.getFullYear()}-${two_digit_month_num}-${two_digit_day_num}`;
};

const get_football_api_urls = () => {
  const start_year = 2022;
  const from_date = "2022-07-01";
  const league_ids = [288, 39]; // , 140, 61, 135, 78, 88, 94];
  const current_date = get_current_date();
  leagues_count = league_ids.length;

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

export default Home;
