import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkDefaultAccount, modalHash, modalTx } from "../utils/recoil/atoms";
import Button from "../components/Button/Button";
import InitialStake from "../utils/wallet/initialStake";
import InitialWeb3 from "../utils/wallet/InitialWeb3";
import InputNumber from "../components/Input/InputNumber";
import MetaMaskOnboarding from "@metamask/onboarding";
import Modal from "../components/Modal/Modal";
import ShowTx from "../components/Modal/Content/ShowTx";
import plas from "../public/logo/plas-logo.png";
import Loading from "../components/Loading/Loading";
import Image from "next/image";
import ModalHash from "../components/Modal/ModalHash";
import TxSuccess from "../components/Modal/Content/TxSuccess";
import TxFailed from "../components/Modal/Content/TxFailed";

const Stake = () => {
  const [open, setOpen] = useRecoilState(modalTx);
  const [modalShow, setModalShow] = useRecoilState(modalHash);
  const [account] = useRecoilValue(checkDefaultAccount);
  const [setAccounts] = useRecoilState(checkDefaultAccount);
  const [stakeBalance, setStakeBalance] = useState("");
  const [inputStake, setInputStake] = useState("");
  const [txHash, setTxHash] = useState("");
  const [txError, setTxError] = useState({ code: "", message: "" });
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
              setTxError({ code: err.code, message: err.message });
              console.log(err);
            }
            if (transactionHash !== null) {
              setTxHash(transactionHash);
              console.log(transactionHash);
              setOpen(false);
              setTimeout(() => {
                setModalShow(true);
              }, 3000);
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
    <>
      <div className="flex items-center h-screen w-full bg-slate-200">
        <form className="container w-96 mx-auto p-8" onSubmit={onSubmitEvent}>
          <div className="bg-white rounded-3xl shadow-lg p-8">
            {stakeBalance ? (
              <div className="mb-5 items-center text-right text-sm">
                Stake Balance: {stakeBalance}
              </div>
            ) : (
              <Loading title="Stake Balance:" />
            )}
            <div className="mb-4 mt-3">
              <div className="flex items-center mb-2 gap-1">
                <Image src={plas} width={20} height={20} alt="plas" />
                <label htmlFor="stakeEDIPI" className="text-sm">
                  Stake EDIPI
                </label>
              </div>
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
      <ModalHash modalShow={modalShow} setModalShow={() => setModalShow(true)}>
        {txHash ? (
          <TxSuccess linkHash={txHash} />
        ) : (
          <TxFailed errorMessage={txError.message} errorCode={txError.code} />
        )}
      </ModalHash>
    </>
  );
};

export default Stake;
