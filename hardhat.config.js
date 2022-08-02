require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString()

module.exports = {
  defaultNetwork : "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/buH7z17a25H0PlM0yMqfiMW8p2J8imGo`,
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.4",
  }
}