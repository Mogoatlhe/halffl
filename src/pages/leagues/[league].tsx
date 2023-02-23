import { useRouter } from "next/router";

const League = () => {
  const router = useRouter();
  const {league} = router.query;
  
  return <p>{league}</p>;
}

export async function getStaticProps(){
  const responses = await get_football_api_data();
  return {
    props: {responses},
    revalidate: 1800
  }
}

const get_two_digit_month_number = (month_number: number) => {
  const num_of_digits = month_number.toString().length;
  const two_digit_month_num = num_of_digits === 1 ? `0${month_number}` : month_number;
  return two_digit_month_num;
}

const get_current_date = () => {
  const date = new Date();
  const month_number = date.getMonth() + 1;
  const two_digit_month_num = get_two_digit_month_number(month_number);
  return `${date.getFullYear()}-${two_digit_month_num}-${date.getDate()}`;
}

const get_football_api_urls = () => {
  const start_year = 2022;
  const league_ids = [288, 39, 140, 61, 135, 78, 88, 94];
  const current_date = get_current_date();
  
  const urls = league_ids.map(
    (league_id) =>
      `https://v3.football.api-sports.io/fixtures?league=${league_id}&season=${start_year}&to=${current_date}`
  );

  return urls;
};

const get_requests = (urls: string[]) => {
  return urls.map((url) => fetch(url));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const get_football_api_data = async () => {
  const urls = get_football_api_urls();
  const requests = get_requests(urls);
  const responses = await Promise.all(requests);

  return responses;
};

export default League;