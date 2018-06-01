var NiraToken = artifacts.require("NiraToken");

module.exports = function(deployer) {
  deployer.deploy(NiraToken);
};