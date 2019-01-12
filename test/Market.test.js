const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledMarket = require('../ethereum/build/Market.json');
const compiledContract = require('../ethereum/build/Contract.json');
const compiledAuction = require('../ethereum/build/Auction.json');

let accounts;
let market;
let contractAddress;
let contract;
let auction;


beforeEach(async () =>{
	accounts = await web3.eth.getAccounts();

	market = await new web3.eth.Contract(JSON.parse(compiledMarket.interface))
		.deploy({data: compiledMarket.bytecode })
		.send({from: accounts[0], gas: '2000000'});

	const auctionAddress = await market.methods.getAuctionAddress().call();

	await market.methods.addContract('2','3','4').send({
		from: accounts[0],
		gas: '1000000'
	});


	[contractAddress] = await market.methods.getContractAddresses().call();

	contract = await new web3.eth.Contract(
		JSON.parse(compiledContract.interface),
		contractAddress
	);

	auction = await new web3.eth.Contract(
		JSON.parse(compiledAuction.interface),
		auctionAddress
	); 
});

describe('Market', () => {
	it('deploys a market, auction, and contract', () => {
		assert.ok(market.options.address);
		assert.ok(contract.options.address);
		assert.ok(auction.options.address)
	});

	it('records the correct marketpublisher', async () => {
		const marketPublisher = await market.methods.marketPublisher().call();
		assert.equal(accounts[0], marketPublisher);
	});

	it('allows people to add contracts and adds them to contract array', async () => {
		await market.methods.addContract('1','2','3').send({
			from: accounts[1],
			gas: '1000000'
		});
		const isContractOwner = await contract.methods.contracts(accounts[1]).call();
		assert(isContractOwner);
	});
});