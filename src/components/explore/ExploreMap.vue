<template>
	<div id="explore-map" class="row">
		<div class="col-12" style="position: relative; ">
			<GmapMap ref="mapRef" :center="coordinates" :zoom="14"
			  :options="{
			   zoomControl: false, mapTypeControl: false,
			   scaleControl: false, streetViewControl: false,
			   rotateControl: false, fullscreenControl: true, disableDefaultUI: false }"
			  map-type-id="terrain" class="map-layout"
			>

				<!-- <template #visible>
			        <gmap-drawing-manager
			          :position="'TOP_CENTER'"
			          :circle-options="circleOptions"
			          :shapes="shapes"
			        >
			        </gmap-drawing-manager>
			    </template> -->

				<GmapInfoWindow :options="infoOptions" :position="coordinates" :opened="infoWinOpen" @closeclick="infoWinOpen=false"></GmapInfoWindow>

				<GmapMarker ref="myMarker" :icon="{url: 'PurelyPeer-location-current-A.png', scaledSize: google &&  new google.maps.Size(80, 80), anchor: google &&  new google.maps.Point(40, 60)}"
				    :position="google && new google.maps.LatLng(coordinates)" @click="toggleInfoWindow" />

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
			coordinates: {
				lat: 0,
				lng: 0
			},
			infoOptions: {
				content: "<strong>Marker 1</strong>",
	            pixelOffset: {
	              width: 0,
	              height: -35
	            }
			},
        	infoWinOpen: false,
	       /* circleOptions: {
	            fillColor: 'transparent',
	            fillOpacity: 0,
	            strokeWeight: 2,
	            strokeColor: '#61A995',
	            draggable: true,
	            editable: false,
	            clickable: true
	        },
        	shapes: [],*/
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