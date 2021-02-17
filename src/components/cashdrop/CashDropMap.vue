<template>
	<div id="explore-map" class="row q-pa-md">
		<div class="col-12" style="overflow: auto; border-radius: 10px">
			<GmapMap
			  ref="mapRef"
			  :center="coordinates"
			  :zoom="10"
			  map-type-id="terrain"
			  class="map-layout"
			>
				<GmapMarker ref="myMarker"
				    :position="google && new google.maps.LatLng(coordinates)" />
				<!-- <GmapMarker
				    :key="index"
				    v-for="(m, index) in markers"
				    :position="m.position"
				    :clickable="true"
				    :draggable="true"
				    @click="center=m.position"
				/> -->
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
			}
		}
	},
	computed: {
	    google: gmapApi
	},
	mounted () {
	    // this.$refs.mapRef.$mapPromise.then((map) => {
	    //   map.panTo({lat: 11.2543, lng: 124.9617})
	    // })
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