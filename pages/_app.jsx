import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
