import get_current_date from "../general/get_current_date";

const get_football_api_urls = () => {
  const start_year = 2024;
  const from_date = "2024-07-01";
  const league_ids = [288, 39, 140, 61, 135, 78, 88, 94];
  const current_date = get_current_date();

  const urls = league_ids.map(
    (league_id) =>
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${league_id}&season=${start_year}&from=${from_date}&to=${current_date}`
  );

  return urls;
};

export default get_football_api_urls;
