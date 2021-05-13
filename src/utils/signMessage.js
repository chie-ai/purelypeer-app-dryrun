import server from './getAPIServer.js'
import sha256 from 'js-sha256'
import { getPrivateKey } from './buildTransaction.js'

async function signCoordinates (concatCoors, index = 0) {
  return server.bchjs.BitcoinCash.signMessageWithPrivKey(
    await getPrivateKey(localStorage.getItem('seedPhrase'), 0),
    sha256(concatCoors)
  )
}

export { signCoordinates }
