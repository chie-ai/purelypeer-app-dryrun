<template>
	<div class="row">
		<ExploreMap :move-to-the-quest-coordinates="coordinates" />
		<QuestList v-on:moveToTheQuestCoordinates="questCoordinates" />
	</div>
</template>

<script>
import ExploreMap from '../../components/explore/ExploreMap.vue'
import QuestList from '../../components/explore/QuestList.vue'

export default {
	data () {
		return {
			coordinates: null
		}
	},
	components: {
		ExploreMap,
		QuestList
	},
	methods: {
		questCoordinates (coordinates) {
			this.coordinates = coordinates
		}
	}
}
</script>

<style lang="scss">
</style>