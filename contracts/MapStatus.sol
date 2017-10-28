pragma solidity ^0.4.11;
contract MapStatus {
  string public position;

  function MapStatus() {
    position = "52.243,13.51,hallo";
  }

  function setPosition(string x) {
    position = x;
  }




  function getPosition() constant returns (string) {
    return position;
  }



}
