<template>
  <div class="q-mt-md q-px-lg text-center" style="width: 100%">
    <span class="mdi mdi-check-circle mdi-48px" style="color: #0AC18E"></span>
    <p><strong>Your quest has been created!</strong></p>
    <div class="col-12 text-left q-mt-md">
      <q-card class="my-card q-px-sm q-pt-sm">
        <q-card-section>
          <div class="q-pa-none">
            <span class="fnt-10">Quest Name: </span>
            <p class="q-mb-xs"><span class="text-subtitle2 quest-label text-weight-bold">{{ quest.name }}</span></p>
            <span class="fnt-10">Number of cashdrops: </span>
            <p class="q-mb-xs"><span class="text-subtitle2 quest-label text-weight-bold">{{ quest.total_cashdrops }}</span></p>
            <span class="fnt-10">PurelyPeer Tier | Presence | Radius: </span>
            <p class="q-mb-none"><span class="text-subtitle2 quest-label text-weight-bold">
              {{ quest.acceptance_tier === 'Direct' ? 'Direct \uD83D\uDC9A' : quest.acceptance_tier === 'Indirect' ? 'Indirect \uD83E\uDDE1' : quest.acceptance_tier === 'Upcoming' ? 'Upcoming \uD83D\uDC99' : 'Inactive \uD83D\uDDA4' }}
              | {{ quest.has_physical_presence ? 'Yes \uD83E\uDDF1\u2714\uFE0F' : 'No \uD83E\uDDF1\u274C' }}
              | {{ (quest.radius === 1500 ? '15 min \uD83D\uDD7A\u267F\uD83D\uDC83' : quest.radius === 15000 ? 'Urban \uD83C\uDFD9\uFE0F' : quest.radius === 15000 ? 'Regional \uD83D\uDEE3\uFE0F' : 'Continental \uD83C\uDF10' ) }}</span></p>
            <span class="fnt-10">Phone Number: </span>
            <p class="q-mb-xs"><span class="text-subtitle2 quest-label text-weight-bold">{{ quest.phone_no ? quest.phone_no : '--' }}</span></p>
            <span class="fnt-10">Contact URL: </span>
            <p class="q-mb-xs"><span class="text-subtitle2 quest-label text-weight-bold">{{ quest.contact_url ? quest.contact_url : '--' }}</span></p>
            <span class="fnt-10">Memo: </span>
            <p class="q-mb-xs"><span class="text-subtitle2 quest-label text-weight-bold">{{ quest.memo ? quest.memo : '--' }}</span></p>
            <span class="fnt-10">Total value: </span>
            <p class="q-mb-xs"><span class="text-subtitle2 quest-label text-weight-bold">{{ quest.amount }}</span></p>
          </div>
        </q-card-section>
        <q-separator class="q-mx-md"/>
        <q-card-section>
          <div class="q-pa-none">
            <span class="fnt-10" style="display: inline-block">Fee Breakdown: </span>
            <p class="q-mb-xs q-mr-md text-right" style="position: absolute; display: inline-block; right: 0pt;">
              <span class="text-subtitle2 quest-label text-weight-bold">{{ quest.fee_break_down.toFixed(8) }}</span>
            </p>
          </div>
        </q-card-section>
      </q-card>
      <div class="row">
        <div class="col-6 q-pr-sm">
          <q-btn :label="'Pay \uD83D\uDCB5'" @click="createTransaction" type="submit" class="full-width q-mt-md quest-btn"/>
        </div>
        <div class="col-6 q-pl-sm">
          <q-btn label="Cancel" type="submit" class="full-width q-mt-md"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPrivateKey, signInputs } from '../../utils/buildTransaction.js'
import server from '../../utils/getAPIServer.js'

export default {
  data () {
    return {
      quest: null,
      providedUtxo: null,
      privkey: null
    }
  },
  methods: {
    async signUtxos (bchAddress, privkey, contract, amount) { // signs the transaction of each cashdrop of the created quest
      console.log('sign')
      signInputs(bchAddress, privkey, contract, amount)
        .then(res => {
          console.log('Hexo: ', res)
          const transaction = {
            quest_id: this.quest.id,
            signed_txn_hex: res
          }
          this.$store.dispatch('cashdrop/signedTransaction', transaction)
        })
    },
    async createTransaction () {
      const indx = 0
      const bchAddress = localStorage.getItem('bchAddress')
      const recepient = 'bitcoincash:qzuna0c5tvpzne7gennzzl73pr6pd0pzqqzvjlmgq5'
      const utxo = await server.bchjs.Utxo.get(bchAddress)
      // const totalBal = utxo[0].bchUtxos[0].value

      const rootSeed = await server.bchjs.Mnemonic.toSeed(localStorage.getItem('seedPhrase'))

      // create HDNode from root seed
      const hdNode = server.bchjs.HDNode.fromSeed(rootSeed)
      const childNode = hdNode.derivePath("m/44'/145'/0'/" + indx)
      const ecPair = server.bchjs.HDNode.toKeyPair(childNode)
      const keyPair = server.bchjs.ECPair.fromWIF(ecPair.toWIF())
      const redeemScript = null
      const byteCount = server.bchjs.BitcoinCash.getByteCount({ P2PKH: 1 }, { P2PKH: 1 })
      const amount = server.bchjs.BitcoinCash.toSatoshi(this.quest.amount) - byteCount

      console.log('Amount: ', amount)

      const transactionBuilder = new server.bchjs.TransactionBuilder()

      transactionBuilder.addOutput(recepient, amount)

      const mapUtxo = utxo[0].bchUtxos
      mapUtxo.map(function (utxo, index) {
        console.log('utxos: ', utxo)

        transactionBuilder.addInput(
          utxo.tx_hash,
          utxo.tx_pos
        )
        const sighash = transactionBuilder.hashTypes.SIGHASH_SINGLE | transactionBuilder.hashTypes.SIGHASH_ANYONECANPAY
        transactionBuilder.sign(index, keyPair, redeemScript, sighash, utxo.value)
      })

      const tx = transactionBuilder.transaction.buildIncomplete()
      console.log('transaction Hex: ', tx.toHex())

      const transaction = {
        quest_id: this.quest.id,
        signed_txn_hex: tx.toHex()
      }
      this.$store.dispatch('cashdrop/broadcastSignedTransaction', transaction)
    }
  },
  async created () {
    this.quest = this.$route.query
    this.$route.query.utxos.forEach((utxo, index) => {
      this.providedUtxo += Number(utxo.value)
    })
    this.privkey = await getPrivateKey(localStorage.getItem('seedPhrase'), 0)
  }
}
</script>

<style>
.fnt-10 {
  font-size: 12px;
}
</style>
