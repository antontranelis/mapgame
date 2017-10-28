App                           = {
  web3Provider: null,
  contracts: {},

  init: function() {

    Map.init();


    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there is an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider        = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fallback to the TestRPC
      App.web3Provider        = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3                      = new Web3(App.web3Provider);


    return App.initContracts();
  },

  initContracts: function() {
    $.getJSON('MapStatus.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var MapStatusArtifact   = data;
      App.contracts.MapStatus = TruffleContract(MapStatusArtifact);

      // Set the provider for our contract
      App.contracts.MapStatus.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.loadMarker();
    });

    $.getJSON('MapGameToken.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var MapGameTokenArtifact = data;
      App.contracts.MapGameToken = TruffleContract(MapGameTokenArtifact);

      // Set the provider for our contract.
      App.contracts.MapGameToken.setProvider(App.web3Provider);

      // Use our contract to retieve and mark the adopted pets.
      return App.getBalances();
    });


  //  return App.bindEvents();
  },

  bindEvents: function() {
  //  $(document).on('click', '.btn-adopt', App.handleAdopt);
  },

  loadMarker: function() {
    var mapStatusInstance;
    App.contracts.MapStatus.deployed().then(function(instance) {
      mapStatusInstance       = instance;
      return mapStatusInstance.getPosition.call();
    }).then(function(position) {
      Map.setMarker(position);
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  setMarker: function(status) {

    event.preventDefault();

    var adoptionInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.MapStatus.deployed().then(function(instance) {
        mapStatusInstance = instance;

        // Execute adopt as a transaction by sending account
        return mapStatusInstance.setPosition(status, {from: account});
      }).then(function(result) {

        return Map.setMarker(status);
      }).catch(function(err) {
        console.log(err.message);
      });
    });


  },

  handleTransfer: function() {
    event.preventDefault();

    var amount = parseInt($('#TTTransferAmount').val());
    var toAddress = $('#TTTransferAddress').val();

    console.log('Transfer ' + amount + ' TT to ' + toAddress);

    var MapGameTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.MapGameToken.deployed().then(function(instance) {
        MapGameTokenInstance = instance;

        return MapGameTokenInstance.transfer(toAddress, amount, {from: account});
      }).then(function(result) {
        alert('Transfer Successful!');
        return App.getBalances();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  getBalances: function(adopters, account) {
    console.log('Getting balances...');

    var MapGameTokenInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.MapGameToken.deployed().then(function(instance) {
        MapGameTokenInstance = instance;

        return MapGameTokenInstance.balanceOf(account);
      }).then(function(result) {
        balance = result.c[0];
        console.log("balance is " + balance);

        $('#MGTBalance').text(balance + " Tokens");
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
