<template>
	<div class="row">
		<CashDropMap :change-quest-radius="radius" :change-quest-tier="tier" />
		<CashDrop v-on:changeQuestRadius="changeQuestRadius" v-on:changeQuestTier="changeQuestTier" />
	</div>
</template>

<script>
import CashDropMap from '../../components/cashdrop/CashDropMap.vue'
import CashDrop from '../../components/cashdrop/CashDropForm.vue'

export default {
	data () {
		return {
			radius: 1000,
			tier: 'inactive'
		}
	},
	components: {
		CashDropMap,
		CashDrop
	},
	methods: {
		changeQuestRadius (radius) {
			this.radius = radius
		},
		changeQuestTier (tier) {
			this.tier = tier
		}
	}
}
</script>

<style lang="scss">
</style>