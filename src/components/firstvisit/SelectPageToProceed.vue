<template>
	<div ref="select_a_page">
		<div class="q-px-md q-mt-lg">
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
import { QSpinnerFacebook } from 'quasar'

export default {
	methods: {
	    proceed (destination) {

		    this.$q.loading.show({
		        spinner: QSpinnerFacebook,
		        spinnerColor: 'spinner-color',
		        spinnerSize: 140,
		        backgroundColor: 'white',
		        message: '<b>Importing of wallet is in progress.</b> <br/><strong style="color: #0AC18E;">Hang on...</strong>',
		        messageColor: 'black'
		    })
		    this.$refs.select_a_page.style.display = "none"

		    let wallet = {
				seed_hash: localStorage.getItem('seedHash'),
				xpubkey: localStorage.getItem('xPubkey')
			}

			this.$axios.post("https://staging.purelypeer.cash/api/wallet/import_wallet/", wallet)
			.then(response => {
				// console.log('Mutate Addresses', response)
				this.$store.commit('wallet/mutateAddresses', response.data.addresses)
			    setTimeout(() => {
			        this.$q.loading.hide()
			    	this.$router.push({path:`${destination}`})
			    }, 2000)
			})
			.catch(error => console.log('Failed importing'))
	    },
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
.text-spinner-color {
	color: #0AC18E;
}
</style>