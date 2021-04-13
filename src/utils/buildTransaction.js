import server from './getAPIServer.js'

async function getPrivateKey (seed, index) {
  const bchjs = server.bchjs
  const seedBuffer = await server.bchjs.Mnemonic.toSeed(seed)
  const masterHDNode = server.NETWORK === 'mainnet' ? bchjs.HDNode.fromSeed(seedBuffer) : bchjs.HDNode.fromSeed(seedBuffer, 'testnet')
  const childNode = masterHDNode.derivePath("m/44'/145'/0'/" + index)
  const ecPair = bchjs.HDNode.toKeyPair(childNode)
  return ecPair.toWIF()
}

async function signInputs (address, wif, contract, amountPerCashDrop) {
  const bchjs = server.bchjs

  const getUtxos = await bchjs.Utxo.get(address)
  const utxos = getUtxos[0].bchUtxos

  const keyPair = bchjs.ECPair.fromWIF(wif)
  const transactionBuilder = new bchjs.TransactionBuilder()

  // Add the funding of the contract as output
  transactionBuilder.addOutput(
    contract,
    amountPerCashDrop
  )

  // Add inputs
  utxos.map(function (utxo, index) {
    console.log('utxos: ', utxo)

    transactionBuilder.addInput(
      utxo.tx_hash,
      utxo.tx_pos
    )

    const redeemScript = null
    const sighash = transactionBuilder.hashTypes.SIGHASH_SINGLE | transactionBuilder.hashTypes.SIGHASH_ANYONECANPAY
    transactionBuilder.sign(
      index,
      keyPair,
      redeemScript,
      sighash,
      utxo.value
    )
  })

  const tx = transactionBuilder.transaction.buildIncomplete()
  console.log('HEX: ', tx.toHex())
}

export { getPrivateKey, signInputs }
