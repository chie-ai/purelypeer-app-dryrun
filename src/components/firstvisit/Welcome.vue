<template>
    <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        swipeable
        animated
        control-color="control-color-1"
        navigation
        padding
        class="primary text-white shadow-1 carousel-style q-pa-none"
        ref="guide_carousel"
    >

	    <template v-slot:navigation-icon="{ active, btnProps, onClick }">
	        <q-btn v-if="active" size="sm" :icon="btnProps.icon" color="control-color" flat round dense @click="onClick" />
	        <q-btn v-else size="sm" :icon="btnProps.icon" class="control-color-1" flat round dense @click="onClick" />
	    </template>

        <q-carousel-slide name="guides" class="flex-center q-mb-md q-pt-none">
          <div class="q-px-lg q-pb-md q-pt-lg">
	          <img src="PurelyPeer-stamp.png" width="100%" class="rounded-borders">
          </div>
          <h4 class="q-my-md q-mb-lg text-center">Guide</h4>
          <div class="q-mt-md text-center guide-phrase">
            <p class="instructions">{{ lorem }}</p>
            <div class="see-more" @click="readMore">
            	<span class="mdi mdi-chevron-down mdi-36px" style="color: #0AC18E;"></span>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="explore" class="flex-center q-mb-md q-pt-none">
          <div class="q-px-lg q-pb-md q-pt-lg">
	          <img src="PurelyPeer-stamp.png" width="100%" class="rounded-borders">
          </div>
          <h4 class="q-my-md q-mb-lg text-center">Explore</h4>
          <div class="q-mt-md text-center guide-phrase">
            <p class="instructions">{{ lorem }}</p>
            <div class="see-more">
            	<span class="mdi mdi-chevron-down mdi-36px" style="color: #0AC18E;"></span>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="cashdrop" class="flex-center q-mb-md q-pt-none">
          <div class="q-px-lg q-pb-md q-pt-lg">
	          <img src="PurelyPeer-stamp.png" width="100%" class="rounded-borders">
          </div>
          <h4 class="q-my-md q-mb-lg text-center">Cashdrop</h4>
          <div class="q-mt-md text-center guide-phrase">
            <p class="instructions">{{ lorem }}</p>
            <div class="see-more">
            	<span class="mdi mdi-chevron-down mdi-36px" style="color: #0AC18E;"></span>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="collect" class="flex-center q-mb-md q-pt-none">
          <div class="q-px-lg q-pb-md q-pt-lg">
	          <img src="PurelyPeer-stamp.png" width="100%" class="rounded-borders">
          </div>
          <h4 class="q-my-md q-mb-lg text-center">Collect</h4>
          <div class="q-mt-md text-center guide-phrase">
            <p class="instructions">{{ lorem }}</p>
            <div class="see-more">
            	<span class="mdi mdi-chevron-down mdi-36px" style="color: #0AC18E;"></span>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="settings" class="flex-center q-mb-md q-pt-none">
          <div class="q-px-lg q-pb-md q-pt-lg">
	          <img src="PurelyPeer-stamp.png" width="100%" class="rounded-borders">
          </div>
          <h4 class="q-my-md q-mb-lg text-center">Settings</h4>
          <div class="q-mt-md text-center guide-phrase">
            <p class="instructions">{{ lorem }}</p>
            <div class="see-more">
            	<span class="mdi mdi-chevron-down mdi-36px" style="color: #0AC18E;"></span>
            </div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="start" class="flex-center q-mb-md q-pt-none">
          <div class="q-px-lg q-pb-md q-pt-lg">
	          <img src="PurelyPeer-stamp.png" width="100%" class="rounded-borders">
          </div>
          <h4 class="q-my-md text-center">Start Now</h4>
          <div class="q-mt-md text-center">
            
	      <q-btn
		    rounded
		    class="btn-proceed text-white q-mt-lg"
		    size="md"
		    label="Proceed"
		    @click="createWallet"
	      />
          </div>
        </q-carousel-slide>
    </q-carousel>

</template>

<script>
import createWallet from '../../utils/create_wallet.js'
import { QSpinnerFacebook } from 'quasar'

export default {
  	data () {
	    return {
	      	slide: 'guides',
	      	lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.',
	      	timer: null,
	      	heightWatcher: null
	    }
  	},
  	methods: {
	    createWallet () {
	    	this.$refs.guide_carousel.$el.style.display = "none"
	    	clearInterval(this.heightWatcher)

		    this.$q.loading.show({
		        spinner: QSpinnerFacebook,
		        spinnerColor: 'spinner-color',
		        spinnerSize: 140,
		        backgroundColor: 'white',
		        message: 'Creating of wallet is in progress. <br/><strong style="color: #0AC18E;">Hang on...</strong>',
		        messageColor: 'black'
		    })

			createWallet()
			.then(response => {
				console.log('Response: ', response)
				localStorage.setItem("seedPhrase", response.mnemonic);

				let wallet = {
					seed_hash: response.seedHash,
					xpubkey: response.xPubKey
				}

				this.$store.dispatch('wallet/createUser', wallet)

			    this.timer = setTimeout(() => {
			        this.$q.loading.hide()
			        this.timer = void 0
			        this.$router.push({path:'wallet-address'})
			    }, 3000)
			})
			.catch(error => {
				console.log('Error: ', error)
			    this.timer = setTimeout(() => {
			        this.$q.loading.hide()
			        this.timer = void 0
			        this.$router.push({path:'wallet-address'})
			    }, 3000)
			})

			// localStorage.removeItem("seedPhrase")

	    },
	    readMore () {

	    }
  	},
	created () {
	  	this.heightWatcher = setInterval(() => {
			if (document.getElementsByClassName('guide-phrase')[0].style !== undefined) {
		  		document.getElementsByClassName('guide-phrase')[0].style.height = ((26/100) * window.innerHeight) + 'px'
			}
	  	}, 100)
	}
}
</script>

<style>
.carousel-style {
	position: fixed;
	height: 100%;
	box-shadow: none;
	overflow: auto;
}
.btn-proceed {
	background-color: #0AC18E;
	padding-left: 18px;
	padding-right: 18px;
	padding-top: 6px;
	padding-bottom: 2px;
}
.instructions {
	color: #939796;
}
.guide-phrase {
	position: relative;
	overflow: hidden;
}
.text-control-color {
	color: #0AC18E;
}
.text-control-color-1 {
	color: rgba(10, 193, 142, .5);
}
.text-spinner-color {
	color: #0AC18E;
}
.see-more {
	position: absolute;
	height: 40px;
	width: 100%;
	bottom: 0pt;
	background-color: rgba(255,255,255,.5)
}
</style>