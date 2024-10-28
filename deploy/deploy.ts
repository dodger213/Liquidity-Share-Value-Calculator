// Importing necessary functionalities from the Hardhat package.
import { ethers } from 'hardhat'

async function main() {
  // Retrieve the first signer, typically the default account in Hardhat, to use as the deployer.
  const [deployer] = await ethers.getSigners();
  const instanceLiquidityValueCalculator = await ethers.deployContract("LiquidityValueCalculator");
  await instanceLiquidityValueCalculator.waitForDeployment()
  const LiquidityValueCalculator_Address = await instanceLiquidityValueCalculator.getAddress();
  console.log(`LiquidityValueCalculator is deployed. ${LiquidityValueCalculator_Address}`);
}

// This pattern allows the use of async/await throughout and ensures that errors are caught and handled properly.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exitCode = 1
  })