  
import axios from 'axios'

export function createUser ({dispatch}, wallet) {

  return new Promise((resolve, reject) => {
    axios.post('https://staging.purelypeer.cash/api/anonymous_user/')
    .then(response => {
      console.log('Success in creating UUID')
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

export function createWallet ({commit}, wallet) {
  return new Promise((resolve, reject) => {
    axios.post('https://staging.purelypeer.cash/api/wallet/', wallet)
    .then(response => {
      console.log('BCH: ', response.data.addresses[0].bch_address)
      console.log('SLP: ', response.data.addresses[0].slp_address)
      // commit('mutateAddresses', response.data.addresses)
      commit('mutateKeys', response.data)

      let addresses = {
        0: {
          bch: response.data.addresses[0].bch_address,
          slp: response.data.addresses[0].slp_address
        }
      }

      resolve(response)
    })
    .catch(error => {
      console.log('Failed to send wallet to the api.')
      console.log('Error: ', error)
    })
  })
}