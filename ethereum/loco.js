import web3 from './web3';
import Loco from './build/Loco.json';

const instance = new web3.eth.Contract(
    JSON.parse(Loco.interface),
    '0x3D10e926AE7191822eBD658fCb39270763E5cBb0'        // change this in favor of your contract address
);

export default instance;
