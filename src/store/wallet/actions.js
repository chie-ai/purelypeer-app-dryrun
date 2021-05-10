
import axios from 'axios'

export function createUser ({ dispatch }, wallet) {
  return new Promise((resolve, reject) => {
    axios.post('https://staging.purelypeer.cash/api/anonymous_user/')
      .then(response => {
        console.log('Success in creating UUID')
        wallet.user = response.data.id
        console.log('User id: ', response.data.id)
        localStorage.setItem('user_id', response.data.id)
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

export function createWallet ({ commit }, wallet) {
  return new Promise((resolve, reject) => {
    axios.post('https://staging.purelypeer.cash/api/wallet/', wallet)
      .then(response => {
        // console.log('BCH: ', response.data.addresses[0].bch_address)
        // console.log('SLP: ', response.data.addresses[0].slp_address)
        // commit('mutateAddresses', response.data.addresses)
        console.log('Response of created wallet: ', response)
        commit('mutateKeys', response.data)

        resolve(response)
      })
      .catch(error => {
        console.log('Failed to send wallet to the api.')
        console.log('Error: ', error)
      })
  })
}
