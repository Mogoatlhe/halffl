import Image from "next/image";
import type Team from "~/types/Team";

const Team_Container = ({
  team,
  index,
  text_colour,
}: {
  team: Team;
  index: number;
  text_colour: string;
}) => {
  return (
    <div
      className={`grid w-full grid-cols-8 content-center gap-2 border-b px-1 py-2 text-sm sm:grid-cols-9 lg:grid-cols-10`}
    >
      <div className="col-span-3 flex items-center gap-2">
        <div className="flex">
          <p className="flex w-10 justify-center">{`${index}`}</p>
          <Image
            alt="Next.js logo"
            src={team.logo}
            width={24}
            height={24}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <p className="w-16 truncate whitespace-nowrap sm:w-36">{`${team.name}`}</p>
      </div>
      <span className="self-center justify-self-center">
        {team.times_played}
      </span>
      <span className="justify-self-center">{team.wins}</span>
      <span className="hidden justify-self-center sm:block">{team.draws}</span>
      <span className="justify-self-center">{team.losses}</span>
      <span className="hidden justify-self-center lg:block">
        {team.goal_diff}
      </span>
      <span className="justify-self-center">{team.points}</span>
      <span className={`${text_colour} justify-self-center font-semibold`}>
        {team.position}
      </span>
    </div>
  );
};

export default Team_Container;
