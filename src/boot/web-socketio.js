import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
const userId = localStorage.getItem('user_id')

export default ({ store }) => {
  Vue.use(VueNativeSock, `wss://staging.purelypeer.cash/ws/${userId}/`,
    {
      store: store,
      format: 'json',
      connectManually: true
    })
}
