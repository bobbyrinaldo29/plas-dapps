import Head from "next/head";

const Header = () => {

  return (
      <Head>
          <title>{process.env.APP_NAME} Dapps</title>
          <link rel="icon" href="/favicon-pf.png" />
      </Head>
  )
};

export default Header;
