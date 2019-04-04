import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') { // typeof serves to check whether or not a variable is defined
    // We are in the browser and Metamask is running
    web3 = new Web3(window.web3.currentProvider);
} else {
    // We are on the server *OR* the user is not running Metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/2612024af0104c36ace74e6f0158707b'
    );
    web3 = new Web3(provider);
    // web3.eth.defaultAccount = process.env.DEFAULT_ACCOUNT;
}

export default web3;
