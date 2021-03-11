
export function mutateSeedPhrase (state, seedPhrase) {
	state.wallet.seedPhrase = seedPhrase
}

export function mutateAddresses (state, addresses) {
	state.wallet.addresses[0].bch = addresses[0].bch_address
	state.wallet.addresses[0].slp = addresses[0].slp_address
}

export function mutateKeys (state, data) {
	state.seedHash = data.seed_hash
	state.xPubKey = data.xpubkey
}
