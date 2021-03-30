import server from './getAPIServer.js'
import sha256 from 'js-sha256'

export default async function createWallet (walletIndex = 0) {
  console.log('XXX Network: ', server)
  const bchjs = server.bchjs
  const mnemonic = bchjs.Mnemonic.generate(128)
  console.log('Mnemonic generated', mnemonic)
  const seedBuffer = await server.bchjs.Mnemonic.toSeed(mnemonic)
  const seedHash = sha256(mnemonic)
  console.log('Seed hash generated', seedHash)
  const masterHDNode = server.NETWORK === 'mainnet' ? bchjs.HDNode.fromSeed(seedBuffer) : bchjs.HDNode.fromSeed(seedBuffer, 'testnet');
  // const xPubKey = bchjs.HDNode.toXPub(masterHDNode)
  const childNode = masterHDNode.derivePath("m/44'/145'/0'/0" + walletIndex)
  const bchAddress = bchjs.HDNode.toCashAddress(childNode)
  const publicKey = bchjs.HDNode.toPublicKey(childNode).toString('hex')
  console.log(bchAddress)
  const returnValues = {
    mnemonic,
    seedHash,
    // xPubKey
    // childNode,
    masterHDNode,
    bchAddress,
    publicKey
  }

  console.log('Created wallet')
  return returnValues
}
