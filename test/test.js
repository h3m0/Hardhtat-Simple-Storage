 describe(
   "SimpleStorage", async function() {
    let contract;
     beforeEach(
       async function () {
         const contractfactory = await ethers.getContractFactory("simstorC");
         contract = await contractfactory.deploy();
         contract.deployed()
       }
     )
     it(
       "Should check if current value is 0", async function() {
         const currentValue = await contract.retrieve();
         console.log(currentValue.toString())
         let expectedValue = "0";
         console.log(expectedValue)
         return(expectedValue == currentValue.toString()) ? true: false
        }
     )
     it(
       "Should check if number updated to 7", async function() {
         const tx = await contract.store(7);
         tx.wait(1)
         const expectedValue = 7
         return(contract.retrieve().toString() == expectedValue) ? true: false;
       }
     )
   }
 )
