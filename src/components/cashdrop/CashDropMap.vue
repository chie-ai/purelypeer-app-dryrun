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
					<!-- <l-control :position="'topleft'" class="purelypeer-watermark" >
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
import { latLng, icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LCircle, LIcon, LControl } from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';

export default {
	name: "Create-quest-map",
	components: {
	    LMap,
	    LTileLayer,
	    LMarker,
	    LCircle,
	    LIcon,
	    LControl
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
	    		autoPan: false,
	    	},
	    	center: latLng(0, 0),
	    	icon: icon({
		        iconUrl: 'PurelyPeer-icon-black.png',
		        iconSize: [50, 51],
		        iconAnchor: [12, 46]
		    }),
		    markerLocation: latLng(0, 0),
		    circle: {
		        color: '#0AC18E',
		        fillColor: 'transparent'
		    },
			questRadius: 1500,
			isLocationShared: false,
			questRadius: 1000,
			questTier: 'inactive',
			tierVariation: 'inactive'
		}
	},
	props: ['changeQuestRadius','changeQuestTier'],
	watch: {
		changeQuestRadius (newRadius, oldRadius) {
			this.questRadius = newRadius
			if (this.questRadius === 1500) {
				this.zoomScale = 13
			}
			else if (this.questRadius === 15000) {
				this.zoomScale = 10
			}
			else if (this.questRadius === 150000) {
				this.zoomScale = 7
			}
			else {
				this.zoomScale = 4
			}
		},
		changeQuestTier (newTier, oldTier) {
			this.icon = icon({
							iconUrl: newTier.tierIcon,
							iconSize: [newTier.tier !== 'inactive' ? 30 : 50, newTier.tier !== 'inactive' ? 40 : 51],
							iconAnchor: [newTier.tier !== 'inactive' ? 2 : 12, newTier.tier !== 'inactive' ? 39 : 46]
						})
		}
	},
	methods: {
 	    centerUpdate(center) {
	    	this.markerLocation = center
	    	this.circle.center = center

			this.$emit('passCoordinatesToForm', center)
	    },
	    readyMap () {
			// this.$watchLocation({})
	    	this.$getLocation({})
			.then(coordinates => {
				let coors = latLng(coordinates.lat, coordinates.lng)
				this.center = coors
				this.circle.center = coors
				this.isLocationShared = true
			})
			.catch(error => console.log('Unable to retreive your location: ', error))
		},
		updateMarkerCoordinates () {
			this.markerLocation = this.$refs.myPurelyPeerMap.mapObject.getCenter()
		},
		resizeMapHeight ({ evt, ...info }) {
			let map = this.$refs.myPurelyPeerMap.$el
		    if(this.counter == 0) {
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
			let map = this.$refs.myPurelyPeerMap
			let newHeight = this.mapHeight + e.changedTouches[0].screenY - this.startY
			let min_MapHeight = 334

			if (((80/100) * window.innerHeight) >= newHeight) {
				newHeight >= min_MapHeight ? map.$el.style.height = newHeight + 'px' : ''
			}
			this.$refs.myPurelyPeerMap.mapObject.invalidateSize()
		},
	},
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