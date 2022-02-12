import Image from 'next/image';
import telegram from '../../public/logo/telegram.png'
import facebook from '../../public/logo/facebook.png'
import email from '../../public/logo/email.png'
import instagram from '../../public/logo/instagram.png'
import twitter from '../../public/logo/twitter.png'

const Footer = () => {
  return (
    <footer
      className="text-center text-white"
      style={{ backgroundColor: "#1d3564" }}
    >
      <div className="container pt-9">
        <div className="flex justify-center mb-9">
          <a href="mailto:info@plastic.finance" className="mr-9 text-white opacity-75 hover:opacity-100 transition-opacity delay-150">
            <Image src={email} width={15} height={15} />
          </a>
          <a href="https://fb.com/plastic.finance" className="mr-9 text-white opacity-75 hover:opacity-100 transition-opacity delay-150">
            <Image src={facebook} width={15} height={15} />
          </a>
          <a href="https://twitter.com/plastic_finance" className="mr-9 text-white opacity-75 hover:opacity-100 transition-opacity delay-150">
            <Image src={twitter} width={15} height={15} />
          </a>
          <a href="https://t.me/plasticfinance" className="mr-9 text-white opacity-75 hover:opacity-100 transition-opacity delay-150">
            <Image src={telegram} width={15} height={15} />
          </a>
          <a href="https://instagram.com/plasticfinance" className="text-white opacity-75 hover:opacity-100 transition-opacity delay-150">
            <Image src={instagram} width={15} height={15} />
          </a>
        </div>
      </div>
      <div
        className="text-center text-white p-4 text-xs"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2021 Copyright &nbsp;
        <a className="text-green-pf hover:text-green-400" href="https://plastic.finance/">
          {process.env.APP_NAME}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
