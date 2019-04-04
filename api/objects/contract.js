const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx');
const Loco = require('../../ethereum/build/Loco.json');
const axios = require('axios');
require('dotenv').config();

const infura = 'https://rinkeby.infura.io/v3/2612024af0104c36ace74e6f0158707b';
const web3 = new Web3(new Web3.providers.HttpProvider(infura));
web3.eth.defaultAccount = process.env.DEFAULT_ACCOUNT;
var pk = process.env.PRIVATE_KEY;
var toadd = process.env.CONTRACT_ADDRESS;
var address = process.env.CONTRACT_ADDRESS;

const contract = new web3.eth.Contract(JSON.parse(Loco.interface), address, {
    from: web3.eth.defaultAccount,
    gas: 300000
});

exports.grantPoints = (req, res, next) => {
    web3.eth.getTransactionCount(web3.eth.defaultAccount, async (err, nonce) => {
    var address = req.query.address;
    var amount = req.query.amount;
    let gasPrices = await getCurrentGasPrices();

    const functionAbi = contract.methods.grantPoints(address.toString(), amount).encodeABI();

    var details = {
        'nonce': nonce,
        'gasPrice': web3.utils.toHex(web3.utils.toWei(gasPrices.low.toString(), 'gwei')),
        'gas': 300000,
        'to': address,
        'value': 0,
        'data': functionAbi
    };

    const transaction = new EthereumTx(details);
    transaction.sign(Buffer.from(pk, 'hex'));
    var rawData = '0x' + transaction.serialize().toString('hex');
    web3.eth.sendSignedTransaction(rawData)
        .on('transactionHash', (hash) => {
            console.log(['transferToStaging Trx Hash: ' + hash]);
        })
        .on('receipt', (receipt) => {
            console.log(['transferToStaging Receipt: ', receipt]);
            res.status(200).send(receipt);
        })
        .on('error', (error) => {
            console.log('error: ', error);
            res.status(301).send(error);
        });
    });
}

exports.transferFrom = (req, res, next) => {
    web3.eth.getTransactionCount(web3.eth.defaultAccount, async (err, nonce) => {
    var address = req.query.address;
    var amount = req.query.amount;
    var toAddress = req.query.toAddress;
    let gasPrices = await getCurrentGasPrices();

    const functionAbi = contract.methods.transferFrom(address, amount, toAddress).encodeABI();

    var details = {
        'nonce': nonce,
        'gasPrice': web3.utils.toHex(web3.utils.toWei(gasPrices.low.toString(), 'gwei')),
        'gas': 300000,
        'to': address,
        'value': 0,
        'data': functionAbi
    };

    const transaction = new EthereumTx(details);
    transaction.sign(Buffer.from(pk, 'hex'));
    var rawData = '0x' + transaction.serialize().toString('hex');
    web3.eth.sendSignedTransaction(rawData)
        .on('transactionHash', (hash) => {
            console.log(['transferToStaging Trx Hash: ' + hash]);
        })
        .on('receipt', (receipt) => {
            console.log(['transferToStaging Receipt: ', receipt]);
            res.status(200).send(receipt);
        })
        .on('error', (error) => {
            console.log('error: ', error);
            res.status(301).send(error);
        });
    });
}

const getCurrentGasPrices = async () => {
    let response = await axios.get(`https://ethgasstation.info/json/ethgasAPI.json`);
    let prices = {
        low: response.data.safeLow / 10,
        medium: response.data.average / 10,
        high: response.data.fast / 10
    };

    console.log(`Current ETH gas Prices (in GWEI):`);
    console.log(`Low: ${prices.low}`);
    console.log(`Standard: ${prices.medium}`);
    console.log(`Fast: ${prices.high}`);

    return prices;
}
