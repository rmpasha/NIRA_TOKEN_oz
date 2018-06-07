App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('NiraToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var NiraTokenArtifact = data;
      App.contracts.NiraToken = TruffleContract(NiraTokenArtifact);

      // Set the provider for our contract.
      App.contracts.NiraToken.setProvider(App.web3Provider);

      var tokenBlance = App.getBalances();
      // Use our contract to retieve and mark the adopted pets.
      console.log('Balance is : ' + tokenBlance);
      return tokenBlance;
    });
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#transferButton', App.handleTransfer);
  },

  handleTransfer: function(event) {
    event.preventDefault();

    var amount = parseInt($('#NiraTransferAmount').val());
    var toAddress = $('#NiraTransferAddress').val();

    console.log('Transfer ' + amount + ' NIRA to ' + toAddress);

    var niraTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.NiraToken.deployed().then(function(instance) {
        niraTokenInstance = instance;

        return niraTokenInstance.transfer(toAddress, amount, {from: account});
      }).then(function(result) {
        alert('Transfer to ' + toAddress + ' was Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getBalances: function() {
    console.log('Getting balances...');

    var niraTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];
      console.log(account);
      App.contracts.NiraToken.deployed().then(function(instance) {
        niraTokenInstance = instance;

        return niraTokenInstance.balanceOf(account);
      }).then(function(result) {
        balance = result.c[0];

        $('#NiraBalance').text(balance);
        $('#NiraAddress').text(account);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
