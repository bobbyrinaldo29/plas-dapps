import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import loading from "../../../public/loading.gif";
import Image from "next/image";

export default function ShowTx() {
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
        <div className="bg-white-pf">
          <div className="sm:items-center">
            <div className="mt-3 text-center sm:mt-0 sm:text-center">
              <button
                as="h3"
                type="button"
                className="text-lg leading-6 text-center items-center font-bold pt-5 text-gray-900"
              >
                Waiting for confirmation
              </button>
              <h4 className="text-sm">
                Confirm this transaction in your wallet
              </h4>
              <div className="h-64 relative">
                <Image
                  src={loading}
                  alt="Picture of the author"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition.Child>
  );
}
