pragma solidity ^0.4.17;

contract Market {

    address public marketPublisher;
    address public contractAddress;
    address public auctionAddress;


    function Market() public {
        marketPublisher = msg.sender;
        auctionAddress = new Auction();
    }


    function addContract(uint _x, uint _y, uint _z) public {     //Add a contract to the market for auction
        address newContract = new Contract(_x, _y, _z, msg.sender);
        contractAddress = newContract;
    }

    function getContractAddresses() public returns(address){   //Return all contract addresses
        return contractAddress;
    }

    function sendToAuction() public returns(uint){
       Auction auc = new Auction();
       return auc.getBid();
    }

    function getAuctionAddress() view public returns(address){
        return auctionAddress;
    }


}

contract Auction {

    struct Participant {
        uint costFunction;
        uint x;
        uint y;
        uint z;
        string name;
    }

    Participant[] public Participants;
    int public highestBid;

    function Auction() public {

    }

    function addParticipants(uint _costFunction, uint _x, uint _y, uint _z, string _name) private {

        Participant memory agent = Participant({
            costFunction: _costFunction,
            x: _x,
            y: _y,
            z: _z,
            name: _name
        });

        Participants.push(agent);
    }


    function auctionContract() private returns(uint) {
        return Participants[0].costFunction;
    }

    function submitBid() view public returns(uint){

        return auctionContract();
    }
}

contract Contract {

    struct contractStructure {
        uint x;
        uint y;
        uint z;
    }

    address public Owner;
    mapping (address => contractStructure) public contracts;

    function Contract(uint _x, uint _y, uint _z, address _owner) public {
        Owner = _owner;

        var liveContract = contracts[Owner];
        liveContract.x = _x;
        liveContract.y = _y;
        liveContract.z = _z;
    }


    function getContract() view public returns (uint, uint, uint){
        return (contracts[Owner].x, contracts[Owner].y, contracts[Owner].z);
    }
}
