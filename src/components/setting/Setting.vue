<template>
	<div id="setting">
		<div class="col-12 text-center">
			<h5 class="text-white setting-caption q-mt-md q-mb-sm">Setting</h5>

			<q-btn-group>
		      <q-btn color="notify-purelypeer" label="Load" />
		      <q-btn color="notify-purelypeer" label="Receive" />
		      <q-btn color="notify-purelypeer" label="Send" />
		      <q-btn color="notify-purelypeer" label="History" />
		    </q-btn-group>
		</div>
	</div>
</template>

<script>

import checkBCHBalance from '../../utils/check_bchbalance.js'

export default {
	data () {
		return {}
	},
	created () {
		console.log('BCH Add: ', this.$store.state.wallet.wallet.addresses[0].bch)
		let balance = checkBCHBalance(this.$store.state.wallet.wallet.addresses[0].bch)
			.then(response => {
				console.log('Success: ', response)
			})
			.catch(error => {
				console.log('Failed: ', error)
			})
	}
}
</script>

<style scoped>

.bg-notify-purelypeer {
	background-color: #0AC18E;
}
</style>