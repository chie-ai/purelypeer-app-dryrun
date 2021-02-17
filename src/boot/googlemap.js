import Vue from 'vue'
import * as VueGoogleMaps from 'gmap-vue'
 
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDNNzK_4N0TWXiQ-qU7zIXnosZ4Nrrfr0A',
    libraries: 'places,drawing,visualization',
  },
  installComponents: true
})