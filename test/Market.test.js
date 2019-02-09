const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledMarket = require('../ethereum/build/Market.json');
const compiledContract = require('../ethereum/build/Contract.json');

let accounts;
let market;
let contractAddress;
let contract;


beforeEach(async () =>{
	accounts = await web3.eth.getAccounts();

	market = await new web3.eth.Contract(JSON.parse(compiledMarket.interface))
		.deploy({data: compiledMarket.bytecode })
		.send({from: accounts[0], gas: '2000000'});

	// await market.methods.addContract('2','3','4').send({
	// 	from: accounts[0],
	// 	gas: '1000000'
	// });


	// [contractAddress] = await market.methods.getContractAddresses().call();

	// contract = await new web3.eth.Contract(
	// 	JSON.parse(compiledContract.interface),
	// 	contractAddress
	// );

});

describe('Market', () => {
	it('deploys a market, auction, and contract', () => {
		assert.ok(market.options.address);
		// assert.ok(contract.options.address);
	});
//
// 	it('records the correct marketpublisher', async () => {
// 		const marketPublisher = await market.methods.marketPublisher().call();
// 		assert.equal(accounts[0], marketPublisher);
// 	});
//
// 	it('allows people to add contracts and adds them to contract array', async () => {
// 		await market.methods.addContract('1','2','3').send({
// 			from: accounts[1],
// 			gas: '1000000'
// 		});
// 		console.log(contract.methods.getContract);
// 		const isContractOwner = await contract.methods.contracts(accounts[1]).call()
// 		assert(isContractOwner);
// 	});
});
