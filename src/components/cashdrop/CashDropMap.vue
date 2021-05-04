<template>
  <q-layout class="exploreMap">
    <q-page-container>
      <div id="explore-map" class="row" ref="exploreMap">
          <div class="example-custom-control q-mt-md zoom-controls">
              <span class="q-mr-sm q-pa-sm bg-zoom-scale shadow-2" style="border-radius: 50%; padding: 10px" v-wave="{ color: '#bbbbbb', initialOpacity: 0.5, easing: 'ease-in', duration: 0.3 }" @click="zoomScale++">&#10133;</span>
              <span class="q-pa-sm bg-zoom-scale shadow-2" style="border-radius: 50%; padding: 10px" v-wave="{ color: '#bbbbbb', initialOpacity: 0.5, easing: 'ease-in', duration: 0.3 }" @click="zoomScale--">&#10134;</span>
          </div>
          <l-map
            :zoom="zoomScale"
            :center="center"
            :options="mapOptions"
            style="height: 334px"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
            @ready="readyMap"
            @move="updateMarkerCoordinates"
            ref="myPurelyPeerMap"
          >
            <l-tile-layer :url="url" :attribution="attribution" />
            <l-marker :icon="icon" :lat-lng="markerLocation"></l-marker>

            <l-circle
              :lat-lng="markerLocation"
              :radius="questRadius"
              :color="circle.color"
              :fillColor="circle.fillColor"
              :weight="1" />
        </l-map>
        <!-- <div class="adjust-map-height q-px-md">
          <q-btn color="btn-map-resizer text-btn-color" rounded class="btn-map" v-touch-pan.vertical.prevent.mouse="resizeMapHeight" size="sm" label="Pinch to resize" />
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
  name: 'Create-quest-map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircle
  },
  data () {
    return {
      zoomScale: 14,
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
        iconUrl: 'PurelyPeer-location-blue.png',
        iconSize: [30, 40],
        iconAnchor: [1, 40]
      }),
      markerLocation: latLng(0, 0),
      circle: {
        color: '#0AC18E',
        fillColor: 'transparent'
      },
      isLocationShared: false,
      questRadius: 1000,
      questTier: 'inactive',
      tierVariation: 'inactive',
      staticLocation: null,
      startY: 0,
      counter: 0
    }
  },
  props: ['changeQuestRadius', 'changeQuestTier', 'mapVisibility'],
  watch: {
    changeQuestRadius (newRadius, oldRadius) {
      this.questRadius = newRadius
      if (this.questRadius === 1500) {
        this.zoomScale = 14
      } else if (this.questRadius === 15000) {
        this.zoomScale = 10
      } else if (this.questRadius === 150000) {
        this.zoomScale = 7
      } else {
        this.zoomScale = 4
      }
    },
    changeQuestTier (newTier, oldTier) {
      this.icon = icon({
        iconUrl: newTier.tierIcon,
        iconSize: [newTier.tier !== 'inactive' ? 30 : 50, newTier.tier !== 'inactive' ? 40 : 51],
        iconAnchor: [newTier.tier !== 'inactive' ? 1 : 12, newTier.tier !== 'inactive' ? 40 : 46]
      })
    },
    mapVisibility (newBoolean, oldBoolean) {
      newBoolean ? this.$refs.exploreMap.classList.add('hidden') : this.$refs.exploreMap.classList.remove('hidden')
    }
  },
  methods: {
    currentLocation () {
      this.center = this.staticLocation
    },
    zoomUpdate (scale) {
      this.zoomScale = scale
    },
    centerUpdate (center) {
      this.center = center
      this.$emit('passCoordinatesToForm', center)
    },
    readyMap () {
      // this.$watchLocation({})
      this.$getLocation({}).then(coordinates => {
        const coors = latLng(coordinates.lat, coordinates.lng)
        this.center = coors
        this.circle.center = coors
        this.markerLocation = coors
        this.staticLocation = coors
      }).catch(error => {
        this.zoomScale = 1
        console.log('Unable to retreive your location: ', error)
      })
    },
    updateMarkerCoordinates () {
      this.markerLocation = this.$refs.myPurelyPeerMap.mapObject.getCenter()
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
  created () {
    Geolocation.getCurrentPosition().then(position => {
      console.log('Location: ', position)
    }).catch(error => console.log('Unable to retreive your location: ', error))
  }
}
</script>

<style>
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
.btn-zoom-scale {
  background: rgba(255, 255, 255, 0.4);
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
