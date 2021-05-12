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

          <l-marker v-for="(mark, markerIndex) in quests" :key="markerIndex+'marker'"
          :lat-lng="mark.coors" @click="toggleWindowInfo(markerIndex)">
            <l-popup :options="popUpOptions" @remove="removePopUpinfo" ref="pops">
              <div class="infowindow">
                  <p>Quest Name: <span class="text-weight-bold">{{ mark.name }}</span></p>
                  <p>PurelyPeer Tier: <span class="text-weight-bold">{{ (mark.acceptance_tier).charAt(0).toUpperCase()+(mark.acceptance_tier).slice(1) }}</span></p>
                  <p>X/Y: <span class="text-weight-bold">{{ mark.cashdrops_remaining + '/' + mark.total_cashdrops }}</span></p>
              </div>
            </l-popup>
            <l-icon
              :icon-size="[mark.active === true ? 30 : 50, mark.active === true ? 40 : 50]"
              :icon-anchor="[mark.active === true ? 1 : 12, mark.active === true ? 40 : 44]"
              :icon-url="(mark.active === true ? (mark.acceptance_tier === 'Upcoming' ? 'PurelyPeer-location-blue.png' : (mark.acceptance_tier === 'Direct' ? 'PurelyPeer-location-green.png' : 'PurelyPeer-location-orange.png')) : 'PurelyPeer-icon-black.png')" />
          </l-marker>

          <l-marker :lat-lng="cashDropCoor.coors" v-for="(cashDropCoor, cashDropsIndex) in cashDropsCoordinates" :key="cashDropsIndex+'dropMarker'">
              <l-icon
                  :icon-size="[30, 30]"
                  :icon-anchor="[15, 15]"
                  :icon-url="'PurelyPeer-location-current-B.png'" />
          </l-marker>

          <l-circle
            v-for="(pin, index) in quests" :key="index+'quest'"
            :lat-lng="pin.coors"
            :radius="pin.reveal_radius"
            :color="revealCircle.color"
            :fillColor="revealCircle.fillColor"
            :weight="1"
            :visible="pin.radiusVisibility" />

          <l-circle
            v-for="(pin, index) in cashDropsCoordinates" :key="index+'reveal'"
            :lat-lng="pin.coors"
            :radius="pin.reveal_radius"
            :color="revealCircle.color"
            :fillColor="revealCircle.fillColor"
            :weight="1"
            :visible="true" />

          <l-circle
            v-for="(pin, index) in cashDropsCoordinates" :key="index+'claim'"
            :lat-lng="pin.coors"
            :radius="pin.claim_radius"
            :color="claimCircle.color"
            :fillColor="claimCircle.fillColor"
            :weight="1"
            :visible="true" />
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
import { LMap, LTileLayer, LMarker, LCircle, LPopup, LIcon } from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import ClaimForm from '../../components/collect/flash-components/ClaimCashdropForm.vue'
import ClaimForm2 from '../../components/collect/flash-components/ClaimCashdropForm2.vue'

const { Geolocation } = Plugins

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
        iconUrl: 'PurelyPeer-location-current-A.png',
        iconSize: [80, 80],
        iconAnchor: [40, 54]
      }),
      markerLocation: latLng(0, 0),
      circle: {
        color: '#0AC18E',
        fillColor: 'transparent'
      },
      revealCircle: {
        color: '#0AC18E',
        fillColor: 'transparent'
      },
      claimCircle: {
        color: '#F7CE86',
        fillColor: 'transparent'
      },
      quests: undefined,
      activeIndex: 0,
      cashDropsCoordinates: [],
      startY: 0,
      counter: 0,
      mapHeight: 0,
      socketMessage: null,
      coors: [0, 0],
      filteredRevealCashdrop: []
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
      this.activeIndex = infoIndex
    },
    removePopUpinfo () {
      if (this.quests !== null) {
        if (this.quests[this.activeIndex].infoWinOpen === true) {
          document.getElementsByClassName('leaflet-popup-close-button')[0].click()
        }
        this.quests[this.activeIndex].infoWinOpen = false
        this.quests[this.activeIndex].radiusVisibility = false
        this.$refs['markerIndexer' + this.activeIndex][0].mapObject.closePopup()
      }
      // this.markerLocation = this.$refs.myPurelyPeerMap.mapObject.getCenter()
    }
  },
  beforeDestroy () {
    // this.$socket.onclose = () => { console.log('Socket closed') }
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
      const cashdrop = JSON.parse(data.data)

      console.log('Data: ', cashdrop)

      let coors = ''
      switch (cashdrop.operation) {
        case 'cashdrop_claim':
          console.log('Cashdrop claim')

          if (cashdrop.data.type === 'passcode_sig') {
            console.log('Passcode sig')
            this.$q.dialog({
              component: ClaimForm,
              parent: this
            }).onOk(() => {
            }).onCancel(() => {
            })
          } else if (cashdrop.data.type === 'sig_only') {
            console.log('Sig only')
            this.$q.dialog({
              component: ClaimForm2,
              parent: this
            }).onOk(() => {
            }).onCancel(() => {
            })
          }
          break
        case 'reveal_cashdrop':
          // console.log('Cashdrop revealed')
          if (cashdrop.data.data.cashdrop_coors !== 'undefined') {
            coors = {
              coors: cashdrop.data.data.cashdrop_coors,
              reveal_radius: cashdrop.data.data.cashdrop_reveal_radius,
              claim_radius: cashdrop.data.data.cashdrop_claim_radius
            }
            if (!this.filteredRevealCashdrop.includes(cashdrop.data.data.cashdrop_id)) {
              // add the cashdrop id to the array list to use for filtering cashdrop to avoid duplicates
              this.filteredRevealCashdrop.push(cashdrop.data.data.cashdrop_id)
              // add the cashdrop coordinates to the array list to display on the map
              this.cashDropsCoordinates.push(coors)
              console.log('Cashdrops: ', this.cashDropsCoordinates)
            }
          }
          break
      }
    }
    this.$socket.onopen = () => {
      console.log('Socket opened')
      setInterval(() => {
        this.geoId = Geolocation.watchPosition({}, (position, err) => {
          this.coors = position ? [(position.coords.latitude).toFixed(8), (position.coords.longitude).toFixed(8)] : this.coors
          this.center = this.coors
          this.circle.center = this.coors
          this.markerLocation = this.coors
        })
        // data: [this.coors]
        let data = {
          operation: 'user_loc_tracking',
          data: {
            data: [11.16552, 124.98796],
            type: 'info'
          }
        }
        console.log('data: ', data)
        data = JSON.stringify(data)
        this.$store.dispatch('sendMessage', data)
      }, 10000)
    }
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
