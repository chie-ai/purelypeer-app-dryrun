<template>
  <div id="payment">
    <div class="col-12 quest-container q-mt-lg">
      	<h5 class="text-center q-mt-md q-mb-sm">Payment</h5>
    	<div class="qr-code-row q-mb-lg">
      		<qr-code text="sssaaammmmppppplllllllleeeee" color="#515D59" :size="220" class="seed-phrase q-mt-none"></qr-code>
    	</div>
    	<div>
    		<p class="text-h6 q-mb-none text-center wallet-text">Wallet Balance</p>
    		<p class="text-center">{{ balance }} <strong>BCH</strong></p>
    		<div class="text-center purelypeer-message">
    			<span>"Thank you for supporting the PurelyPeer economy!"</span>
    		</div>
    	</div>
        <div class="row justify-center q-mb-md">
	    	<div class="col-11">
		    	<q-form class="q-gutter-y-sm" @submit="onPay" action="https://some-url.com" method="post">
		    		<q-btn :label="'Pay \uD83D\uDCB8'"outline type="submit" class="full-width" color="grey-6"/>
			    </q-form>
	    	</div>
	    </div>
	</div>
  </div>
</template>

<script>
import { latLng, icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LCircle, LIcon, LControl } from "vue2-leaflet";
import server from '../../utils/getAPIServer.js'

export default {
  	data () {
    	return {
    		balance: null
    	}
  	},
  	method: {
  		onPay () {

  		}
  	},
  	created () {
		server.bchjs.Electrumx.balance('bitcoincash:qzuna0c5tvpzne7gennzzl73pr6pd0pzqqzvjlmgq5')
		.then(res => {
			console.log('Balance: ', res)
			this.balance = res.balance.confirmed
		})
		.catch(err => {
			console.log('Error: ', err)
		})

  	}
}
</script>

<style>	
.qr-code-row {
  margin-top: 20px;
}
.seed-phrase {
  display: flex;
  justify-content: center;
}
.wallet-text {
	color: #0AC18E;
}
.purelypeer-message {
	color: #D0D0D0;
}
</style>
