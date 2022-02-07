import InitialWeb3 from "./InitialWeb3";
import StakeABI from '../abi/StakeABI.json'

const initialStake = new InitialWeb3.eth.Contract(StakeABI, '0xb2A2B95D879AD7e632eAdA87cEb5C649c8Fff9E9')

export default initialStake;
