<template>
	<div id="explore-map" class="row">
		<div class="col-12" style="position: relative;">
			<GmapMap ref="mapRef" :center="coordinates" :zoom="13"
			  :options="{
			   styles: mapCustomStyle.styles,
			   draggableCursor: true,
			   gestureHandling: 'greedy',
			   zoomControl: false, mapTypeControl: false,
			   scaleControl: false, streetViewControl: false,
			   rotateControl: false, fullscreenControl: true, disableDefaultUI: false }"
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

				<GmapMarker ref="myMarker" :icon="{url: 'PurelyPeer-location-current-A.png', scaledSize: google && new google.maps.Size(80, 80), anchor: google && new google.maps.Point(40, 60)}"
				    :position="google && new google.maps.LatLng(coordinates)" @click="toggleInfoWindow('Lat & Lng coordinates')" />

			</GmapMap>
			<!-- <p>{{ coordinates.lat }} Latitude, {{ coordinates.lng }}, Longitude</p> -->
		</div>
	</div>
</template>

<script>
import { gmapApi } from 'gmap-vue'

export default {
	data () {
		return {
		    markers: [
		        { Id: 1, name: "Oslo" }
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
				    {
				      elementType: "labels.icon",
				      stylers: [{ color: "#A6ACAF" }],
				    },
				    {
				      featureType: "administrative",
				      elementType: "labels.text.fill",
				      stylers: [{ color: "#A3A3A3" }],
				    },
				    {
				      featureType: "landscape",
				      elementType: "labels.text.fill",
				      stylers: [{ color: "#939393" }],
				    },
				    {
				      featureType: "poi",
				      elementType: "labels.text.fill",
				      stylers: [{ color: "#757575" }],
				    },
				    {
				      featureType: "transit",
				      elementType: "geometry",
				      stylers: [{ color: "#e5e5e5" }],
				    },
				    {
				      featureType: "transit",
				      elementType: "labels.text.fill",
				      stylers: [{ color: "#757575" }],
				    },
				    {
				      featureType: "road",
				      elementType: "geometry",
				      stylers: [{ color: "#F4F6F7" }],
				    },
				    {
				      featureType: "road",
				      elementType: "labels.text.fill",
				      stylers: [{ color: "#9B9A9A" }],
				    },
				    {
				      featureType: "road.highway",
				      elementType: "labels.icon",
				      stylers: [{ visibility: "off" }],
				    },
				    {
				      featureType: "road.highway",
				      elementType: "geometry",
				      stylers: [{ color: "#D7DBDD" }],
				    },
				    {
				      featureType: "water",
				      elementType: "labels.text.fill",
				      stylers: [{ color: "#2980B9" }],
				    },
				]
			},
		}
	},
	computed: {
	    google: gmapApi
	},
	methods: {
		toggleInfoWindow () {
            this.infoWinOpen = !this.infoWinOpen;
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
	}
}
</script>

<style scoped>
</style>