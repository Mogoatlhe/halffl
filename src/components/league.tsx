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

  const get_league_options = leagues.map((league) => (
    <option key={league.id} value={league.id}>
      {league.name}
    </option>
  ));

  const get_league_buttons = leagues.map((league) => (
    <button
      key={league.id}
      className="w-52 border border-r-0 border-amber-800 p-4 font-bold shadow-lg"
    >
      {league.name}
    </button>
  ));

  return (
    <>
      <div className="flex h-12 flex-col justify-center border-b border-zinc-400 p-3 sm:h-16 lg:mt-6 lg:h-5/6 lg:w-72  lg:border lg:pr-0">
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
