import Image from "next/image";
import type Team from "~/types/Team";

const Team_Container = ({ team, index }: { team: Team; index: number }) => {
  return (
    <div className={`grid w-full grid-cols-8 gap-2 p-2 text-sm`}>
      <div className="col-span-3 flex whitespace-nowrap">
        <p>{`${index}`}</p>
        <div className="h-4/12 relative w-7/12 border border-blue-700">
          <Image
            src={`/media${team.logo.substring(team.logo.lastIndexOf("/"))}`}
            alt={`${team.name} logo`}
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
        {/* <p>{`${team.name}`}</p> */}
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
