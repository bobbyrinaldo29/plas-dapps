import {
  bnbBalance,
  checkDefaultAccount,
  hodlBalance,
  modal,
  tokenBalance,
} from "../../utils/recoil/atoms";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InitialWeb3 from "../../utils/wallet/InitialWeb3";
import InitialContract from "../../utils/wallet/initialContract";

export default function Modal() {
  const [copyText, setCopyText] = useState("Copy");
  const [open, setOpen] = useRecoilState(modal);
  const [checkBnbBalance, setBnbBalance] = useRecoilState(bnbBalance);
  const [checkTokenBalance, setTokenBalance] = useRecoilState(tokenBalance);
  const [account] = useRecoilValue(checkDefaultAccount);
  const cancelButtonRef = useRef(null);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(account);
    setCopyText("Copied");
    setTimeout(function () {
      setCopyText("Copy");
    }, 5000);
  };

  useEffect(() => {
    if (account) {
      InitialWeb3.eth.subscribe("newBlockHeaders", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          InitialWeb3.eth.getBalance(account, function (error, wei) {
            if (!error) {
              let balance = InitialWeb3.utils.fromWei(wei, "ether");
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
  }, [account]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
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
                        <input
                          value={account}
                          type="text"
                          className="focus:ring-indigo-500 focus:border-indigo-500 block py-2.5 md:py-3 px-5 w-full sm:text-sm border-gray-300 rounded-l-full border-2"
                          readOnly
                        />
                        <div>
                          <button
                            onClick={copyToClipboard}
                            type="button"
                            className="bg-gray-300 py-3 px-5 rounded-r-full hover:rounded-r-full hover:bg-gray-300 flex items-center"
                          >
                            <FontAwesomeIcon icon={faCopy} />
                            <span>&nbsp;</span>
                            {copyText}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 text-left">
                      <p>BNB Balance: {checkBnbBalance || "loading..."} BNB</p>
                    </div>
                    <div className="mb-3 text-left">
                      <p>EDIPI Balance: {checkTokenBalance} EDIPI</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 mb-3 sm:px-6 sm:flex sm:justify-center">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-full border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
