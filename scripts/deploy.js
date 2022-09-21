const {run, network, ethers} = require('hardhat');
require('dotenv').config()

let contract
async function main() {
  const contractfactory = await ethers.getContractFactory("simstorC")
  console.log("Deploying contract...")
  contract = await contractfactory.deploy()
  contract.deployed()
  const txreceipt = await contract.deployTransaction.wait(1)
  try {
        if (network.config.chainId === 4 || network.config.chainId == 5 && process.env.ETHERSCAN_API) {
        console.log("Verifying contract..")
        console.log("Waiting for txes")
        await contract.deployTransaction.wait(6)
        await run("verify:verify", {
            address: contract.address,
            constructorAtguments: []
          }
        )
      }
  } catch (e) {
    if (e.message.includes("already verified")) {
      console.log("Already verified!")
    }else{
      console.log(e)
    }
  }
  console.log(`Contract deployed at ${contract.address}`);

  async function test() {
    const currentValue = await contract.retrieve()
    if (currentValue.toString() == 0) {
      console.log("Retrieving test: Passed")
    } else {
      console.log("Retrieving test: Didn't Pass")
    }
  }
  // await test()
}

// async function test() {

// }


main()
//test()
.then(() => process.exit(0))
.catch((error) => {
   console.error(error);
   process.exit(1)
 }
)
