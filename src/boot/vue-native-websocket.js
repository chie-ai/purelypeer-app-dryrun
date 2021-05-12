import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
const userID = localStorage.getItem('user_id')

export default ({ store }) => {
  Vue.use(VueNativeSock, `wss://${process.env.socketUrl}/${userID}/`,
    {
      store: store,
      format: 'json',
      connectManually: true
    })
}
