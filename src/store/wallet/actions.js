
import axios from 'axios'

export function createUser ({dispatch}, wallet) {

	return new Promise((resolve, reject) => {
		axios.post('https://staging.purelypeer.cash/api/anonymous_user/')
		.then(response => {
			dispatch('createWallet', wallet)
			.then(res => {
				resolve(res)
			})
			.catch(err => console.log('error: ', err))
		})
		.catch(error => {
			console.log('Failed to create UUID.')
			reject(error)
		})
	})
}

export function createWallet ({commit}, wallet) {
	return new Promise((resolve, reject) => {
		axios.post('https://staging.purelypeer.cash/api/wallet/', wallet)
		.then(response => {
			// console.log('Wallet return: ', response.data)
			commit('mutateAddresses', response.data.addresses)
			commit('mutateKeys', response.data)

			let addresses = {
				0: {
					bch: response.data.addresses.bch_address,
					slp: response.data.addresses.slp_address
				}
			}

			localStorage.setItem("addresses", addresses)
			localStorage.setItem("seed_hash", response.data.seed_hash)
			localStorage.setItem("xpubkey", response.data.xpubkey)
			resolve(response)
		})
		.catch(error => {

			console.log('Failed to send wallet to the api.')
			console.log('Error: ', error)
		})
	})
}