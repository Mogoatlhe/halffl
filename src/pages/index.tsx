import type Team from "~/types/Team";
import type League from "~/types/League";
import get_teams from "~/functions/team/get_teams";
import get_leagues from "~/functions/league/get_leagues";
import get_football_api_data from "~/functions/request/get_football_api_data";
import Header from "~/components/header";
import Leagues_Container from "~/components/league";
import Table from "~/components/table";
import { useState } from "react";

const Home = ({ leagues, teams }: { leagues: League[]; teams: Team[] }) => {
  const default_league_id = 288;
  const [current_league, set_current_league] = useState(default_league_id);

  const change_league = (league_id: number): void => {
    set_current_league(league_id);
  };

  return (
    <>
      <Header title="halffl" />
      <Leagues_Container
        leagues={leagues}
        change_league={change_league}
        current_league={current_league}
      />
      <Table teams={teams} current_league={current_league} />
    </>
  );
};

export async function getStaticProps() {
  const responses = await get_football_api_data();
  const leagues = get_leagues(responses);
  const teams = get_teams(responses);
  const leagues_count = 2; //leagues.length;
  const max_allowed_req = 51840;

  return {
    props: { leagues, teams },
    revalidate: max_allowed_req * leagues_count,
  };
}

export default Home;
