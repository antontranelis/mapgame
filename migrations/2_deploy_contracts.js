var MapStatus = artifacts.require("./MapStatus.sol");
var MapGameToken = artifacts.require("./MapGameToken");

module.exports = function(deployer) {
  deployer.deploy(MapStatus);
  deployer.deploy(MapGameToken);
};
