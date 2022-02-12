import Image from "next/image";
import busd from "../../public/logo/busd-logo.png";
import plas from "../../public/logo/plas-logo.png";
import tokenList from "../../utils/tokenList/tokenList.json";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Selector = (props) => {
  const [selectedToken, setSelectedToken] = useState(tokenList[0]);
  console.log(process.env.NEXT_PUBLIC_API_URL);
  return (
    <Listbox value={selectedToken} onChange={setSelectedToken}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="w-full mb-1 bg-white border border-none rounded-full pl-3 pr-10 py-2 text-left cursor-default focus:outline-none sm:text-sm">
              <span className="flex items-center">
                {props.tokenName ? (
                  <Image
                    src={plas}
                    width={20}
                    height={20}
                    alt="image"
                    className="flex-shrink-0 h-6 w-6 rounded-full"
                  />
                ) : (
                  <Image
                    src={busd}
                    width={20}
                    height={20}
                    alt="image"
                    className="flex-shrink-0 h-6 w-6 rounded-full"
                  />
                )}
                <span className="ml-3 block truncate">
                  {props.tokenName ? props.tokenName : selectedToken.name}
                </span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {props.tokenName
                  ? null
                  : tokenList.map((token) => (
                      <Listbox.Option
                        key={token.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "text-white bg-blue-pf"
                              : "text-gray-900",
                            "cursor-default select-none relative py-2 pl-3 pr-9"
                          )
                        }
                        value={token}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <Image
                                src={busd}
                                width={20}
                                height={20}
                                alt="image"
                                className="flex-shrink-0 h-6 w-6 rounded-full"
                              />
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {props.tokenName ? props.tokenName : token.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default Selector;
