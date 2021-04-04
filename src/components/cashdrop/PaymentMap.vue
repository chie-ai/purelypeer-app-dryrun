<template>
  <q-layout>
    <q-page-container>
      	<div id="explore-map" class="row" ref="exploreMap">
          	<div class="q-mt-md zoom-controls">
            	<span class="q-mr-xs" @click="zoomScale++">&#x2B06;&#xFE0F;</span>
            	<span class="q-ml-xs" @click="zoomScale">&#x2B07;&#xFE0F;</span>
          	</div>
          	<l-map
	            :zoom="zoomScale"
	            :center="center"
	            :options="mapOptions"
	            style="height: 334px"
	            @ready="readyMap"
	            @moveend="updateMarkerCoordinates"
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
            <div class="adjust-map-height q-px-md">
                <q-btn color="btn-map-resizer text-btn-color" class="btn-map" v-touch-pan.vertical.prevent.mouse="resizeMapHeight" size="sm" label="Drag to resize" />
            </div>
      	</div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { latLng, icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LCircle, LIcon, LControl } from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';

export default {
	name: 'Payment-map',
	components: {
	    LMap,
	    LTileLayer,
	    LMarker,
	    LCircle,
	    // LIcon,
	    LControl
	},
	data () {
		return {
		    circle: {
		        color: '#0AC18E',
		        fillColor: 'transparent'
		    },
		    isLocationShared: false,
      		zoomScale: 14,
      		center: latLng(0, 0),
      		url: 'https://{s}.basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png',
      		attribution: '©OpenStreetMap, ©CartoDB',
      		mapOptions: {
        		zoomSnap: 0.5,
        		closePopupOnClick: true,
        		zoomControl: false,
        		inertia: true
      		},
		    icon: null,
      		markerLocation: latLng(0, 0),
      		questRadius: null,
		}
	},
	methods: {
	    readyMap () {
        	this.isLocationShared = true
			this.center = this.$store.state.cashdrop.createdQuestInfo.coordinates

			this.questRadius = this.$store.state.cashdrop.createdQuestInfo.radius
		    if (this.questRadius === 1500) {
		        this.zoomScale = 14
		    } else if (this.questRadius === 15000) {
		        this.zoomScale = 10
		    } else if (this.questRadius === 150000) {
		        this.zoomScale = 7
		    } else {
		        this.zoomScale = 4
		    }

			let tier = this.$store.state.cashdrop.createdQuestInfo.tier
		    let tierIcon = 'PurelyPeer-icon-black.png'
		    if (tier === 'Direct') {
		    	tierIcon = 'PurelyPeer-location-green.png'
		    } else if (tier === 'Indirect') {
		    	tierIcon = 'PurelyPeer-location-orange.png'
		    } else if (tier === 'Upcoming') {
		    	tierIcon = 'PurelyPeer-location-blue.png'
		    }

			this.icon = icon({
				iconUrl: tierIcon,
				iconSize: [tier !== 'Inactive' ? 30 : 50, tier !== 'Inactive' ? 40 : 51],
				iconAnchor: [tier !== 'Inactive' ? 2 : 12, tier !== 'Inactive' ? 39 : 46]
			})
	    },
	    updateMarkerCoordinates () {
	      	this.markerLocation = this.coors
	      	this.center = latLng(this.coors[0], this.coors[1])
		    this.$refs.myPurelyPeerMap.mapObject.stop()
	      	console.log('Marker Coors: ', this.center)
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
		this.coors = this.$store.state.cashdrop.createdQuestInfo.coordinates
		console.log('Coors: ', this.coors)
	}
}
</script>

<style>
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
</style>
