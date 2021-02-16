<template>
	<div class="row">
		<ExploreMap />
		<QuestList />
	</div>
</template>

<script>
import ExploreMap from '../../components/cashdrop/CashDropMap.vue'
import QuestList from '../../components/cashdrop/CashDropForm.vue'

export default {
	components: {
		ExploreMap,
		QuestList
	}
}
</script>

<style lang="scss">
</style>