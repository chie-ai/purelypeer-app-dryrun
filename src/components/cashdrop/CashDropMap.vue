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
				<GmapMarker ref="myMarker" :icon="{url: 'PurelyPeer-location-current-A.png', scaledSize: google && new google.maps.Size(80, 80), anchor: google && new google.maps.Point(40, 60)}"
				    :position="google && new google.maps.LatLng(coordinates)" />
			</GmapMap>
		</div>
	</div>
</template>

<script>
import { gmapApi } from 'gmap-vue'

export default {
	data () {
		return {
			coordinates: {
				lat: 0,
				lng: 0
			},
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