// SPDX-License-Identifier
pragma solidity ^0.8.7;

contract Will{

	address payable public owner;
	address payable public Child1;
	uint public count;
	address payable public Child2;
	bool public isPaid;
	uint256 public amountToSendToEachChild = (address(this).balance) / 2;
	State public parentState;
	address[2] public children = [Child1, Child2];

	modifier onlyOwner{
		require(msg.sender  == owner, "You are not the owner!!")
		_;
	}

	enum State{
		Alive,
		Dead
	}

	constructor(address payable _c1, address payable _c2){
		owner = payable(msg.sender);
		parentState = State.Alive;
		Child1 = _c1;
		Child2 = _c2;
	}

	function declareDead() public {
		require(count < 2)
		require(parentState == State.Alive);
		parentState = State.Dead;
		transferEth();
		count++;		
	}

	function transferEth() payable internal onlyOwner {
		require(parentState == State.Dead && isPaid != true, "Error");
		children[0].transfer(amountToSendToEachChild);
		children[1].transfer(amountToSendToEachChild);
		uint256 currentBalance = (address.this).balance;
		if(currentBalance > 0){
			children[0].transfer(currentBalance);
		}else{
			isPaid == true;
		}
	}
}