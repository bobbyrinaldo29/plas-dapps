import JSONABI from '../abi/ABI.json'
import InitialWeb3 from './InitialWeb3';

const InitialContract = new InitialWeb3.eth.Contract(JSONABI, '0xE2b2862A10A728daCA4F6AAd73c9fd6D1b36e363')

export default InitialContract;