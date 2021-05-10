import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket-es5'
const userId = localStorage.getItem('user_id')

console.log('Type:', typeof userId)

export default ({ store }) => {
  Vue.use(VueNativeSock, `wss://staging.purelypeer.cash/ws/${userId}/`, { store: store, format: 'json' })
}
