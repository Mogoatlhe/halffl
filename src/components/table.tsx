import type Team from "~/types/Team";
import Team_Container from "./team";

const Table = ({
  teams,
  current_league,
}: {
  teams: Team[];
  current_league: number;
}) => {
  const get_teams = teams
    .filter((team) => team.league_id === current_league)
    .map((team, i) => (
      <Team_Container key={team.id} team={team} index={i + 1} />
    ));

  return (
    <>
      <div className={`flex justify-center py-6 px-2`}>
        <div
          className={`grid w-full grid-cols-1 justify-items-center rounded-lg border border-zinc-400 px-3`}
        >
          <div
            className={`grid w-full grid-cols-8 gap-2 border-b p-2 text-sm lg:grid-cols-9`}
          >
            <span className={`col-span-3`}>club</span>
            <span>mp</span>
            <span>w</span>
            <span>d</span>
            <span>l</span>
            <span className="hidden lg:block">gd</span>
            <span>pts</span>
          </div>
          <div className={`w-full`}>{get_teams}</div>
        </div>
      </div>
    </>
  );
};

export default Table;
