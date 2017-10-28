pragma solidity ^0.4.4;

import 'zeppelin-solidity/contracts/token/StandardToken.sol';

contract MapGameToken is StandardToken {
  string public name = 'MapGameToken';
  string public symbol = 'MGT';
  uint public decimals = 2;
  uint public INITIAL_SUPPLY = 12000;

  function MapGameToken() {
    totalSupply = INITIAL_SUPPLY;
    balances[msg.sender] = INITIAL_SUPPLY;
  }

}
