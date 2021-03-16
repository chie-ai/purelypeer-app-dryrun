import bchjs from './getAPIServer.js'
import sha256 from 'js-sha256';

export default async function createWallet (walletIndex = 0) {
	try {
		const mnemonic = bchjs.Mnemonic.generate(128);
		const seedBuffer = await bchjs.Mnemonic.toSeed(mnemonic);
		const seedHash = sha256(mnemonic);
		const masterHDNode = NETWORK === 'mainnet' ? bchjs.HDNode.fromSeed(seedBuffer) : bchjs.HDNode.fromSeed(seedBuffer, 'testnet');
		const xPubKey = bchjs.HDNode.toXPub(masterHDNode);
		// const childNode = masterHDNode.derivePath("m/44'/145'/0'/" + walletIndex);
		// const bchAddress = bchjs.HDNode.toCashAddress(childNode);
		// const publicKey = bchjs.HDNode.toPublicKey(childNode);

		const returnValues = {
			mnemonic,
			seedHash,
			xPubKey,
			// childNode,
			// bchAddress,
			// publicKey
		}

		console.log('Created wallet')
		return returnValues
	}
	catch (error) {
		console.log('Error in creating wallet: ', error)
	}
}