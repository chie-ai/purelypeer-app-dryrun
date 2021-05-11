<template>
  <q-layout>
    <q-page-container>
      <div id="explore-map" class="row">
        <div class="example-custom-control q-mt-md zoom-controls">
            <span class="q-mr-sm q-pa-sm shadow-2" style="border-radius: 50%; padding: 10px 9.5px 10px 9.5px" v-wave="{ color: '#bbbbbb', initialOpacity: 0.5, easing: 'ease-in', duration: 0.3 }" @click="zoomScale++">&#10133;</span>
            <span class="q-pa-sm shadow-2" style="border-radius: 50%; padding: 10px 9.5px 10px 9.5px" v-wave="{ color: '#bbbbbb', initialOpacity: 0.5, easing: 'ease-in', duration: 0.3 }" @click="zoomScale--">&#10134;</span>
        </div>
        <l-map
          :zoom="zoomScale"
          :center="center"
          :options="mapOptions"
          style="height: 334px"
          @ready="readyMap"
          ref="myPurelyPeerMap"
        >

          <l-tile-layer :url="url" :attribution="attribution" />

          <l-marker :icon="icon" :lat-lng="markerLocation"></l-marker>

          <l-circle
            v-for="(pin, index) in quests" :key="index"
            :lat-lng="pin.coors"
            :radius="pin.radius"
            :color="circle.color"
            :fillColor="circle.fillColor"
            :weight="1"
            :visible="pin.radiusVisibility"
            @click="toggleWindowInfo(index)" />
        </l-map>
        <!-- <div class="adjust-map-height q-px-md">
            <q-btn color="btn-map-resizer text-btn-color" rounded v-touch-pan.vertical.prevent.mouse="resizeMapHeight" size="sm" label="Pinch to resize" />
        </div> -->

        <div class="current-location">
          <q-btn class="q-px-none" color="btn-map-resizer text-btn-color" icon="my_location" round @click="currentLocation" size="sm" />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { Plugins } from '@capacitor/core'
import { latLng, icon } from 'leaflet'
import { LMap, LTileLayer, LMarker, LCircle } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

const { Geolocation } = Plugins

export default {
  name: 'Collect-map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircle
  },
  data () {
    return {
      zoomScale: 13,
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png',
      attribution: '©OpenStreetMap, ©CartoDB',
      mapOptions: {
        zoomSnap: 0.5,
        closePopupOnClick: true,
        zoomControl: false,
        inertia: true
      },
      popUpOptions: {
        autoPan: false
      },
      center: latLng(0, 0),
      icon: icon({
        iconUrl: 'PurelyPeer-location-current-A.png',
        iconSize: [80, 80],
        iconAnchor: [40, 54]
      }),
      markerLocation: latLng(0, 0),
      circle: {
        color: '#0AC18E',
        fillColor: 'transparent'
      },
      quests: undefined,
      activeIndex: 0,
      cashDropsCoordinates: null,
      startY: 0,
      counter: 0,
      mapHeight: 0,
      socketMessage: null,
      coors: null
    }
  },
  props: ['moveToTheQuestCoordinates'],
  watch: {
    moveToTheQuestCoordinates () {
      const coors = this.moveToTheQuestCoordinates

      this.center = coors
      this.markerLocation = coors
      this.removePopUpinfo()
    }
  },
  methods: {
    currentLocation () {
      this.center = this.markerLocation
    },
    zoomUpdate (scale) {
      this.zoomScale = scale
    },
    readyMap () {
      Geolocation.getCurrentPosition().then(position => {
        const coors = latLng(
          position.coords.latitude,
          position.coords.longitude
        )
        console.log(coors)
        this.center = coors
        this.circle.center = coors
        this.markerLocation = coors
      }).catch(error => {
        this.zoomScale = 1
        console.log('Unable to retreive your location: ', error)
      })
    },
    toggleWindowInfo (infoIndex) {
      if (this.activeIndex !== infoIndex) {
        this.quests[this.activeIndex].radiusVisibility = false
      }
      this.quests[infoIndex].infoWinOpen = !this.quests[infoIndex].infoWinOpen
      this.quests[infoIndex].radiusVisibility = !this.quests[infoIndex].radiusVisibility
      this.cashDropsCoordinates = this.quests[infoIndex].infoWinOpen === true ? this.quests[infoIndex].cashdrops : ''
      this.activeIndex = infoIndex
    }
    // resizeMapHeight ({ evt, ...info }) {
    //   const map = this.$refs.myPurelyPeerMap.$el
    //   if (this.counter === 0) {
    //     this.mapHeight = parseInt(document.defaultView.getComputedStyle(map).height, 10)
    //     this.startY = Math.round(evt.changedTouches[0].screenY)
    //   }
    //   if (!info.isFinal) {
    //     this.counter++
    //   } else {
    //     this.counter = 0
    //   }
    //   this.doResize(event)
    // },
    // doResize (e) {
    //   const map = this.$refs.myPurelyPeerMap
    //   const newHeight = this.mapHeight + e.changedTouches[0].screenY - this.startY
    //   const minMapHeight = 334

    //   if (((80 / 100) * window.innerHeight) >= newHeight) {
    //     if (newHeight >= minMapHeight) {
    //       map.$el.style.height = newHeight + 'px'
    //     }
    //   }
    //   this.$refs.myPurelyPeerMap.mapObject.invalidateSize()
    // }
  },
  beforeDestroy () {
    // this.$socket.onopen = () => {}
    this.$store.dispatch('disconnectWebSocket')
    delete this.$options.sockets.onmessage
  },
  async created () {
    await this.$store.dispatch('cashdrop/fetchQuestList').then(res => {
      this.quests = res.data.results.length > 0 ? res.data.results.map(quest => ({ ...quest, infoWinOpen: false, radiusVisibility: false })) : ''
    }).catch(err => {
      console.log('Error: ', err)
    })
  },
  mounted () {
    this.$store.dispatch('connectWebSocket')

    this.$options.sockets.onmessage = (data) => {
      console.log('Socket response: ', data)

      switch (data.operation) {
        case 'cashdrop_claim':
          if (data.data.type === 'passcode_sig') {

          } else if (data.data.type === 'sig_only') {

          }
          break
        case 'reveal_cashdrop':
          break
      }
    }
    // this.$socket.onopen = () => {
    //   console.log('Socket opened')
    // }
    setInterval(() => {
      this.geoId = Geolocation.watchPosition({}, (position, err) => {
        this.coors = position ? [(position.coords.latitude).toFixed(8), (position.coords.longitude).toFixed(8)] : this.coors
        this.center = this.coors
        this.circle.center = this.coors
        this.markerLocation = this.coors
      })
      let data = {
        operation: 'user_loc_tracking',
        data: {
          data: [this.coors],
          type: 'info'
        }
      }
      data = JSON.stringify(data)
      this.$store.dispatch('sendMessage', data)
    }, 10000)
  }
}
</script>

<style scoped>
.infowindow p {
  color: #676767;
  margin: 0;
}
.zoom-controls {
  position: absolute;
  right: 10px;
  bottom: 26px;
  z-index: 1000;
}
.zoom-controls span {
  cursor: pointer;
  font-size: 10px;
  z-index: 1000;
}
.q-layout--standard {
  min-height: 334px !important;
}
.adjust-map-height {
  position: absolute;
  padding: 0;
  right: 80px;
  bottom: 18px;
  z-index: 1000;
}
.current-location {
    position: absolute;
    left: 8px;
    bottom: 18px;
    z-index: 1000;
}
.bg-btn-map-resizer {
    background-color: rgba(255, 255, 255, 0.4);
    box-shadow: none !important;
}
.text-btn-color {
  color: rgba(0, 0, 0, 0.7) !important;
}
.btn-map {
  width: 80%;
}
.purelypeer-watermark {
  font-size: 150%;
  font-weight: bolder;
  color: #676767;
  text-shadow: #555;
  margin-left: 10px;
  opacity: 0.5;
  padding-bottom: 0px;
}
</style>
