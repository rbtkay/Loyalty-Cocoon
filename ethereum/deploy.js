const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/Loco.json');

const provider = new HDWalletProvider(
    'tube story avocado bless early deputy void else wrap deposit space culture',
    'https://rinkeby.infura.io/v3/af133582ff384aa99f64946e33b16a05'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ gas: '2000000', from: accounts[0] });

    console.log('Contract deployed to', result.options.address);
};

deploy();
//rinkeby.infura.io/v3/af133582ff384aa99f64946e33b16a05
// deployed contract address : 0x78ac83Ad85316A87C3FD93Dfe85feE66F6Fe1ca5
