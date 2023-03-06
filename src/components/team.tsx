import Image from "next/image";
import type Team from "~/types/Team";

const Team_Container = ({ team, index }: { team: Team; index: number }) => {
  return (
    <div className={`grid w-full grid-cols-8 gap-2 px-1 py-2 text-sm`}>
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
      <span>{team.times_played}</span>
      <span>{team.wins}</span>
      <span>{team.draws}</span>
      <span>{team.losses}</span>
      <span>{team.points}</span>
    </div>
  );
};

export default Team_Container;
