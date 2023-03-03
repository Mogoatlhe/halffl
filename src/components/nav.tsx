import Image from "next/image";
import logo from "./../../public/images/logo.png";
import ibm_plex_serif from "~/fonts/ibm_plex_serif";

const Nav = () => {
  return (
    <>
      <nav className="h-15 flex items-end gap-1 border-b border-zinc-900 bg-gradient-to-r from-[#be9a1c]/[.4] to-[#1E1E1E] p-3">
        <div className="relative h-8 w-8">
          <Image
            src={logo}
            alt="halffl logo"
            fill
            sizes="(max-width: 768px) 100px,
              (max-width: 1200px) 50vw,
              33vw"
          />
        </div>
        <p className={`${ibm_plex_serif.className} text-sm`}>halffl</p>
      </nav>
    </>
  );
};

export default Nav;
