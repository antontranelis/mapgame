var DefaultBuilder = require("truffle-default-builder");

module.exports = {
  build: new DefaultBuilder({
    "index.html": "index.html",
    "app.js": [
      "js/jquery.min.js",
      "js/web3.min.js",
      "js/truffle-contract.js",
      "js/app.js",
      "js/map.js"

    ],
    "app.css": [
      "css/bootstrap.min.css",
      "css/style.css"
    ],
    "images/": "images/",
    "MapStatus.json": "../build/contracts/MapStatus.json"
  }),
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      host: "localhost",
      port: 8545,
      network_id: "3",
  //    gas: 500000
    }
  }
};
