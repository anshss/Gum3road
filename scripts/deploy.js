const hre = require('hardhat')
const fs = require('fs');

async function main() {
  const Gum3road = await hre.ethers.getContractFactory('Gum3road');
  const deploy = await Gum3road.deploy();
  await deploy.deployed();

  console.log("contract deployed to: ", deploy.address);

  fs.writeFileSync("./address.js", `export const contractAddress = "${deploy.address}"`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });