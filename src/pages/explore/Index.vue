<template>
	<div class="row">
		<ExploreMap :move-to-the-quest-coor="coordinates" />
		<QuestList v-on:moveToTheQuest="hello" />
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
		hello (coordinates) {
			this.coordinates = coordinates
		}
	}
}
</script>

<style lang="scss">
</style>