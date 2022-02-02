import Web3 from "web3";

const InitialWeb3 = new Web3(Web3.givenProvider || process.env.RPC_URL);

export default InitialWeb3;