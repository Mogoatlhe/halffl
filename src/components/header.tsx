import Head from "next/head";
import Nav from "./nav";

const Header = ({ title }: { title: string }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
    </>
  );
};

export default Header;
