import InitialWeb3 from "./InitialWeb3";
import StakeABI from '../abi/StakeABI.json'

const initialStake = new InitialWeb3.eth.Contract(StakeABI, '0xD178f2C737B02C57B27366187337734491AEAb6F')

export default initialStake;
