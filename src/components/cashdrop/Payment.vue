<template>
  <div id="payment">
    <div class="col-12 quest-container q-mt-lg">
      	<h5 class="text-center q-mt-md q-mb-xs">Payment</h5>
    	<div class="q-mb-md q-mt-md">
      		<qr-code text="ssssssaaaaaammmmmppppppplllllllleeeee" color="#404543" :size="220" class="seed-phrase q-mt-none"></qr-code>
    	</div>
    	<div>
    		<p class="text-h6 q-mb-none text-center wallet-text">Wallet Balance</p>
    		<p class="text-center">{{ balance }} <strong>BCH</strong></p>

    		<p class="text-center"><strong><router-link class="setting-link" to="/setting">Settings</router-link></strong></p>
    		<div class="text-center purelypeer-message q-mb-sm">
    			<span>"Thank you for supporting the PurelyPeer economy!"</span>
    		</div>
    	</div>
        <div class="row justify-center q-mb-md">
	    	<div class="col-11">
		    	<q-form ref="payForm" class="q-gutter-y-sm" method="post">
		    		<q-btn :label="'Pay \uD83D\uDCB8'" outline type="submit" class="full-width" color="pay-btn"/>
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
	    resizeMapHeight ({ evt, ...info }) {
	      	const map = this.$refs.myPurelyPeerMap.$el
	      	if (this.counter === 0) {
	        	this.mapHeight = parseInt(document.defaultView.getComputedStyle(map).height, 10)
	        	this.startY = Math.round(evt.changedTouches[0].screenY)
	      	}
	      	if (!info.isFinal) {
	        	this.counter++
	      	} else {
	        	this.counter = 0
	      	}
		      	this.doResize(event)
		    },
	    	doResize (e) {
	      		const map = this.$refs.myPurelyPeerMap
	      		const newHeight = this.mapHeight + e.changedTouches[0].screenY - this.startY
	      		const minMapHeight = 334

	      	if (((80 / 100) * window.innerHeight) >= newHeight) {
	        	newHeight >= minMapHeight ? map.$el.style.height = newHeight + 'px' : ''
	      	}
	      	this.$refs.myPurelyPeerMap.mapObject.invalidateSize()
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

<style lang="scss">	
.seed-phrase {
  display: flex;
  justify-content: center;
}
.wallet-text {
	color: #0AC18E;
}
.purelypeer-message span {
	color: $grey-6;
}
.text-pay-btn {
  background-color: #0AC18E !important;
  color: white;
}
.setting-link {
	text-decoration: none;
	color: #0AC18E;
}
</style>
