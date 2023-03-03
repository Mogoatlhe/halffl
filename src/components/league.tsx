import iceland from "~/fonts/iceland";
import inria_sans from "~/fonts/inria_sans";
import type League from "~/types/League";

const Leagues_Container = ({ leagues }: { leagues: League[] }) => {
  const get_league_options = leagues.map((league) => (
    <option key={league.id} value={league.id}>
      {league.name}
    </option>
  ));

  return (
    <>
      <div className="flex h-12 flex-col justify-center border-b border-zinc-900 p-3">
        <label
          className={`fonts-extrabold text-xs ${inria_sans.className}`}
          htmlFor="leagues"
        >
          Leagues
        </label>
        <select
          id="leagues"
          className={`w-44 bg-white pl-3 text-sm ${iceland.className} cursor-pointer`}
        >
          {get_league_options}
        </select>
      </div>
    </>
  );
};

export default Leagues_Container;
