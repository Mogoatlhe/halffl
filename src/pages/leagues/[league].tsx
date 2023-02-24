import { useRouter } from "next/router";

type League = {
  league: {
    id: number,
    name: string,
    country: string,
    logo: string,
    flag: string,
  }
}

type Response_Types = League;

type Api_Response = {
  response: [
    Response_Types
  ]
}

const League = () => {
  const router = useRouter();
  const {league} = router.query;
  
  return (
    <>
      <p>{league}</p>;
    </>
  )
}

export async function getStaticProps(){
  const responses = await get_football_api_data();
  const leagues = get_leagues(responses);
  console.log(leagues[1]);
  
  return {
    props: {responses},
    revalidate: 1800
  }
}
export  function getStaticPaths() {

  // Get the paths we want to pre-render based on posts
  const paths = [{
    params: { league: "epl" },
  }]

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: 'blocking' }
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
  const from_date = "2022-07-01"
  const league_ids = [288, 39]; // , 140, 61, 135, 78, 88, 94];
  const current_date = get_current_date();
  
  const urls = league_ids.map(
    (league_id) =>
      `https://v3.football.api-sports.io/fixtures?league=${league_id}&season=${start_year}&to=${current_date}&from=${from_date}`
  );

  return urls;
};

const get_requests = (urls: string[]) => {
  return urls.map((url) => fetch(url, {
    headers: {
      'x-rapidapi-key': process.env.FOOTBALL_API_KEY as string
    }
  }).then(response => response.json()));
};

const get_football_api_data = async () => {
  const urls = get_football_api_urls();
  const requests = get_requests(urls);
  const responses = await Promise.all<Api_Response>(requests);
  const combined_responses = responses.map(response => response.response).flat();
  console.log(combined_responses[0])

  return combined_responses;
};

const get_leagues = (responses: Response_Types []) => {
  const leagues = responses.map(response => {
    return response.league
  });

  // removes duplicates
  return leagues.filter((league, index, self) => index === self.findIndex(league_temp => league.id === league_temp.id));
}

export default League;