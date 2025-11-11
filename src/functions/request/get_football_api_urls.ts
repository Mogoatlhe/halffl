import get_current_date from "../general/get_current_date";

const get_football_api_urls = () => {
  const now = new Date();
  const start_year = now.getFullYear();
  const current_date = get_current_date();
  const league_ids = [288, 39, 140, 61, 135, 78, 88, 94];

  // automatically resets date every year
  // but has no data between `year-07-01` and start of league
  const from_date = new Date(`${start_year}-07-01`) > new Date(current_date) 
    ? `${start_year - 1}-07-01` : `${start_year}-07-01`;

  const urls = league_ids.map(
    (league_id) =>
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${league_id}&season=${start_year}&from=${from_date}&to=${current_date}`
  );

  return urls;
};

export default get_football_api_urls;
