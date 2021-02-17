<template>
	<div id="quest-list">
		<div class="col-12 quest-container">
			<h5 class="text-center q-mt-md q-mb-sm">Cash Drop Form</h5>


			<div class="q-mx-md q-mt-md">
				<div class="row justify-center q-mb-md">
					<div class="col-11">
						<q-form
					      class="q-gutter-y-sm"
					    >
							<q-input color="grey-5" :dense="true" bg-color="white" outlined label="Merchant Name" />
							<q-input color="grey-5" :dense="true" bg-color="white" outlined label="Phone number" />
							<q-input color="grey-5" :dense="true" bg-color="white" outlined label="Contact URL" />
							<q-input color="grey-5" :dense="true" bg-color="white" outlined label="Custom Field" />
							<q-select outlined color="grey-5" :dense="true" bg-color="white" v-model="tierModel" :options="tier.options" label="PurelyPeer Tier" />
							<q-select outlined color="grey-5" :dense="true" bg-color="white" v-model="presenceModel" :options="presence.options" label="Presence" />
							<q-select outlined color="grey-5" :dense="true" bg-color="white" v-model="radiusModel" :options="radius.options" label="Radius" />
							<q-btn label="Submit" outline type="submit" class="full-width" color="grey-6"/>
						</q-form>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			tierModel: null,
			tier: {
			    options: [
			        '\u2764\uFE0F \uD83D\uDCAF', '\uD83D\uDC9A', '\uD83E\uDDE1', '\uD83D\uDC99', '\uD83D\uDDA4'
			    ]
			},
			presenceModel: null,
			presence: {
				options: [
					'\uD83E\uDDF1 \uD83D\uDCAF', '\uD83E\uDDF1 \u2714\uFE0F', '\uD83E\uDDF1 \u274C'
				]
			},
			radiusModel: null,
			radius: {
				options: [
					'\u2B55 \uD83D\uDCAF', '\uD83D\uDD7A \u267F \uD83D\uDC83', '\uD83C\uDFD9\uFE0F', '\uD83D\uDEE3\uFE0F', '\uD83C\uDF10'
				]
			}
		}
	},
}
</script>

<style scoped>
</style>