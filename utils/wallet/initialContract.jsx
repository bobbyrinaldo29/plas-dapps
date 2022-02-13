import JSONABI from '../abi/ABI.json'
import InitialWeb3 from './InitialWeb3';

const InitialContract = new InitialWeb3.eth.Contract(JSONABI, process.env.EDIPI_ADDRESS)

export default InitialContract;