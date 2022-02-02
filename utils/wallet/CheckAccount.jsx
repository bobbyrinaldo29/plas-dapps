import MetaMaskOnboarding from "@metamask/onboarding";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { checkDefaultAccount } from "../recoil/atoms";

const CheckAccount = () => {
  const [account, setAccounts] = useRecoilState(checkDefaultAccount);

  useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_accounts" })
        .then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        window.ethereum.removeListener("accountsChanged", handleNewAccounts);
      };
    }
  }, []);
};

export default CheckAccount;
