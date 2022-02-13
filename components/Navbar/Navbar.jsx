import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Fragment, useEffect, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { checkDefaultAccount, modal } from "../../utils/recoil/atoms";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../public/logo/logo-full.png";
import MetaMaskOnboarding from "@metamask/onboarding";
import CheckAccount from "../../utils/wallet/CheckAccount";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import Link from "next/link";
import ShowWallet from "../Modal/Content/ShowWallet";

export default function Navbar() {
  const [open, setOpen] = useRecoilState(modal);
  const [buttonText, setButtonText] = useState("Install MetaMask");
  const [isDisabled, setDisabled] = useState(false);
  const [account, setAccounts] = useRecoilState(checkDefaultAccount);
  const onboarding = useRef();
  const router = useRouter();

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account.length > 0) {
        setButtonText("Connected");
        setDisabled(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText("Connect Wallet");
        setDisabled(false);
      }
    }
  }, [account]);

  CheckAccount();

  const onClick = async () => {
    const reqchainID = await window.ethereum.request({ method: "eth_chainId" });
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (reqchainID == process.env.CHAIN_ID) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((newAccounts) => setAccounts(newAccounts));
      } else {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: process.env.CHAIN_ID }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: process.env.CHAIN_ID,
                    chainName: process.env.NETWORK_NAME,
                    rpcUrls: [process.env.RPC_URL],
                    nativeCurrency: {
                      name: process.env.SYMBOL,
                      symbol: process.env.SYMBOL,
                      decimals: parseInt(process.env.DECIMALS),
                    },
                  },
                ],
              });
            } catch (addError) {
              console.log("Something Wrong");
            }
          }
        }
      }
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
    <Popover className="relative bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-3 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <a>
                <span className="sr-only">Workflow</span>
                <Image src={logo} width={150} height={55} alt="logo" />
              </a>
            </Link>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group
            as="nav"
            className="hidden md:flex space-x-10 items-center"
          >
            <Link href="/">
              <a
                className={
                  router.pathname === "/"
                    ? "font-semibold text-green-pf"
                    : "text-base font-medium text-black hover:text-green-pf"
                }
              >
                Home
              </a>
            </Link>
            <Link href="/stake">
              <a
                className={
                  router.pathname === "/stake"
                    ? "font-semibold text-green-pf"
                    : "text-base font-medium text-black hover:text-green-pf"
                }
              >
                Stake
              </a>
            </Link>

            <a
              href="/document/New_WhitePaper.pdf"
              target="_blank"
              className={
                router.pathname === "/whitepaper"
                  ? "font-semibold text-green-pf"
                  : "text-base font-medium text-black hover:text-green-pf"
              }
            >
              Whitepaper
            </a>
          </Popover.Group>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <button type="button" onClick={() => setOpen(!open)}>
              {account.length > 0
                ? account.toString().substring(0, 2).concat("...") +
                  account
                    .toString()
                    .substring(
                      account.toString().length - 4,
                      account.toString().length
                    )
                : ""}
            </button>
            <Button
              onClick={onClick}
              title={buttonText}
              disabled={isDisabled}
              customClasses="ml-8"
            />
          </div>
        </div>
      </div>

      <Modal open={open} setOpen={setOpen}>
        <ShowWallet />
      </Modal>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-50 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <Image src={logo} width={150} height={55} alt="logo" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div className="grid grid-cols-1 gap-y-4 gap-x-8">
                <Link href="/">
                  <a
                    className={
                      router.pathname === "/"
                        ? "font-semibold text-green-pf"
                        : "text-base font-medium text-black hover:text-green-pf"
                    }
                  >
                    Home
                  </a>
                </Link>
                <Link href="/stake">
                  <a
                    className={
                      router.pathname === "/stake"
                        ? "font-semibold text-green-pf"
                        : "text-base font-medium text-black hover:text-green-pf"
                    }
                  >
                    Stake
                  </a>
                </Link>
                <Link href="#">
                  <a
                    className={
                      router.pathname === "/docs"
                        ? "font-semibold text-green-pf"
                        : "text-base font-medium text-black hover:text-green-pf"
                    }
                  >
                    Docs
                  </a>
                </Link>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="mx-auto block"
                >
                  {account.length > 0
                    ? account.toString().substring(0, 2).concat("...") +
                      account
                        .toString()
                        .substring(
                          account.toString().length - 4,
                          account.toString().length
                        )
                    : ""}
                </button>
                <Button
                  onClick={onClick}
                  title={buttonText}
                  disabled={isDisabled}
                  customClasses="mt-3 items-center w-full flex"
                />
                <div className="flex items-center mt-3 justify-center">
                  <a
                    href="https://plastic.finance"
                    target="_blank"
                    className="text-sm text-green-pf"
                  >
                    Plastic Finance
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
