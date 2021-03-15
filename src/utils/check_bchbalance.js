const NETWORK = 'testnet'

// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v3/'
// const ABC_MAINNET = 'https://abc.fullstack.cash/v3/'
const TESTNET3 = 'https://testnet3.fullstack.cash/v3/'

const BCHJS = require('@psf/bch-js')

const bchjs = NETWORK === 'mainnet' ? new BCHJS({ restURL: BCHN_MAINNET }) : new BCHJS({ restURL: TESTNET3 })

 // Get the balance of the wallet.
export default async function getBCHBalance (bchAddress) {
  try {
    // first get BCH balance
    let bchAdd = []
    bchAdd[0] = bchAddress
    const balance = await bchjs.Electrumx.balance(bchAdd)

    console.log('BCH Balance information:')
    console.log(JSON.stringify(balance, null, 2))

    return balance
  } catch (err) {
    console.error('Error in getBalance: ', err)
    throw err
  }
}