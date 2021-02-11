<template>
	<div class="row">
		<ExploreMap />
		<QuestList />
	</div>
</template>

<script>
import ExploreMap from '../../components/explore/ExploreMap.vue'
import QuestList from '../../components/explore/QuestList.vue'

export default {
	components: {
		ExploreMap,
		QuestList
	}
}
</script>

<style lang="scss">
</style>