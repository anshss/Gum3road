require("@nomiclabs/hardhat-waffle");
const fs = require('fs');
const privateKey = fs.readFileSync(".secret").toString()
const infuraId = fs.readFileSync(".infuraId").toString()

module.exports = {
  defaultNetwork : "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraId}`,
      accounts: [privateKey]
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
      accounts: [privateKey]
    },
    mumbai: {
      allowUnlimitedContractSize: true,
      url: `https://polygon-mumbai.infura.io/v3/${infuraId}`,
      accounts: [privateKey]
    }
  },
  solidity: {
    version: "0.8.4",
  }
}