<template>
	<div id="explore-map" class="row">
		<div class="col-12" style="position: relative;">
			<GmapMap ref="mapRef" :center="coordinates" :zoom="zoomScale"
			  :options="{
			   styles: mapCustomStyle.styles, draggableCursor: true, gestureHandling: 'greedy',
			   zoomControl: false, mapTypeControl: false, scaleControl: false, streetViewControl: false,
			   rotateControl: false, fullscreenControl: false, disableDefaultUI: false }"
			  map-type-id="roadmap" class="map-layout"
			>
				<GmapCircle
				    :center="mapCoordinates"
				    :radius="questRadius"
				    :options="{ strokeColor: '#0AC18E', strokeOpacity: 0.5, strokeWeight: 2, fillColor:'white', fillOpacity: 0 }">
				</GmapCircle>

				<GmapMarker ref="myMarker"
					:icon="{
							url: markerIcon,
							scaledSize: google && new google.maps.Size(50, 50),
							anchor: google && new google.maps.Point(12, 44)}"
				    :position="google && new google.maps.LatLng(mapCoordinates)" />
			</GmapMap>
		</div>
		<div class="adjust-map-height">
			<button class="btn-google-maps-resizer" v-touch-pan.vertical.prevent.mouse="resizeMapHeight"><i class="mdi mdi-arrow-split-horizontal text-h4 resize-controller" ></i></button>
		</div>
	</div>
</template>

<script>
import { gmapApi } from 'gmap-vue'

export default {
	data () {
		return {
			zoomScale: 13, 
			coordinates: {
				lat: 0,
				lng: 0
			},
        	mapCustomStyle: {
				styles: [
				    { elementType: "labels.icon", stylers: [{ color: "#A6ACAF" }]},
				    { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#A3A3A3" }] },
				    { featureType: "landscape", elementType: "labels.text.fill", stylers: [{ color: "#939393" }] },
				    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
				    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
				    { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
				    { featureType: "road", elementType: "geometry", stylers: [{ color: "#F4F6F7" }] },
				    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9B9A9A" }] },
				    { featureType: "road.highway", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
				    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#D7DBDD" }] },
				    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#2980B9" }] },
				]
			},
			map: null,
			isLocationShared: false,
			questRadius: 1000,
			markerIcon: 'PurelyPeer-icon-black.png'
		}
	},
	props: ['changeQuestRadius'],
	computed: {
	    google: gmapApi,
	    mapCoordinates () {
	    	if(!this.map) {
	    		return {
	    			lat: 0,
	    			lng: 0
	    		}
	    	}

	    	this.infoWinOpen = false
	    	return {
	    		lat: this.map.getCenter().lat(),
	    		lng: this.map.getCenter().lng()
	    	}
	    }
	},
	watch: {
		changeQuestRadius (newRadius, oldRadius) {
			this.questRadius = this.changeQuestRadius
		}
	},
	methods: {
		resizeMapHeight ({ evt, ...info }) {
			let map = this.$refs.mapRef.$el

		    if(this.counter == 0) {
				this.mapHeight = parseInt(document.defaultView.getComputedStyle(map).height, 10);
		    	this.startY = (evt.type !== 'mousemove' ? Math.round(evt.changedTouches[0].screenY) : Math.round(evt.clientY))
		    }
		    if (!info.isFinal) {
		    	this.counter++
		    } else {
		    	this.counter = 0
		    }
			this.doResize(event)
	    },
		doResize (e) {
			let map = this.$refs.mapRef
			let newHeight = this.mapHeight + (e.type !== 'mousemove' ? e.changedTouches[0].screenY : e.clientY) - this.startY

			newHeight >= 334 ? map.$el.style.height = newHeight + 'px' : ''
		},
	},
	created () {
		this.$getLocation({})
		.then(coordinates => {
			this.coordinates = coordinates
			this.isLocationShared = true
		})
		.catch(error => console.log(error))
	},
	mounted () {
		let el = document.createElement('div')
		el.classList.add('q-mt-md')
		el.style.position = "absolute"
		el.style.zIndex = "20"
		el.style.width =  "100%"
		el.style.textAlign = "center"

		let elSpan1 = document.createElement('span')
		elSpan1.classList.add('q-mr-xs')
		elSpan1.style.fontSize = "28px"
		elSpan1.style.cursor = "pointer"
		elSpan1.appendChild(document.createTextNode('\u23EB'))
		elSpan1.addEventListener("click", () => {
			this.zoomScale++
		})

		let elSpan2 = document.createElement('span')
		elSpan2.classList.add('q-ml-xs')
		elSpan2.style.fontSize = "28px"
		elSpan2.style.cursor = "pointer"
		elSpan2.appendChild(document.createTextNode('\u23EC'))
		elSpan2.addEventListener("click", () => {
			this.zoomScale--
		})

		el.appendChild(elSpan1)
		el.appendChild(elSpan2)

		let el2 = document.getElementsByClassName('vue-map')

	    this.$refs.mapRef.$mapPromise.then((map) => {
	    	this.map = map
			setTimeout(() => {
				el2[0].firstChild.firstChild.prepend(el)
			}, 2000)
	    })
	}
}
</script>

<style scoped>
.adjust-map-height {
	position: absolute;
	text-align: center;
	bottom: -17px;
	width: 100%;
	z-index: 2 !important;
}
.resize-controller {
	cursor: pointer;
	color: 
}
.btn-google-maps-resizer {
	position: relative;
	height: 35px;
	width: 35px;
	padding: 0;
	border-radius: 100%;
	border: none;
	color: #fff;
	background: #0AC18E;
	outline: none;
	box-shadow: inset -6px -6px 12px #09ae80,
            inset 6px 6px 12px #0bd49c;
}
.btn-google-maps-resizer i {
	position: absolute;
	top: -2px;
	left: 7.5px;
	font-size: 20px !important;
}
</style>