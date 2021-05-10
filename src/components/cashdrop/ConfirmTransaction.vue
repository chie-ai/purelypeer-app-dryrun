<template>
  <div style="width: 100% !important">
    <div class="q-px-lg q-pt-lg bg-grey-1 text-center" ref="payment" style="position: absolute; width: 100%; height: 100%;">
      <span class="mdi mdi-check-circle mdi-48px" style="color: #0ac18e"></span>
      <p><strong>Your quest has been created!</strong></p>
      <div class="col-12 text-left q-mt-md">
        <q-card class="my-card q-px-xs q-pt-sm">
          <q-card-section>
            <div class="q-pa-none row">
              <div class="col-6">
                <span class="fnt-10 info-label">Quest Name :</span>
              </div>
              <div class="col-6">
                <span class="text-subtitle2 info">{{ quest.name }}</span>
              </div>
              <div class="col-6">
                <span class="fnt-10 info-label">Cashdrops :</span>
              </div>
              <div class="col-6">
                <span class="text-subtitle2 info">{{ quest.total_cashdrops }}</span>
              </div>
              <div class="col-6">
                <span class="fnt-10 info-label">PurelyPeer Tier : </span>
              </div>
              <div class="col-6">
                <span class="text-subtitle2 info">{{ quest.acceptance_tier === 'Direct' ? '\uD83D\uDC9A Direct' : quest.acceptance_tier === 'Indirect' ? '\uD83E\uDDE1 Indirect' : quest.acceptance_tier === 'Upcoming' ? '\uD83D\uDC99 Upcoming' : '\uD83D\uDDA4 Inactive' }}</span>
              </div>
              <div class="col-6">
                <span class="fnt-10 info-label">Presence : </span>
              </div>
              <div class="col-6">
                <span class="text-subtitle2 info">{{ quest.has_physical_presence ? '\uD83E\uDDF1\u2714\uFE0F Yes' : '\uD83E\uDDF1\u274C No' }} </span>
              </div>
              <div class="col-6">
                <span class="fnt-10 info-label">Radius : </span>
              </div>
              <div class="col-6">
                <span class="text-subtitle2 info">{{ (quest.radius === 1500 ? '\uD83D\uDD7A\u267F\uD83D\uDC83 15 min' : quest.radius === 15000 ? '\uD83C\uDFD9\uFE0F Urban' : quest.radius === 15000 ? '\uD83D\uDEE3\uFE0F Regional' : '\uD83C\uDF10 Continental' ) }}</span>
              </div>
              <div class="col-6">
                <span class="fnt-10 info-label">Phone Number : </span>
              </div>
              <div class="col-6">
                <span class="text-subtitle2 info">{{ quest.phone_no ? quest.phone_no : '--' }}</span>
              </div>
            </div>
            <div class="q-pa-none">
              <span class="fnt-10 info-label">Contact URL: </span>
              <p class="q-mb-xs"><span class="text-subtitle2 info">{{ quest.contact_url ? quest.contact_url : '--' }}</span></p>
              <span class="fnt-10 info-label">Memo: </span>
              <p class="q-mb-none"><span class="text-subtitle2 info">{{ quest.memo ? quest.memo : '--' }}</span></p>
            </div>
          </q-card-section>
          <q-separator class="q-mx-md"/>
          <q-card-section>
            <div class="q-pa-none row">
              <div class="col-6">
                <span class="fnt-10 info-label">Total Value : </span>
              </div>
              <div class="col-6">
                <span class="text-subtitle2 info"><span style="font-family: Monospace;">{{ amount }}</span> sat&#x20BF;</span>
              </div>
              <div class="col-6">
                <span class="fnt-10 info-label">Processing : </span>
              </div>
              <div class="col-6">
                <span class="text-subtitle2 info"><span style="font-family: Monospace;">{{ process }}</span> sat&#x20BF;</span>
              </div>
              <div class="col-6">
                <span class="fnt-10 info-label">1 Cashdrop : </span>
              </div>
              <div class="col-6">
                <span class="text-subtitle2 info"><span style="font-family: Monospace;">{{ amountPerCashdrop }}</span> sat&#x20BF;</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div class="row">
          <div class="col-6 q-pr-sm">
            <q-btn :label="'Pay \uD83D\uDCB5'" @click="createTransaction" type="submit" class="full-width q-mt-md quest-btn"/>
          </div>
          <div class="col-6 q-pl-sm">
            <q-btn label="Cancel" type="submit" @click="cancel" class="full-width q-mt-md"/>
          </div>
        </div>
      </div>
    </div>
    <LogoLoading class="hidden" ref="logoLoader" />
  </div>
</template>

<script>
// import { getPrivateKey, signInputs } from '../../utils/buildTransaction.js'
import LogoLoading from '../LogoLoading.vue'
import server from '../../utils/getAPIServer.js'

export default {
  data () {
    return {
      quest: null,
      providedUtxo: null,
      amount: null,
      process: null,
      amountPerCashdrop: null
    }
  },
  components: {
    LogoLoading
  },
  methods: {
    async createTransaction () {
      this.$refs.payment.classList.add('hidden')
      this.$refs.logoLoader.$el.classList.add('animate-loader')
      this.$refs.logoLoader.$el.classList.remove('hidden')
      this.$refs.logoLoader.$el.classList.remove('animate-hiding')

      this.$emit('routeStatus', true)

      // setTimeout(() => {
      //   this.$refs.logoLoader.$el.classList.remove('animate-loader')
      //   this.$refs.logoLoader.$el.classList.add('animate-hiding')
      //   this.$refs.payment.classList.remove('hidden')
      //   setTimeout(() => {
      //     this.$refs.logoLoader.$el.classList.add('hidden')
      //   }, 300)
      // }, 3000)

      const indx = 0
      const bchAddress = localStorage.getItem('bchAddress')
      const recepient = this.quest.funding_cov_address
      const utxo = this.quest.utxos

      let originalAmount = 0
      for (let i = 0; utxo.length > i; i++) {
        originalAmount += utxo[i].value
      }

      const rootSeed = await server.bchjs.Mnemonic.toSeed(localStorage.getItem('seedPhrase'))

      // create HDNode from root seed
      const hdNode = server.bchjs.HDNode.fromSeed(rootSeed)
      const childNode = hdNode.derivePath("m/44'/145'/0'/" + indx)
      const ecPair = server.bchjs.HDNode.toKeyPair(childNode)
      const keyPair = server.bchjs.ECPair.fromWIF(ecPair.toWIF())
      const redeemScript = null
      const byteCount = server.bchjs.BitcoinCash.getByteCount({ P2PKH: utxo.length }, { P2SH: 2 })
      // Miner fee
      const txFee = Math.floor(byteCount * 1.2)
      // satoshisToSend is the amount to send to the recipient
      const satoshisToSend = server.bchjs.BitcoinCash.toSatoshi(this.quest.amount) - Math.floor(byteCount * 1.2)

      const remainder = originalAmount - satoshisToSend - txFee

      const transactionBuilder = new server.bchjs.TransactionBuilder()

      // Satoshis to be sent to the recipient
      transactionBuilder.addOutput(recepient, satoshisToSend)
      // The changed to be sent back to the sender
      transactionBuilder.addOutput(bchAddress, remainder)

      const mapUtxo = utxo
      mapUtxo.map(function (utxo, index) {
        console.log('Utxo: ', utxo.value)

        transactionBuilder.addInput(
          utxo.txid,
          utxo.vout
        )
        console.log('Vout: ', utxo.vout)
        const sighash = transactionBuilder.hashTypes.SIGHASH_SINGLE | transactionBuilder.hashTypes.SIGHASH_ANYONECANPAY
        console.log('Txid: ', utxo.txid)
        try {
          transactionBuilder.sign(index, keyPair, redeemScript, sighash, utxo.value)
        } catch (err) {
          console.log('Error: ', err.toString())
        }
        console.log('Sign')
      })

      const tx = transactionBuilder.transaction.buildIncomplete()
      console.log('transaction Hex: ', tx.toHex())

      const transaction = {
        quest_id: this.quest.id,
        signed_txn_hex: tx.toHex()
      }
      this.$store.dispatch('cashdrop/broadcastSignedTransaction', transaction)
        .then(res => {
          console.log('Success payment: ', res)
          this.$router.push({ path: '/confirm-transaction/successful-transaction' })
        })
        .catch(_err => {
          console.error('Failed payment: ', _err)
          this.$router.push({ path: '/confirm-transaction/successful-transaction' })
        })
    },
    cancel () {
      this.$emit('routeStatus', true)
      setTimeout(() => {
        this.$router.push({ path: '/cash-drop' })
      }, 500)
    }
  },
  async created () {
    this.$emit('routeStatus', false)
    this.quest = this.$route.query
    this.$route.query.utxos.forEach((utxo, index) => {
      this.providedUtxo += Number(utxo.value)
    })
    this.amount = server.bchjs.BitcoinCash.toSatoshi(this.quest.amount)
    this.process = server.bchjs.BitcoinCash.toSatoshi(this.quest.fee_break_down)
    this.amountPerCashdrop = server.bchjs.BitcoinCash.toSatoshi((Number(this.quest.amount) - Number(this.quest.fee_break_down)) / Number(this.quest.total_cashdrops))
  }
}
</script>

<style>
.fnt-10 {
  font-size: 12px;
}
.animate-loader {
  animation: 1s appear;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
}
.animate-hiding {
  opacity: 0;
  transition: opacity .5s;
}
.info-label {
  color: #0e3247 !important
}
.info {
  color: #0AC18E !important
}
</style>
