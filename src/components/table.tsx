import Image from "next/image";
import sort_teams_by_points from "~/functions/team/sort_teams_by_points";
import sort_teams_by_real_league_points from "~/functions/team/sort_teams_by_real_points";
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
  const get_teams_by_league = teams.filter(
    (team) => team.league_id === current_league
  );
  const sort_teams_by_real_points = sort_teams_by_real_league_points(
    get_teams_by_league
  ).map((team, i) => {
    team.position = i + 1;
    return team;
  });
  const get_teams = sort_teams_by_points(sort_teams_by_real_points).map(
    (team, i) => {
      const index = i + 1;
      let text_colour = null;

      if (index > team.position) text_colour = "text-red-500";
      else if (index < team.position) text_colour = "text-green-400";
      else text_colour = "text-slate-500";

      return (
        <Team_Container
          key={team.id}
          team={team}
          index={index}
          text_colour={text_colour}
        />
      );
    }
  );

  const league = leagues.find((league) => league.id === current_league);

  return (
    <>
      <div className={`flex justify-center py-6  px-2 lg:mt-16 lg:pl-10`}>
        <div
          className={`grid w-full grid-cols-1 justify-items-center rounded-lg border border-zinc-400 px-3`}
        >
          <div
            className={`grid w-full grid-cols-8 items-center gap-2 border-b p-2 text-sm sm:grid-cols-9 lg:grid-cols-10`}
          >
            <span className={`col-span-3 h-fit`}>club</span>
            <span className={`h-fit justify-self-center`}>mp</span>
            <span className={`h-fit justify-self-center`}>w</span>
            <span className={`hidden h-fit justify-self-center sm:block`}>
              d
            </span>
            <span className={`h-fit justify-self-center`}>l</span>
            <span className="hidden justify-self-center lg:block">gd</span>
            <span className={`h-fit justify-self-center`}>pts</span>
            <span className={`h-fit justify-self-center`}>
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
          </div>
          <div className={`w-full`}>{get_teams}</div>
        </div>
      </div>
    </>
  );
};

export default Table;
