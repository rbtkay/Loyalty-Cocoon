import web3 from './web3';
import Loco from './build/Loco.json';

const instance = new web3.eth.Contract(
    JSON.parse(Loco.interface),
    '0xb888388dc2Cd2eB1FcBA84d5416e1EBb70ED4718'        // change this in favor of your contract address
);

console.log(instance);
export default instance;
