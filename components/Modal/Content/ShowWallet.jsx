import {
  bnbBalance,
  checkDefaultAccount,
  modal,
  tokenBalance,
} from "../../../utils/recoil/atoms";
import { Fragment, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import InitialWeb3 from "../../../utils/wallet/InitialWeb3";
import InitialContract from "../../../utils/wallet/initialContract";
import { Dialog, Transition } from "@headlessui/react";
import { IoCopy } from "react-icons/io5";
import Image from "next/image";
import busd from "../../../public/logo/busd-logo.png";
import plas from "../../../public/logo/plas-logo.png";
import Button from "../../Button/Button";
import InputText from "../../Input/InputText";
import Loading from "../../Loading/Loading";

export default function ShowWallet() {
  const [copyText, setCopyText] = useState("Copy");
  const [open, setOpen] = useRecoilState(modal);
  const [checkBnbBalance, setBnbBalance] = useRecoilState(bnbBalance);
  const [checkTokenBalance, setTokenBalance] = useRecoilState(tokenBalance);
  const [account] = useRecoilValue(checkDefaultAccount);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(account);
    setCopyText("Copied");
    setTimeout(function () {
      setCopyText("Copy");
    }, 5000);
  };

  useEffect(() => {
    function wallet() {
      if (account) {
        InitialWeb3.eth.subscribe("newBlockHeaders", (err, result) => {
          if (err) {
            console.log(err);
          } else {
            InitialWeb3.eth.getBalance(account, function (error, wei) {
              if (!error) {
                let balance = Number(InitialWeb3.utils.fromWei(wei, "ether")).toFixed(4);
                setBnbBalance(balance);
              }
            });
  
            InitialContract.methods
              .balanceOf(account)
              .call()
              .then(InitialWeb3.utils.fromWei)
              .then(setTokenBalance);
          }
        });
      }
      return null;
    }
    wallet()
  }, [account]);

  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enterTo="opacity-100 translate-y-0 sm:scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:items-center">
            <div className="mt-3 text-center sm:mt-0 sm:text-center">
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 text-center font-bold mb-5 text-gray-900"
              >
                Your Wallet
              </Dialog.Title>
              <div>
                <label
                  htmlFor="price"
                  className="text-md block mb-3 font-medium text-gray-700 text-left"
                >
                  Wallet Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm mb-3 flex items-center">
                  <InputText
                    value={account}
                    readOnly="readOnly"
                    customClasses="rounded-none rounded-l-full block py-2.5 md:py-3 px-5 border-2"
                  />
                  <div>
                    <Button
                      icon={<IoCopy />}
                      title={copyText}
                      onClick={copyToClipboard}
                      customClasses="py-3 rounded-none rounded-r-full hover:rounded-r-full"
                    />
                  </div>
                </div>
              </div>
              <div className="py-4 text-left flex items-center gap-2">
                <Image src={busd} width={20} height={20} alt="busd" />
                {checkBnbBalance ? (
                  <div className="items-center text-right text-sm">
                    BNB Balance:{" "}
                    <span className="font-bold">{checkBnbBalance} BNB</span>
                  </div>
                ) : (
                  <Loading title="BNB Balance:" />
                )}
              </div>
              <div className="text-left flex items-center gap-2">
                <Image src={plas} width={20} height={20} alt="plas" />
                {checkTokenBalance ? (
                  <div className="items-center text-right text-sm">
                    EDIPI Balance:{" "}
                    <span className="font-bold">{checkTokenBalance} EDIPI</span>
                  </div>
                ) : (
                  <Loading title="EDIPI Balance:" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 py-3 mb-3 sm:px-6 sm:flex sm:justify-center">
          <Button
            type="button"
            title="CLOSE"
            onClick={() => setOpen(false)}
            customClasses="bg-red-600 hover:bg-red-400 w-full"
          />
        </div>
      </div>
    </Transition.Child>
  );
}
