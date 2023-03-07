import Image from "next/image";
import type League from "~/types/League";
import type Team from "~/types/Team";
import Team_Container from "./team";

const Table = ({
  teams,
  current_league,
  leagues,
}: {
  teams: Team[];
  current_league: number;
  leagues: League[];
}) => {
  const get_teams = teams
    .filter((team) => team.league_id === current_league)
    .map((team, i) => (
      <Team_Container key={team.id} team={team} index={i + 1} />
    ));

  const league = leagues.find((league) => league.id === current_league);

  return (
    <>
      <div className={`flex justify-center py-6  px-2 lg:mt-16 lg:pl-10`}>
        <div
          className={`grid w-full grid-cols-1 justify-items-center rounded-lg border border-zinc-400 px-3`}
        >
          <div
            className={`grid w-full grid-cols-8 items-center gap-2 border-b p-2 text-sm lg:grid-cols-9`}
          >
            <span className={`col-span-3 h-fit`}>club</span>
            <span className={`h-fit`}>
              <Image
                alt="league logo"
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                src={league!.logo}
                width={24}
                height={24}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </span>
            <span className={`h-fit`}>mp</span>
            <span className={`h-fit`}>w</span>
            <span className={`h-fit`}>l</span>
            <span className="hidden lg:block">gd</span>
            <span className={`h-fit`}>pts</span>
          </div>
          <div className={`w-full`}>{get_teams}</div>
        </div>
      </div>
    </>
  );
};

export default Table;
