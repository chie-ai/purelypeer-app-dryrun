
const NETWORK = 'mainnet'

// REST API servers.
const BCHN_MAINNET = 'https://bchn.fullstack.cash/v4/'
// const ABC_MAINNET = 'https://abc.fullstack.cash/v4/'
const TESTNET3 = 'https://testnet3.fullstack.cash/v4/'

const BCHJS = require('@psf/bch-js')

const bchjs = NETWORK === 'mainnet' ? new BCHJS({ restURL: BCHN_MAINNET }) : new BCHJS({ restURL: TESTNET3 })

export default { bchjs, NETWORK }
