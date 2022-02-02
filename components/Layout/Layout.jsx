import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";

const Layout = (props) => {
  return (
    <>
      <Header />
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
