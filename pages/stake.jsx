import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { checkDefaultAccount } from "../utils/recoil/atoms";
import Layout from "../components/Layout/Layout";
import Button from "../components/Button/Button";
import InitialStake from "../utils/wallet/initialStake";
import InitialWeb3 from "../utils/wallet/InitialWeb3";
import InputNumber from "../components/Input/InputNumber";

const Stake = () => {
  const [account] = useRecoilValue(checkDefaultAccount);
  const [stakeBalance, setStakeBalance] = useState("");

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

  return (
    <Layout>
      <div className="flex items-center h-screen w-full bg-slate-200">
        <form className="container w-96 mx-auto p-8">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h1 className="mb-5 items-center text-right text-sm">
              Your Balance: {stakeBalance || "0"}
            </h1>
            <div className="mb-4">
              <label htmlFor="stakeEDIPI" className="mb-1 block text-sm">
                Stake EDIPI
              </label>
              <InputNumber placeholder="Input amount here" id="stakeEDIPI" />
            </div>
            <div className="mx-auto flex justify-center">
              <Button title="Stake" customClasses="w-full flex" />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Stake;
