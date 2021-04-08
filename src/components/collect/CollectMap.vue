<template>
  <q-layout>
    <q-page-container>
      <div id="explore-map" class="row">
        <div class="zoom-controls q-mt-md">
          <span class="q-mr-xs" @click="zoomScale++">&#x2B06;&#xFE0F;</span>
          <span class="q-ml-xs" @click="zoomScale--">&#x2B07;&#xFE0F;</span>
        </div>
        <l-map
          :zoom="zoomScale"
          :center="center"
          :options="mapOptions"
          style="height: 334px"
          @update:center="centerUpdate"
          @ready="readyMap"
          @click="removePopUpinfo"
          @move="removePopUpinfo"
          ref="myPurelyPeerMap"
        >

          <l-tile-layer :url="url" :attribution="attribution" />

          <l-marker :icon="icon" :lat-lng="markerLocation"></l-marker>

          <l-marker v-for="(mark, markerIndex) in quests" :key="markerIndex+'marker'"
          :lat-lng="mark.coors" @click="toggleWindowInfo(markerIndex)">
            <l-popup :options="popUpOptions" @remove="removePopUpinfo" ref="pops">
            <div class="infowindow">
              <p class="text-h6 info-header"><strong>Quest Info</strong></p>
              <p><strong>Quest Name: </strong>{{ mark.name }}</p>
              <p><strong>PurelyPeer Tier: </strong>{{ (mark.acceptance_tier).charAt(0).toUpperCase()+(mark.acceptance_tier).slice(1) }}</p>
              <p><strong>Remaining Cash Drop: </strong>{{ mark.cashdrops_remaining }}</p>
              <p><strong>Cash Drop Count: </strong>{{ mark.total_cashdrops }}</p>
            </div>
          </l-popup>
          <l-icon
                :icon-size="[mark.active === 'active' ? 30 : 50, mark.active === 'active' ? 40 : 50]"
                :icon-anchor="[mark.active === 'active' ? 1 : 12, mark.active === 'active' ? 40 : 44]"
                :icon-url="(mark.active === 'active' ? (mark.acceptance_tier === 'Upcoming' ? 'PurelyPeer-location-blue.png' : (mark.acceptance_tier === 'Direct' ? 'PurelyPeer-location-green.png' : 'PurelyPeer-location-orange.png')) : 'PurelyPeer-icon-black.png')" />
          </l-marker>

          <l-marker :lat-lng="cashDropCoor.coors" v-for="(cashDropCoor, cashDropsIndex) in cashDropsCoordinates" :key="cashDropsIndex+'dropMarker'">
            <l-icon
                :icon-size="[30, 30]"
                :icon-anchor="[40, 54]"
                :icon-url="'PurelyPeer-location-current-B.png'" />
          </l-marker>

          <l-circle
            v-for="(pin, index) in quests":key="index"
            :lat-lng="pin.coors"
            :radius="pin.radius"
            :color="circle.color"
            :fillColor="circle.fillColor"
            :weight="1"
            :visible="pin.radiusVisibility"
            @click="toggleWindowInfo(index)" />
        <!-- <l-control :position="'bottomleft'" class="purelypeer-watermark" >
            PurelyPeer
        </l-control> -->
        </l-map>
        <div class="adjust-map-height q-px-md">
          <q-btn color="btn-map-resizer text-btn-color" class="btn-map" v-touch-pan.vertical.prevent.mouse="resizeMapHeight" size="sm" label="Drag to resize" />
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { latLng, icon } from 'leaflet'
import { LMap, LTileLayer, LMarker, LCircle, LPopup, LIcon } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'Collect-map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircle,
    LPopup,
    LIcon
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
        iconUrl: "PurelyPeer-location-current-A.png",
        iconSize: [80, 80],
        iconAnchor: [40, 54]
      }),
      markerLocation: latLng(0, 0),
      circle: {
        color: '#0AC18E',
        fillColor: 'transparent'
      },
      quests: null,
      activeIndex: 0,
      cashDropsCoordinates: null,
      startY: 0,
      counter: 0,
      mapHeight: 0
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
    centerUpdate (center) {
      this.markerLocation = center
    },
    readyMap () {
    // this.$watchLocation({})
      this.$getLocation({}).then(coordinates => {
        const coors = latLng(coordinates.lat, coordinates.lng)
        this.center = coors
        this.circle.center = coors
        this.isLocationShared = true
      }).catch(error => console.log('Unable to retreive your location: ', error))
    },
    toggleWindowInfo (infoIndex) {
      this.activeIndex !== infoIndex ? this.quests[this.activeIndex].radiusVisibility = false : ''
      this.quests[infoIndex].infoWinOpen = !this.quests[infoIndex].infoWinOpen
      this.quests[infoIndex].radiusVisibility = !this.quests[infoIndex].radiusVisibility
      this.cashDropsCoordinates = this.quests[infoIndex].infoWinOpen === true ? this.quests[infoIndex].cashdrops : ''
      this.activeIndex = infoIndex
    },
    removePopUpinfo () {
      if (this.quests !== null) {
        this.quests[this.activeIndex].infoWinOpen === true ? document.getElementsByClassName('leaflet-popup-close-button')[0].click() : ''
        this.quests[this.activeIndex].infoWinOpen = false
        this.quests[this.activeIndex].radiusVisibility = false
        this.cashDropsCoordinates = null
      }

      this.markerLocation = this.$refs.myPurelyPeerMap.mapObject.getCenter()
    },
    resizeMapHeight ({ evt, ...info }) {
      const map = this.$refs.myPurelyPeerMap.$el
      if (this.counter === 0) {
        this.mapHeight = parseInt(document.defaultView.getComputedStyle(map).height, 10)
        this.startY = Math.round(evt.changedTouches[0].screenY)
      }
      if (!info.isFinal) {
        this.counter++
      } else {
        this.counter = 0
      }
      this.doResize(event)
    },
    doResize (e) {
      const map = this.$refs.myPurelyPeerMap
      const newHeight = this.mapHeight + e.changedTouches[0].screenY - this.startY
      const minMapHeight = 334

      if (((80 / 100) * window.innerHeight) >= newHeight) {
        newHeight >= minMapHeight ? map.$el.style.height = newHeight + 'px' : ''
      }
      this.$refs.myPurelyPeerMap.mapObject.invalidateSize()
    }
  },
  created () {
    Geolocation.getCurrentPosition().then(position => {
      console.log('Location: ', position)
    }).catch(error => console.log('Unable to retreive your location: ', error))
  },
  async mounted () {
    await this.$store.dispatch('cashdrop/fetchQuestList').then(res => {
      this.quests = res.data.results.map(quest => ({ ...quest, infoWinOpen: false, radiusVisibility: false }))
    }).catch(err => {
      console.log('Error: ', err)
    })
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
  text-align: center;
  width: 100%;
  z-index: 1000;
}
.zoom-controls span {
  cursor: pointer;
  font-size: 28px;
  z-index: 1000;
}
.q-layout--standard {
  min-height: 334px !important;
}
.adjust-map-height {
  position: absolute;
  text-align: center;
  bottom: 18px;
  width: 100%;
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
