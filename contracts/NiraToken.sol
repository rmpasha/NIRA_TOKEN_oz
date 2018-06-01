pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol';

contract NiraToken is StandardToken {

    string public name = 'NiraToken';
    string public symbol = 'NIRA';
    uint8 public decimals = 2;
    uint public INITIAL_SUPPLY = 7000000;

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }
}