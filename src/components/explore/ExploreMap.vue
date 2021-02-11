<template>
	<div id="explore-map" class="q-mx-xs">
		<div class="col-12 q-pa-md">
			<GmapMap ref="mapRef"
			  :center="{lat:10, lng:10}"
			  :zoom="4"
			  map-type-id="terrain"
			  class="map-layout"
			>

			</GmapMap>
		</div>
	</div>
</template>

<script>

export default {
  mounted () {
    this.$refs.mapRef.$mapPromise.then((map) => {
      map.panTo({lat: 12.8797, lng: 121.7740})
    })
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
	box-shadow: inset 6px 6px 12px #b3d5e8,
	            inset -6px -6px 12px #cdf5ff;
}
.map-layout {
	width: 100%;
	height: 310px;
}
</style>