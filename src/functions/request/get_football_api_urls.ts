import get_current_date from "../general/get_current_date";

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

export default get_football_api_urls;
