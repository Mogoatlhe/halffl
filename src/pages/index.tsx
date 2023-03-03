import type Team from "~/types/Team";
import type League from "~/types/League";
import get_teams from "~/functions/team/get_teams";
import get_leagues from "~/functions/league/get_leagues";
import get_football_api_data from "~/functions/request/get_football_api_data";

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
  const leagues_count = leagues.length;
  const max_allowed_req = 51840;

  return {
    props: { leagues, teams },
    revalidate: max_allowed_req * leagues_count,
  };
}

export default Home;
