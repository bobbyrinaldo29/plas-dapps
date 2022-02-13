import InitialWeb3 from "./InitialWeb3";
import StakeABI from '../abi/StakeABI.json'

const initialStake = new InitialWeb3.eth.Contract(StakeABI, process.env.EDIPI_STAKE)

export default initialStake;
