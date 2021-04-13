<template>
  <div id="payment">
    <div class="col-12 quest-container q-mt-lg">
      <h4 class="text-center q-mt-md q-mb-xs">Payment</h4>
      <div class="q-px-lg q-pt-none">
          <div class="col qr-code q-pl-sm q-pr-sm q-pt-md q-mt-md">
            <div class="row text-center">
                <div class="col row justify-center q-pt-md">
                  <!-- <img :src="getAssetLogo(assetId)" height="60" style="position: absolute; margin-top: 80px; background: #fff;"> -->
              <qr-code text="ssssssaaaaaammmmmmppppppplllllllleeeeeee" color="#404543" :size="220" error-level="H" class="seed-phrase q-mt-none"></qr-code>
                </div>
            </div>
          </div>
      </div>
      <div class="q-pa-lg">
        <q-card class="my-card text-white" style="background: radial-gradient(circle, #0CDCA2 0%, #0AC18E 100%)">
          <q-card-section>
              <div class="text-h6">My BCH Wallet</div>
              <div class="text-subtitle2"><span class="balance text-white">{{ balance }}</span> BCH</div>
          </q-card-section>
        </q-card>

        <h6 class="text-center q-mt-lg q-mb-none"><strong><router-link class="setting-link" to="/setting">Settings</router-link></strong></h6>
        <div class="text-center purelypeer-message q-mb-xs q-mt-md">
          <span>"Thank you for supporting the PurelyPeer economy!"</span>
        </div>
      </div>
      <div class="row justify-center q-mb-md">
        <div class="col-11">
          <q-form ref="payForm" class="q-gutter-y-sm" method="post">
            <q-btn :label="'Pay \uD83D\uDCB8'" type="submit" class="full-width pay-btn"/>
          </q-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        if (newHeight >= minMapHeight) {
          map.$el.style.height = newHeight + 'px'
        }
      }
      this.$refs.myPurelyPeerMap.mapObject.invalidateSize()
    }
  },
  created () {
    server.bchjs.Electrumx.balance('bitcoincash:qzuna0c5tvpzne7gennzzl73pr6pd0pzqqzvjlmgq5')
      .then(res => {
        console.log('Balance: ', res)
        this.balance = (server.bchjs.BitcoinCash.toBitcoinCash(res.balance.confirmed)).toFixed(8)
      })
      .catch(err => {
        console.log('Error: ', err)
      })
    this.$q.notify({
      message: 'Your quest has been successfully created!',
      color: 'notify-color',
      position: 'center',
      timeout: 2000
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
.pay-btn {
  background: radial-gradient(circle, #0CDCA2 0%, #0AC18E 100%) !important;
  color: white;
}
.setting-link {
  text-decoration: none;
  color: #0AC18E;
}
span.balance {
  font-family: Monospace;
}
.qr-code {
  width: 100%;
  border-radius: 16px;
  padding: 23px 10px 36px 10px;
  box-shadow: 1px 2px 2px 1px rgba(99, 103, 103, .1);
  border: 4px solid #0AC18E;
  background: white;
}
</style>
