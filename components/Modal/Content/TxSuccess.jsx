import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FaArrowUp } from "react-icons/fa";
import Button from "../../Button/Button";
import { useRecoilState } from "recoil";
import { modalHash } from "../../../utils/recoil/atoms";

const TxSuccess = (props) => {
  const [modalShow, setModalHash] = useRecoilState(modalHash);
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
                Transaction Submitted
              </Dialog.Title>
              <div className="items-center flex justify-center py-6">
                <div className="animate-bounce bg-green-pf rounded-full px-4 py-4">
                  <FaArrowUp className="text-white text-2xl" />
                </div>
              </div>
              <div className="pb-4 text-center">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={"https://testnet.bscscan.com/tx/" + props.linkHash}
                  className="transition duration-300 ease-in-out whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border-2 rounded-full shadow-sm text-sm font-medium border-green-pf text-green-pf hover:bg-green-pf hover:text-white hover:shadow-lg"
                >
                  View On BscScan
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white px-4 py-3 mb-3 sm:px-6 sm:flex sm:justify-center">
          <Button
            type="button"
            title="CLOSE"
            onClick={() => setModalHash(false)}
            customClasses="bg-red-600 hover:bg-red-400 w-full"
          />
        </div>
      </div>
    </Transition.Child>
  );
};

export default TxSuccess;
