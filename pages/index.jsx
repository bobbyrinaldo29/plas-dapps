import Button from "../components/Button/Button";
import Layout from "../components/Layout/Layout";
import InputNumber from "../components/Input/InputNumber";
import Selector from "../components/Selector/Selector";
import { useRecoilState, useRecoilValue } from "recoil";
import { checkDefaultAccount, modalHash, modalTx } from "../utils/recoil/atoms";
import InitialContract from "../utils/wallet/initialContract";
import InitialWeb3 from "../utils/wallet/InitialWeb3";
import { useState } from "react/cjs/react.development";
import Modal from "../components/Modal/Modal";
import ShowTx from "../components/Modal/Content/ShowTx";
import ModalHash from "../components/Modal/ModalHash";
import TxFailed from "../components/Modal/Content/TxFailed";
import TxSuccess from "../components/Modal/Content/TxSuccess";

export default function Home() {
  const [open, setOpen] = useRecoilState(modalTx);
  const [modalShow, setModalShow] = useRecoilState(modalHash);
  const [account] = useRecoilValue(checkDefaultAccount);
  const [inputNum, setInputNum] = useState("");
  const [txHash, setTxHash] = useState("");
  const [txError, setTxError] = useState({ code: "", message: "" });

  const handleChange = (e) => {
    setInputNum(e.target.value);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (account.length > 0) {
      if (e.target.value !== (0 || "")) {
        setOpen(true);
        InitialContract.methods.deposit().send(
          {
            from: account,
            gas: 3000000,
            value: InitialWeb3.utils.toWei(inputNum),
          },
          (err, transactionHash) => {
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
          }
        );
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
    setInputNum("");
  };

  return (
    <Layout>
      <div className="flex items-center h-screen w-full bg-slate-200">
        <form className="container w-96 mx-auto p-8" onSubmit={onHandleSubmit}>
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="mb-4">
              <div className="items-center">
                {/* <h3 className="ml-2">BUSD</h3> */}
                <Selector />
              </div>
              <InputNumber
                placeholder="Input amount here"
                onChange={handleChange}
                value={inputNum}
                id="exchange"
                required={true}
              />
              <label
                htmlFor="exchange"
                className="mb-1 mt-2 text-xs justify-end flex font-light"
              >
                Your Balance: 012301921
              </label>
            </div>
            <div className="mb-4">
              <div className="items-center">
                <Selector tokenName="EDIPI Token" image="plas" />
              </div>
              <InputNumber
                disabled={true}
                placeholder="You will receive"
                id="exchangeTo"
              />
            </div>
            <div className="mx-auto flex justify-center">
              <Button title="Swap" customClasses="w-full flex" />
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
    </Layout>
  );
}
