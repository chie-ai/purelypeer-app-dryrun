
import axios from 'axios'

export function fetchQuestList () {
  return new Promise((resolve, reject) => {
    axios.get('https://staging.purelypeer.cash/api/quests/')
      .then(response => {
        console.log('Succeed in fetching quests')
        resolve(response)
      })
      .catch(error => {
        console.log('Failed in fetching quests')
        reject(error)
      })
  })
}

export function createQuest (context, questCreate) {
  return new Promise((resolve, reject) => {
    axios.post('https://staging.purelypeer.cash/api/quests/', questCreate)
      .then(response => {
        console.log('Success :', response)
        resolve(response)
      })
      .catch(error => {
        reject(error.response.data)
      })
  })
}

export function broadcastSignedTransaction (context, transaction) {
  return new Promise((resolve, reject) => {
    axios.post('https://staging.purelypeer.cash/api/quests/sign_txn/', transaction)
      .then(response => {
        console.log('Success :', response)
        resolve(response)
      })
      .catch(error => {
        console.log('Error: ', error)
        reject(error)
      })
  })
}
