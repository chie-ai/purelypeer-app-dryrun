<template>
	<div class="row animate-in-load">
		<CashDropMap :change-quest-radius="radius" :map-visibility="visibility" :change-quest-tier="tier" v-on:passCoordinatesToForm="passCoordinatesToForm" />
		<CashDropForm v-on:changeQuestRadius="changeQuestRadius" v-on:toogleQuestlist="formVisibility" v-on:changeQuestTier="changeQuestTier" :quest-coordinates="coordinates" />
	</div>
</template>

<script>
import CashDropMap from '../../components/cashdrop/CashDropMap.vue'
import CashDropForm from '../../components/cashdrop/CashDropForm.vue'

export default {
	data () {
		return {
			radius: 1000,
			tier: 'inactive',
			coordinates: null,
			visibility: null
		}
	},
	components: {
		CashDropMap,
		CashDropForm
	},
	methods: {
		changeQuestRadius (radius) {
			this.radius = radius
		},
		changeQuestTier (tier) {
			this.tier = tier
		},
		passCoordinatesToForm (coors) {
			this.coordinates = coors
		},
		formVisibility (bool) {
			this.visibility = bool
		}
	}
}
</script>

<style lang="scss">
</style>