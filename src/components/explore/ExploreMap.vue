<template>
	<div id="explore-map" class="row">
		<div class="col-12" style="position: relative;">
			<GmapMap ref="mapRef" :center="coordinates" :zoom="zoomScale"
			  :options="{
			   styles: mapCustomStyle.styles, draggableCursor: true, gestureHandling: 'greedy',
			   zoomControl: false, mapTypeControl: false, scaleControl: true, streetViewControl: false,
			   rotateControl: false, fullscreenControl: false, disableDefaultUI: false }"
			  map-type-id="roadmap" class="map-layout"
			>

				<GmapCircle
				    v-for="(pin, index) in markers"
				    :key="index"
				    :center="coordinates"
				    :radius="3000"
				    :visible="true"
				    :options="{ strokeColor: '#0AC18E', strokeOpacity: 0.5, strokeWeight: 2, fillColor:'white', fillOpacity: 0 }">
				</GmapCircle>

				<GmapInfoWindow :options="infoOptions" :position="coordinates" :opened="infoWinOpen" @closeclick="infoWinOpen=false"></GmapInfoWindow>

				<GmapMarker ref="myMarker" :icon="{url: 'PurelyPeer-location-current-A.png', scaledSize: google && new google.maps.Size(80, 80), anchor: google && new google.maps.Point(40, 54)}"
				    :position="google && new google.maps.LatLng(coordinates)" @click="toggleInfoWindow" />

			</GmapMap>

			<div class="adjust-map-height">
				<i class="mdi mdi-dots-horizontal text-h4 resize-controller" v-touch-pan.vertical.prevent.mouse="handlePan" v-on:click="resizeMapHeight"></i>
			</div>
			<!-- <p>{{ coordinates.lat }} Latitude, {{ coordinates.lng }}, Longitude</p> -->
		</div>
	</div>
</template>

<script>
import { gmapApi } from 'gmap-vue'

const start = 334

export default {
	data () {
		return {
			zoomScale: 13, 
		    markers: [
		        { Id: 1 }
		    ],
			coordinates: {
				lat: 0,
				lng: 0
			},
			infoOptions: {
				content: "<p><strong>Sample Quest Info</strong></p>\
							<p style='margin: 3px 0 3px 0'><strong>Quest Name: </strong> Trump Card Collection</p>\
							<p style='margin: 3px 0 3px 0'><strong>Cashdrops Count: </strong> 10</p>\
							<p style='margin: 3px 0 3px 0'><strong>PurelyPeer Tier: </strong> \u2764\uFE0F \uD83D\uDCAF</p>",
	            pixelOffset: {
	              width: 0,
	              height: -35
	            }
			},
        	infoWinOpen: false,
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
			startHeight: null,
			startY: null
		}
	},
	computed: {
	    google: gmapApi
	},
	methods: {
		toggleInfoWindow () {
            this.infoWinOpen = !this.infoWinOpen;
		},
		resizeMapHeight (e) {
			let elipsis = document.getElementsByClassName('resize-controller')
			let map = document.getElementsByClassName('map-layout')

			this.startHeight = parseInt(document.defaultView.getComputedStyle(map[0]).height, 10);
			this.startY = e.clientY

			elipsis[0].addEventListener('mousedown', this.initResize, false)
		},
		initResize () {
			document.documentElement.addEventListener('mousemove', this.doResize, false)
			document.documentElement.addEventListener('mouseup', this.stopResize, false)
		},
		doResize (e) {
			let map = document.getElementsByClassName('map-layout')
			let newHeight = this.startHeight + e.clientY - this.startY

			newHeight >= 334 ? map[0].style.height = (newHeight) + 'px' : ''
		},
		stopResize () {
			document.documentElement.removeEventListener('mousemove', this.doResize, false);
			document.documentElement.removeEventListener('mouseup', this.stopResize, false);
		},
		handlePan ({ evt, ...info }) {
		    console.log(info.position.top)
		    console.log(document.getElementsByClassName('map-layout')[0])

			let map = document.getElementsByClassName('map-layout')
		    this.startHeight = parseInt(document.defaultView.getComputedStyle(map[0]).height, 10);

		    console.log('Height: ', this.startHeight)

			let newHeight = this.startHeight + info.position.top - start

		    console.log('New Height: ', newHeight)

		    newHeight >= 334 ? map[0].style.height = (newHeight) + 'px' : ''
	    }
	},
	created () {
		this.$getLocation({})
		.then(coordinates => {
			this.coordinates = coordinates
			
		    this.$refs.mapRef.$mapPromise.then((map) => {
		      map.panTo(coordinates)
		    })
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

		setTimeout(() => {
			el2[0].firstChild.firstChild.prepend(el)
		}, 2000)
	}
}
</script>

<style scoped>
.adjust-map-height {
	position: absolute;
	text-align: center;
	bottom: 0px;
	width: 100%;
	z-index: 30 !important;
}
.resize-controller {
	cursor: pointer;
}
</style>