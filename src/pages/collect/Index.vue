<template>
	<div class="row">
		<ExploreMap />
		<Gallery />
	</div>
</template>

<script>
import ExploreMap from '../../components/collect/CollectMap.vue'
import Gallery from '../../components/collect/Gallery.vue'

export default {
	components: {
		ExploreMap,
		Gallery
	}
}
</script>

<style lang="scss">
</style>