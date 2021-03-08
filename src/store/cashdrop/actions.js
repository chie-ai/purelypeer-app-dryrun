
import axios from 'axios'

export function fetchQuestList ({}) {
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
