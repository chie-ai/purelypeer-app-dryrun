
import server from './getAPIServer.js'

// Get the balance of the wallet.
export default async function getBCHBalance (bchAddress) {
  try {
    // first get BCH balance
    const bchjs = server.bchjs
    const balance = await bchjs.Electrumx.balance(bchAddress)

    // console.log('BCH Balance: ', JSON.stringify(balance, null, 2))

    return balance
  } catch (err) {
    console.error('Error in getBalance: ', err)
    throw err
  }
}
