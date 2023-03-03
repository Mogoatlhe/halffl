import type Team from "~/types/Team";

const Table = ({ teams }: { teams: Team[] }) => {
  return (
    <>
      <div className={`flex justify-center py-6 px-2`}>
        <div
          className={`grid w-full grid-cols-1 justify-items-center rounded-lg border border-zinc-900 px-3`}
        >
          <div className={`grid w-full grid-cols-8 gap-2 p-2 text-sm`}>
            <span className={`col-span-3`}>club</span>
            <span>mp</span>
            <span>w</span>
            <span>d</span>
            <span>l</span>
            <span>pts</span>
          </div>
          <hr className={`h-px w-11/12 border-0 bg-zinc-900`} />
        </div>
      </div>
    </>
  );
};

export default Table;
