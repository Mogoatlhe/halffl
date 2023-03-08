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
  const default_league_id = 39;
  const [current_league, set_current_league] = useState(default_league_id);

  const change_league = (league_id: number): void => {
    set_current_league(league_id);
  };

  return (
    <>
      <Header title="halffl" />
      <div className="flex flex-col lg:w-full lg:flex-row lg:gap-6 lg:pr-6">
        <Leagues_Container
          leagues={leagues}
          change_league={change_league}
          current_league={current_league}
        />
        <div className="w-full">
          <Table
            teams={teams}
            current_league={current_league}
            leagues={leagues}
          />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const responses = await get_football_api_data();
  const leagues = get_leagues(responses);
  const teams = get_teams(responses);
  const leagues_count = leagues.length;

  const max_requests_per_second = 864; // seconds in a day / allowed requests per day ( 86400 / 100 )
  const max_batch_requests_per_second = max_requests_per_second * leagues_count;

  if (typeof leagues_count !== "number" || leagues_count === 0) {
    throw new Error("failed fetch");
  }

  return {
    props: { leagues, teams },
    revalidate: max_batch_requests_per_second,
  };
}

export default Home;
