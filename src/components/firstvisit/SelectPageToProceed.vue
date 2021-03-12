<template>
	<div>
		<div class="q-px-md">
	        <div class="q-px-lg q-pb-md q-pt-lg text-center">
		        <img src="PurelyPeer-stamp.png" width="90%" class="rounded-borders">
	        </div>
		</div>
        <div class="q-px-lg">
	        <h5 class="q-my-md text-center">Select what to display</h5>
        </div>
        <div class="q-mt-md text-center">
			<div class="btn-seed-phrase q-px-sm">
				<div class="q-mt-lg q-px-lg">
				    <q-btn
					    rounded
					    class="btn-seedPhrase text-white q-mt-none"
					    size="md"
					    label="proceed to create"
					    @click="proceed('cash-drop')"
				    />
				</div>
				<div class="q-mt-lg q-px-lg">
				    <q-btn
					    rounded
					    class="btn-seedPhrase text-white q-mt-none"
					    size="md"
					    label="proceed to explore"
					    @click="proceed('explore')"
				    />
				</div>
				<div class="q-mt-lg q-px-lg">
				    <q-btn
					    rounded
					    class="btn-seedPhrase text-white q-mt-none"
					    size="md"
					    label="proceed to collect"
					    @click="proceed('collect')"
				    />
				</div>
			</div>
        </div>
	</div>
</template>

<script>
export default {
	methods: {
	    proceed (destination) {
	    	this.$router.push({path:`${destination}`})
	    },
		importWallet () {

			let wallet = {
				seed_hash: localStorage.getItem('seedHash'),
				xpubkey: localStorage.getItem('xPubkey')
			}

			this.$axios.post("https://staging.purelypeer.cash/api/wallet/import_wallet/", wallet)
			.then(response => {
				// console.log('Mutate Addresses', response)
				this.$store.commit('wallet/mutateAddresses', response.data.addresses)
			})
			.catch(error => console.log('Failed importing'))
		},
	},
	created () {
		this.importWallet()
	}
}
</script>

<style>
.btn-seedPhrase {
	background-color: #0AC18E;
	padding-top: 6px;
	padding-bottom: 2px;
	width: 100% !important;
}
</style>