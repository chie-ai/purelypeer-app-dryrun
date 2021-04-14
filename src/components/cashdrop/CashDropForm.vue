<template>
  <div id="quest-list">
    <div class="col-12 quest-container q-mt-none q-mb-none q-pt-lg q-pt-xs" ref="questList">
      <div class="q-px-md">
        <q-card class="my-card q-mx-none q-mb-md" ref="formCard">
          <q-card-section>
            <div class="text-h6 quest-caption">
              Quest Form
              <q-btn color="white" @click="toggleQuestList" style="position: absolute; right: 16px; top: 14px" rounded :dense="true" text-color="black" :icon="questExpanderIcon" />
            </div>
          </q-card-section>

          <q-separator/>

          <q-card-section class="q-pt-sm">
            <div>
              <div class="row q-mb-md">
                <div class="col-12 q-pt-md">
                  <q-form ref="questForm" class="q-gutter-y-sm q-mx-none" method="post" @submit="onSubmitQuest" >
                    <q-select ref="radiusModel" bg-color="input-bg" filled color="input-color" :dense="true" v-model="radiusModel"
                      :options="radius.options" label="Quest Radius"
                      lazy-rules :rules="[val => !!val || 'Quest radius is required']" />
                    <q-input ref="merchantName" bg-color="input-bg" filled color="input-color" :dense="true" label="Merchant Name" type="text" lazy-rules v-model="merchantName"
                      :rules="[val => !!val || 'Merchant name is required']" />
                    <q-input ref="phoneNumber" bg-color="input-bg" filled color="input-color" :dense="true" label="Phone number" v-model="phoneNumber"
                      mask="(+##) ###-###-####" fill-mask unmasked-value class="q-mb-lg" />
                    <q-input ref="contactUrl" bg-color="input-bg" filled color="input-color" :dense="true" label="Contact URL" type="url" v-model="contactUrl" class="q-mb-lg" />
                    <q-input ref="memo" bg-color="input-bg" filled color="input-color" :dense="true" label="Memo" type="text" v-model="memo" class="q-mb-lg" />
                    <q-select ref="tierModel" bg-color="input-bg" filled color="input-color" :dense="true" v-model="tierModel"
                      :options="tier.options" label="PurelyPeer Tier"
                      lazy-rules :rules="[val => !!val || 'PurelyPeer tier is required']" />
                    <q-select ref="presenceModel" bg-color="input-bg" filled color="input-color" :dense="true" v-model="presenceModel"
                      :options="presence.options" label="Physical Presence"
                      lazy-rules :rules="[val => !!val || 'Physical presence is required']" />
                      <q-badge class="slider-badge text-caption">
                        <b>Number of cashdrops : {{ cashDropCountModel }}</b>
                      </q-badge>
                    <q-slider class="q-mt-none q-mb-sm amount-range-slider"
                        :value="2"
                        v-model="cashDropCountModel"
                        :min="2"
                        :max="100"
                        :step="1"
                      label/>
                    <q-input ref="amount" bg-color="input-bg" filled color="input-color" :dense="true" outlined label="Amount for the cashdrops" type="text"
                    v-model="amount2" lazy-rules :rules="[val => val > 0.00000000 || 'Amount field is required to be set']"
                    input-class="text-right" />
                      <q-badge class="slider-badge text-caption">
                        <b>Set amount</b>
                      </q-badge>
                      <q-slider class="q-mt-none q-mb-none amount-range-slider"
                        :value="0.00000000"
                        v-model="amount"
                        :min="0.00000000"
                        :max="1.00000000"
                        :step="0.00000001"
                        label
                        :label-value="amount"
                      />
                    <q-input bg-color="input-bg" filled color="input-color" :dense="true" outlined
                          v-model="feeBreakdown" label="Fee Breakdown"
                          input-class="text-right" readonly />
                    <q-btn :label="'Cash Drop \uD83D\uDCA7'" type="submit" class="full-width quest-btn"/>
                  </q-form>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <BCHAddress class="hidden" ref="bchAddress" v-on:cancelQuest="cancelQuest"/>
    <!-- <Confirmation :confirmation-dialog="confirmationDialog"/> -->
  </div>
</template>

<script>
import { QSpinnerFacebook, QSpinner } from 'quasar'
import BCHAddress from '../../components/cashdrop/flash-components/BchAddress.vue'
import Confirmation from '../../components/cashdrop/flash-components/Confirmation.vue'
import Confirmation2 from '../../components/cashdrop/flash-components/Confirmation2.vue'
import server from '../../utils/getAPIServer.js'
import { getPrivateKey, signInputs } from '../../utils/buildTransaction.js'

export default {
  data () {
    return {
      refModels: ['merchantName', 'phoneNumber', 'contactUrl', 'memo', 'tierModel', 'presenceModel', 'radiusModel', 'amount'],
      merchantName: null,
      phoneNumber: null,
      contactUrl: null,
      memo: null,
      tierModel: null,
      tier: {
        options: [
          'Direct \uD83D\uDC9A', 'Indirect \uD83E\uDDE1', 'Upcoming \uD83D\uDC99'
        ]
      },
      presenceModel: null,
      presence: {
        options: [
          'Yes \uD83E\uDDF1\u2714\uFE0F', 'No \uD83E\uDDF1\u274C'
        ]
      },
      radiusModel: null,
      radius: {
        options: [
          '15 min \uD83D\uDD7A\u267F\uD83D\uDC83', 'Urban \uD83C\uDFD9\uFE0F', 'Regional \uD83D\uDEE3\uFE0F', 'Continental \uD83C\uDF10'
        ]
      },
      amount: 0.00000000,
      amount2: 0.00000000,
      cashDropCountModel: 2,
      cashDropFormModels: {
        tier: null,
        radius: null
      },
      feeBreakdown: 0.00002000,
      amountBoolean: false,
      questPresence: null,
      balanceWatcher: null,
      questExpanderIcon: 'mdi-arrow-expand-all'
    }
  },
  components: {
    BCHAddress
  },
  props: ['questCoordinates'],
  watch: {
    radiusModel (newRadius, oldRadius) {
      if (newRadius) {
        this.changeRadius()
      }
    },
    tierModel (newTier, oldTier) {
      this.changeTier()
    },
    cashDropCountModel (newBreakdown, oldBreakdown) {
      const T = 0.00002000, N = this.cashDropCountModel, OT = N * T
      this.feeBreakdown = OT
      this.feeBreakdown = this.feeBreakdown.toFixed(8)
    },
    presenceModel (newPresence, oldPresence) {
      if (this.presence.options.indexOf(newPresence) === 0) {
        this.questPresence = true
      }
    },
    amount (newAmount, oldAmount) {
      this.amount2 = this.amount.toFixed(8)
      return newAmount.toFixed(8)
    }
  },
  methods: {
    toggleCashDropForm () {
      this.$refs.questList.classList.remove('hidden')
      this.$refs.bchAddress.$el.classList.add('hidden')
      document.getElementById('nav-menu').classList.remove('hidden')
      document.getElementsByClassName('exploreMap')[0].classList.remove('hidden')
      document.getElementById('nav-menu').classList.add('animate-in-load')
      document.getElementsByClassName('cashdrop-form')[0].classList.add('animate-in-load')
      document.getElementsByClassName('btn-cancel')[0].classList.add('hidden')
    },
    cancelQuest () {
      this.toggleCashDropForm()
      this.$emit('routeStatus', true)
      for (let i = 0; this.refModels.length > i; i++) {
        this[this.refModels[i]] = this.refModels[i] === 'amount' ? 0.00000000 : null
        this.$refs[this.refModels[i]].resetValidation()
      }
      this.$q.notify({ message: 'The quest has been canceled!', color: 'alert-color', position: 'bottom', timeout: 3000 })
      clearInterval(this.balanceWatcher)
    },
    async signUtxos (bchAddress, privkey, contract, amount) {
      console.log('sign')
      signInputs(bchAddress, privkey, contract, amount)
    },
    onSubmitQuest (evt) {
      const bchAddress = localStorage.getItem('bchAddress')
      this.$refs.questForm.validate().then(success => {
        if (success) {
          const balanceLoader = this.$q.dialog({
            message: 'Checking your wallet balance...',
            progress: {
              spinner: QSpinner,
              color: 'balance-spinner-color'
            },
            persistent: true, // we want the user to not be able to close it
            ok: false // we want the user to not be able to close it
          })

          const coordinates = []
          for (let i = 0; Object.keys(this.questCoordinates).length > i; i++) {
            coordinates.push((Object.values(this.questCoordinates)[i]).toFixed(8))
          }

          const questCreate = {
            user: localStorage.getItem('user_id'),
            token: '-',
            name: this.merchantName,
            phone_no: this.phoneNumber !== null ? ('+' + this.phoneNumber) : null,
            contact_url: this.contactUrl,
            memo: this.memo,
            acceptance_tier: this.cashDropFormModels.tier,
            coors: coordinates,
            radius: this.cashDropFormModels.radius,
            total_cashdrops: this.cashDropCountModel,
            has_physical_presence: this.questPresence,
            amount: this.amount.toFixed(8),
            payment_address: 'bitcoincash:qzuna0c5tvpzne7gennzzl73pr6pd0pzqqzvjlmgq5', /* bchAddress */
            pubkey: '02c767c747b2923587841d56db9036ad9f480930f0307e325debb60abffc444d74' /* localStorage.getItem('pubkey') */
          }

          console.log('Form model values: ', questCreate)

          const overAllAmount = (Number(this.amount.toFixed(8)) + Number(this.feeBreakdown))
          const questInfoForMap = [coordinates, this.cashDropFormModels.radius, this.cashDropFormModels.tier]

          this.$emit('routeStatus', false)

          // Check the BCH Address if has a balance before proceeding to creation of quest
          server.bchjs.Electrumx.balance('bitcoincash:qzuna0c5tvpzne7gennzzl73pr6pd0pzqqzvjlmgq5').then(res => { /* bchAddress */
            const sumSatoshis = res.balance.confirmed + res.balance.unconfirmed
            const balance = (server.bchjs.BitcoinCash.toBitcoinCash(sumSatoshis)).toFixed(8)
            console.log('Balance: ', balance)

            balanceLoader.hide()

            if (balance > overAllAmount) {
              this.$q.dialog({
                component: Confirmation,
                parent: this
              }).onOk(() => {
                this.$refs.questList.classList.add('hidden')
                document.getElementById('nav-menu').classList.add('hidden')
                document.getElementsByClassName('exploreMap')[0].classList.add('hidden')

                this.$q.loading.show({
                  spinner: QSpinnerFacebook,
                  spinnerColor: 'spinner-color',
                  spinnerSize: 140,
                  backgroundColor: 'white',
                  message: '<b>Creating of quest is in progress. <br/><span style="color: #0AC18E;">Hang on...</span>',
                  messageColor: 'black'
                })
                const vm = this
                this.signUtxos('bitcoincash:qzuna0c5tvpzne7gennzzl73pr6pd0pzqqzvjlmgq5').then(function (signedUtxos) {
                  console.log('signedUtxos: ', signedUtxos)
                  vm.createQuest(questInfoForMap, questCreate)
                })
              }).onCancel(() => {
                this.$emit('routeStatus', true)
              })
            } else {
              this.$q.loading.hide()
              this.$refs.questList.classList.add('hidden')
              document.getElementById('nav-menu').classList.add('hidden')
              document.getElementsByClassName('exploreMap')[0].classList.add('hidden')
              this.$refs.bchAddress.$el.classList.remove('hidden')

              setTimeout(() => {
                document.getElementsByClassName('btn-cancel')[0].classList.remove('hidden')
              }, 5000)
              const pollingBalance = () => {
                server.bchjs.Electrumx.balance('bitcoincash:pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g').then(res => {
                  const sumSatoshis = res.balance.confirmed + res.balance.unconfirmed
                  const balance = (server.bchjs.BitcoinCash.toBitcoinCash(sumSatoshis)).toFixed(8)
                  console.log('Balance: ', balance)
                  if (balance > overAllAmount) {
                    clearInterval(this.balanceWatcher)
                  }
                  if (balance > overAllAmount) {
                    this.$q.dialog({
                      component: Confirmation2,
                      parent: this
                    }).onOk(() => {
                      this.$refs.bchAddress.$el.classList.add('hidden')

                      this.$q.loading.show({
                        spinner: QSpinnerFacebook,
                        spinnerColor: 'spinner-color',
                        spinnerSize: 140,
                        backgroundColor: 'white',
                        message: '<b>Creating of quest is in progress. <br/><span style="color: #0AC18E;">Hang on...</span>',
                        messageColor: 'black'
                      })

                      const vm = this
                      this.signUtxos(bchAddress).then(function (signedUtxos) {
                        console.log('call sign')
                        vm.createQuest(questInfoForMap, questCreate)
                      })
                    }).onCancel(() => {
                      this.cancelQuest()
                    })
                  }
                }).catch(err => {
                  console.error(err)
                })
              }
              this.balanceWatcher = setInterval(pollingBalance, 10000)
            }
          }).catch(err => {
            console.log('Error: ', err)
          })
        }
      })
    },
    createQuest (questInfoForMap, questCreate) {
      console.log('form: ', questCreate)
      console.log('map: ', questInfoForMap)
      this.$store.dispatch('cashdrop/createQuest', questCreate).then(response => {
        console.log('Response: ', response)
        for (let i = 0; this.refModels.length > i; i++) {
          this[this.refModels[i]] = this.refModels[i] === 'amount' ? 0.00000000 : null
          this.$refs[this.refModels[i]].resetValidation()
        }

        this.$store.commit('cashdrop/mutateForMapInfo', questInfoForMap)

        this.timer = setTimeout(() => {
          this.$q.loading.hide()
          this.timer = undefined
          this.$q.notify({
            message: 'Your quest has been successfully created!',
            color: 'notify-color',
            position: 'center',
            timeout: 2000
          })
          this.$refs.questList.classList.remove('hidden')
          document.getElementById('nav-menu').classList.remove('hidden')
          document.getElementsByClassName('exploreMap')[0].classList.remove('hidden')
        }, 1000)
        this.$emit('routeStatus', true)
      }).catch(error => {
        console.log('Error: ', error)
        for (let i = 0; this.refModels.length > i; i++) {
          this[this.refModels[i]] = this.refModels[i] === 'amount' ? 0.00000000 : null
          this.$refs[this.refModels[i]].resetValidation()
        }

        this.$store.commit('cashdrop/mutateForMapInfo', questInfoForMap)

        this.timer = setTimeout(() => {
          this.$q.loading.hide()
          this.timer = undefined
          this.$q.notify({
            message: 'Your quest has been successfully created!',
            color: 'notify-color',
            position: 'center',
            timeout: 2000
          })
          this.$refs.questList.classList.remove('hidden')
          document.getElementById('nav-menu').classList.remove('hidden')
          document.getElementsByClassName('exploreMap')[0].classList.remove('hidden')
        }, 1000)
        this.$emit('routeStatus', true)
      })
    },
    changeTier () {
      let tierIcon = 'PurelyPeer-icon-black.png'
      let tier = 'inactive'
      this.cashDropFormModels.tier = 'Inactive'
      if (this.tier.options.indexOf(this.tierModel) === 0) {
        tierIcon = 'PurelyPeer-location-green.png'
        tier = 'direct'

        this.cashDropFormModels.tier = 'Direct'
      } else if (this.tier.options.indexOf(this.tierModel) === 1) {
        tierIcon = 'PurelyPeer-location-orange.png'
        tier = 'indirect'

        this.cashDropFormModels.tier = 'Indirect'
      } else if (this.tier.options.indexOf(this.tierModel) === 2) {
        tierIcon = 'PurelyPeer-location-blue.png'
        tier = 'upcoming'

        this.cashDropFormModels.tier = 'Upcoming'
      }
      const tierObject = {
        tierIcon,
        tier
      }
      this.$emit('changeQuestTier', tierObject)
    },
    changeRadius () {
      let radius = 1500000
      this.cashDropFormModels.radius = radius
      if (this.radius.options.indexOf(this.radiusModel) === 0) {
        radius = 1500

        this.cashDropFormModels.radius = radius
      } else if (this.radius.options.indexOf(this.radiusModel) === 1) {
        radius = 15000

        this.cashDropFormModels.radius = radius
      } else if (this.radius.options.indexOf(this.radiusModel) === 2) {
        radius = 150000

        this.cashDropFormModels.radius = radius
      }
      this.$emit('changeQuestRadius', radius)
    },
    toggleQuestList (e) {
      this.$refs.formCard.$el.classList.toggle('card-expander')
      this.questExpanderIcon = this.$refs.formCard.$el.classList.contains('card-expander') ? 'mdi-arrow-collapse-all' : 'mdi-arrow-expand-all'
    }
  },
  async created () {
    const bchAddress = 'bitcoincash:qzuna0c5tvpzne7gennzzl73pr6pd0pzqqzvjlmgq5' /* localStorage.getItem('bchAddress') */
    const privkey = await getPrivateKey(bchAddress, 0)
    console.log('Sign utxos: ', this.signUtxos(
      bchAddress,
      privkey,
      'bitcoincash:qp3et5cla7jju6z2lfc5v9nr0r4q54edqqpylqnfvx',
      1000
    ))

    console.log('user id: ', localStorage.getItem('user_id'))
  }
}
</script>

<style>
.text-spinner-color {
  color: #0AC18E !important;
}
.bg-alert-color {
  background-color: #0AC18E !important;
}
.bg-notify-color {
  background-color: #0AC18E;
}
.text-balance-spinner-color {
  color: #0AC18E;
}
.amount-range-slider {
  color: #0AC18E;
}
.slider-badge {
  background: #0AC18E;
}
.amount-error {
  font-size: 11px;
  color: #B00303;
}
.quest-btn {
  background: radial-gradient(circle, #0CDAA1 0%, #0AC18E 100%) !important;
  color: white;
}
.bg-input-bg {
  background: #B5ECDD !important;
}
.text-input-color {
  color: #089C73;
}
.card-expander {
  position: absolute;
  width: 100%;
  top: 0pt;
  left: 0pt;
  z-index: 3000;
  border-radius: 0;
}
</style>
