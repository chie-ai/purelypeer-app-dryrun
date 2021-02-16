<template>
	<div id="explore-map" class="q-mx-xs q-pa-none">
		<div class="col-12">
			<GmapMap ref="mapRef"
			  :center="{lat: 12.8797, lng: 121.7740}"
			  :zoom="6"
			  map-type-id="terrain"
			  class="map-layout"
			>
			</GmapMap>
		</div>
	</div>
</template>

<script>

export default {
	data () {
		return {
			coordinates: {
				lat: 0,
				lng: 0
			}
		}
	},
	mounted () {
	    this.$refs.mapRef.$mapPromise.then((map) => {
	    	map.panTo({lat: 12.8797, lng: 121.7740})
	    })
	},
	created () {
		this.$getLocation({})
		.then(coordinates => {
			this.coordinates = coordinates
			alert('Coordinates: ', coordinates)
		})
		.catch(error => console.log(error))
	}
}
</script>

<style>
#explore-map {
	height: 350px;
	width: 100%;
	border: 3px solid #B5C2BD;
	border-radius: 20px;
	background: #C0E5F9;
	overflow: auto;
	box-shadow: inset 6px 6px 12px #b3d5e8,
	            inset -6px -6px 12px #cdf5ff;
}
.map-layout {
	width: 100%;
	height: 344px;
}
</style>