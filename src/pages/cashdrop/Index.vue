<template>
	<div class="row">
		<CashDropMap :change-quest-radius="radius" />
		<CashDrop v-on:changeQuestRadius="changeQuestRadius" />
	</div>
</template>

<script>
import CashDropMap from '../../components/cashdrop/CashDropMap.vue'
import CashDrop from '../../components/cashdrop/CashDropForm.vue'

export default {
	data () {
		return {
			radius: 1000
		}
	},
	components: {
		CashDropMap,
		CashDrop
	},
	methods: {
		changeQuestRadius (radius) {
			this.radius = radius
		}
	}
}
</script>

<style lang="scss">
</style>