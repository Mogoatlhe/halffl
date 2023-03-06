import Image from "next/image";
import type { ChangeEvent } from "react";
import iceland from "~/fonts/iceland";
import inria_sans from "~/fonts/inria_sans";
import type League from "~/types/League";

const Leagues_Container = ({
  leagues,
  current_league,
  change_league,
}: {
  leagues: League[];
  current_league: number;
  change_league: (league_id: number) => void;
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    change_league(value);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget as HTMLButtonElement;
    const value = Number(button.value);
    change_league(value);
  };

  const get_league_options = leagues.map((league) => (
    <option key={league.id} value={league.id}>
      {league.name}
    </option>
  ));

  const get_league_buttons = leagues.map((league) => {
    const bg_color = league.id === current_league ? "bg-slate-100" : "bg-white";
    return (
      <button
        key={league.id}
        className={`grid w-64 grid-cols-4 items-center border border-r-0 border-amber-800 ${bg_color} p-4 font-bold shadow-lg`}
        type="button"
        onClick={handleClick}
        value={league.id}
      >
        <div className="grid gap-2">
          {/* <Image
          alt="country flag"
          src={league.flag}
          width={24}
          height={24}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        /> */}
          <Image
            alt="league logo"
            src={league.logo}
            width={24}
            height={24}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <p className="col-span-3">{league.name}</p>
      </button>
    );
  });

  return (
    <>
      <div className="flex h-12 flex-col justify-center border-b border-zinc-400 p-3 sm:h-16 lg:mt-6 lg:h-5/6 lg:w-80  lg:border lg:pr-0">
        <label
          className={`fonts-extrabold text-xs sm:text-sm ${inria_sans.className}`}
          htmlFor="leagues"
        >
          Leagues
        </label>
        <select
          value={current_league}
          id="leagues"
          className={`w-44 bg-white pl-3 text-sm sm:w-52 sm:text-base ${iceland.className} cursor-pointer lg:hidden`}
          onChange={handleChange}
        >
          {get_league_options}
        </select>
        <div className="hidden w-full gap-4 pt-4 text-sm lg:flex lg:flex-col lg:items-end">
          {get_league_buttons}
        </div>
      </div>
    </>
  );
};

export default Leagues_Container;
