import JSONABI from '../abi/ABI.json'
import InitialWeb3 from './InitialWeb3';

const InitialContract = new InitialWeb3.eth.Contract(JSONABI, '0x4c586De7521A5051A6c44130482Bb3ff7412476B')

export default InitialContract;