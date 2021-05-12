<template>
<div class="animate-in-load">
  <q-btn class="btn-cancel text-white q-mt-md hidden" size="sm" round icon="close" @click="cancelQuest" />
    <div class="q-px-lg pop-bch-address">
      <q-card class="my-card" style="background: radial-gradient(circle, #0CDCA2 0%, #0AC18E 100%)">
        <q-card-section>
          <div class="text-h6 text-white"><strong>Alert!</strong></div>
          <div class="text-subtitle2">
            <span class="balance text-white">
              You don't have enough balance in your wallet. Load wallet to proceed creating of quest.
            </span>
          </div>
        </q-card-section>
      </q-card>
      </div>
      <div class="q-px-lg q-pt-none">
        <div class="col qr-code q-pl-xs q-pr-xs q-mt-md shadow-3">
          <div class="row text-center q-mt-xs q-mx-xs q-px-md q-pt-md q-pb-none">
            <div class="col row justify-center q-my-lg q-mx-lg">
              <qr-code :text="bchAddress" color="#404543" :size="220" error-level="H" class="seed-phrase q-mt-none"></qr-code>
            </div>
          </div>
          <div class="text-center q-mb-lg q-px-md" style="word-wrap: break-word;">
            <p class="q-my-none" style="font-size: 14px; color: #0e3247"><b>{{ bchAddress }}</b></p>
          </div>
        </div>
      </div>
      <div class="q-px-lg q-my-md">
        <q-btn
          class="btn-copy-address text-white q-mt-none"
          size="md"
          label="copy address"
          icon="content_copy"
          @click="copyBCHAddress()"
        />
      </div>
  </div>
</template>

<script>
import { Plugins } from '@capacitor/core'
const { Clipboard } = Plugins

export default {
  data () {
    return {
      bchAddress: null
    }
  },
  methods: {
    cancelQuest () {
      this.$emit('cancelQuest')
    },
    async copyBCHAddress () {
      console.log('Clipboard', Clipboard)

      Clipboard.write({ string: this.bchAddress })

      await Clipboard.read()

      this.$q.notify({
        message: 'Copied...',
        timeout: 2000
      })
    }
  },
  created () {
    this.bchAddress = localStorage.getItem('bchAddress')
  }
}
</script>

<style>
.qr-code {
    width: 100%;
    border-radius: 16px;
    /* box-shadow: 1px 2px 6px 1px rgba(99, 103, 103, .2); */
    /* border: 4px solid rgba(10, 193, 142, .3); */
    border: 4px solid #0AC18E;
    background: white;
}
.btn-copy-address {
  background: radial-gradient(circle, #0CDAA1 0%, #0AC18E 100%);
  padding-top: 4px;
  padding-bottom: 4px;
  width: 100% !important;
}
.btn-cancel {
  position: absolute;
  top: 0px;
  right: 23px;
  background-color: #B2B2B2;
}
.pop-bch-address {
  margin-top: 65px;
}
</style>
