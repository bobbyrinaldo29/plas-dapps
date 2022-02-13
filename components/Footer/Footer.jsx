import Image from "next/image";
import telegram from "../../public/logo/telegram.png";
import facebook from "../../public/logo/facebook.png";
import email from "../../public/logo/email.png";
import instagram from "../../public/logo/instagram.png";
import twitter from "../../public/logo/twitter.png";
import logoWhite from '../../public/logo/logo-pf-white.png'

const Footer = () => {
  return (
    <footer
      className="text-center text-white"
      style={{ backgroundColor: "#1d3564" }}
    >
      <div className="container pt-9">
        <div className="my-5">
          <Image src={logoWhite} width={150} height={55} alt="logo" />
        </div>
        <p className="text-xs text-gray-400 mb-5 px-5 mx-4 leading-6">
          As Always, Please DO YOUR OWN RESEARCH Before Investing Any Of Your
          Hard-Earned BNB Into These Projects And Never Invest More Than You Are
          Willing To Lose. PLEASE NOTE THAT WE CANNOT ACCEPT INVESTMENT FROM THE
          FOLLOWING COUNTRIES: Afghanistan, Albania, Bahamas, Barbados,
          Botswana, Cambodia, Canada, Cuba, Ghana, Iran (Islamic Republic Of),
          Iraq, Jamaica, Korea (The Democratic People’s Republic Of), Libya,
          Mauritius, Myanmar, Nicaragua, Panama, Pakistan, South Sudan, Sudan
          (North), Syrian Arab Republic, The Crimea, Trinidad And Tobago,
          Uganda, United States Of America, Vanuatu, Yemen, Zimbabwe;
          Jurisdictions In Which Participation Or Ownership Of Tokens Is
          Prohibited By Any Applicable Law; Jurisdictions Which Are Subject To
          United States, United Nations, Or Other Applicable Sanctions Or
          Embargoes.
        </p>
        <div className="flex justify-center mb-9">
          <a
            href="mailto:info@plastic.finance"
            className="mr-9 text-white opacity-75 hover:opacity-100 transition-opacity delay-150"
          >
            <Image src={email} width={15} height={15} alt="email" />
          </a>
          <a
            href="https://fb.com/plastic.finance"
            className="mr-9 text-white opacity-75 hover:opacity-100 transition-opacity delay-150"
          >
            <Image src={facebook} width={15} height={15} alt="facebook" />
          </a>
          <a
            href="https://twitter.com/plastic_finance"
            className="mr-9 text-white opacity-75 hover:opacity-100 transition-opacity delay-150"
          >
            <Image src={twitter} width={15} height={15} alt="twitter" />
          </a>
          <a
            href="https://t.me/plasticfinance"
            className="mr-9 text-white opacity-75 hover:opacity-100 transition-opacity delay-150"
          >
            <Image src={telegram} width={15} height={15} alt="telegram" />
          </a>
          <a
            href="https://instagram.com/plasticfinance"
            className="text-white opacity-75 hover:opacity-100 transition-opacity delay-150"
          >
            <Image src={instagram} width={15} height={15} alt="instagram" />
          </a>
        </div>
      </div>
      <div
        className="text-center text-gray-400 p-4 text-xs"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2021 &nbsp;
        <a
          className="text-green-pf hover:text-green-400"
          href="https://plastic.finance/"
        >
          {process.env.APP_NAME}
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
