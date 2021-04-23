const path = require('path')
const { ElectrumNetworkProvider, CashCompiler, Contract, SignatureTemplate } = require('cashscript')
const { alice, bob, alicePk, bobPk } = require('./keys')

run()
async function run () {
  // Import the TransferWithTimeout JSON artifact
  // const artifact = require('./transfer_with_timeout.json')

  const otherArtifact = CashCompiler.compileFile(
    path.join(__dirname, 'p2psh.cash')
  )

  // Initialise a network provider for network operations
  const provider = new ElectrumNetworkProvider('mainnet')

  // Instantiate a new TransferWithTimeout contract
  const contract = new Contract(otherArtifact, [alicePk, bobPk, 600000], provider)

  // Call the transfer function with Bob's signature
  // i.e. Bob claims the money that Alice has sent him
  const transferDetails = await contract.functions
    .transfer(new SignatureTemplate(bob))
    .to('bitcoincash:qrhea03074073ff3zv9whh0nggxc7k03ssh8jv9mkx', 10000)
    .send()
  console.log(transferDetails)

  // Call the timeout function with Alice's signature
  // i.e. Alice recovers the money that Bob has not claimed
  const timeoutDetails = await contract.functions
    .timeout(new SignatureTemplate(alice))
    .to('bitcoincash:qqeht8vnwag20yv8dvtcrd4ujx09fwxwsqqqw93w88', 10000)
    .send()
  console.log(timeoutDetails)
}
