import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkDefaultAccount, modalTx } from "../utils/recoil/atoms";
import Layout from "../components/Layout/Layout";
import Button from "../components/Button/Button";
import InitialStake from "../utils/wallet/initialStake";
import InitialWeb3 from "../utils/wallet/InitialWeb3";
import InputNumber from "../components/Input/InputNumber";
import MetaMaskOnboarding from "@metamask/onboarding";
import Modal from "../components/Modal/Modal";
import ShowTx from "../components/Modal/Content/ShowTx";
import spinner from "../public/spinner.svg";

const Stake = () => {
  const [open, setOpen] = useRecoilState(modalTx);
  const [account] = useRecoilValue(checkDefaultAccount);
  const [setAccounts] = useRecoilState(checkDefaultAccount);
  const [stakeBalance, setStakeBalance] = useState("");
  const [inputStake, setInputStake] = useState("");
  const onboarding = useRef();

  useEffect(() => {
    if (account) {
      InitialWeb3.eth.subscribe("newBlockHeaders", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          InitialStake.methods
            .stakeOf(account)
            .call()
            .then(InitialWeb3.utils.fromWei)
            .then(setStakeBalance);
        }
      });
    }
    return null;
  }, [account]);

  const handleChange = (e) => {
    setInputStake(e.target.value);
  };

  const onSubmitEvent = (e) => {
    e.preventDefault();
    if (account.length > 0) {
      if (e.target.value !== (0 || "")) {
        setOpen(true);
        InitialStake.methods
          .createStake(InitialWeb3.utils.toWei(inputStake))
          .send({ from: account }, (err, transactionHash) => {
            if (err) {
              console.log(err);
            }
            if (transactionHash !== null) {
              console.log(transactionHash);
              setOpen(false);
            }
          });
      } else {
        console.log("insert amount...");
      }
    } else {
      if (MetaMaskOnboarding.isMetaMaskInstalled()) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((newAccounts) => setAccounts(newAccounts));
      } else {
        onboarding.current.startOnboarding();
      }
    }
  };

  return (
    <Layout>
      <div className="flex items-center h-screen w-full bg-slate-200">
        <form className="container w-96 mx-auto p-8" onSubmit={onSubmitEvent}>
          <div className="bg-white rounded-3xl shadow-lg p-8">
            {stakeBalance ? (
              <div className="mb-5 items-center text-right text-sm">
                Stake Balance: {stakeBalance}
              </div>
            ) : (
              <div className="mb-5 items-center text-right text-sm">
                Stake Balance:{" "}
                <span className="animate-pulse bg-gray-500 px-2 rounded-full text-gray-500">
                  0.00
                </span>
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="stakeEDIPI" className="mb-1 block text-sm">
                Stake EDIPI
              </label>
              <InputNumber
                placeholder="Input amount here"
                id="stakeEDIPI"
                value={inputStake}
                onChange={handleChange}
                required={true}
              />
            </div>
            <div className="mx-auto flex justify-center">
              <Button
                title="Stake"
                type="submit"
                customClasses="w-full flex"
                disabled={open == true ? "disable" : null}
              />
            </div>
          </div>
        </form>
      </div>

      <Modal open={open} setOpen={() => setOpen(true)}>
        <ShowTx />
      </Modal>
    </Layout>
  );
};

export default Stake;
