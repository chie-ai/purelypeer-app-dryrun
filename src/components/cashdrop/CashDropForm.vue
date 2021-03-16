<template>
	<div id="quest-list">
		<div class="col-12 quest-container q-mt-lg">
			<h5 class="text-center q-mt-md q-mb-sm">Quest Form</h5>

			<div class="q-mx-md q-mt-md">
				<div class="row justify-center q-mb-md">
					<div class="col-11">
						<q-form ref="questForm" class="q-gutter-y-sm" action="https://some-url.com" method="post" @submit="onSubmitQuest" >
							<q-input ref="merchantName" color="grey-5" :dense="true" bg-color="white" outlined label="Merchant Name" type="text" lazy-rules v-model="merchantName"
								:rules="[val => !!val || 'Merchant name is required']" />
							<q-input ref="phoneNumber" color="grey-5" :dense="true" bg-color="white" outlined label="Phone number" type="number" v-model="phoneNumber"
								mask="(###) #### - ####" fill-mask unmasked-value class="q-mb-lg" />
							<q-input ref="contactUrl" color="grey-5" :dense="true" bg-color="white" outlined label="Contact URL" type="url" v-model="contactUrl" class="q-mb-lg" />
							<q-input ref="memo" color="grey-5" :dense="true" bg-color="white" outlined label="Memo" type="text" v-model="memo" class="q-mb-lg" />
							<q-select ref="tierModel" outlined color="grey-5" :dense="true" bg-color="white" v-model="tierModel"
								:options="tier.options" label="PurelyPeer Tier"
								lazy-rules :rules="[val => !!val || 'PurelyPeer tier is required']" />
							<q-select ref="presenceModel" outlined color="grey-5" :dense="true" bg-color="white" v-model="presenceModel"
								:options="presence.options" label="Physical Presence"
								lazy-rules :rules="[val => !!val || 'Physical presence is required']" />
							<q-select ref="radiusModel" outlined color="grey-5" :dense="true" bg-color="white" v-model="radiusModel"
								:options="radius.options" label="Quest Radius"
								lazy-rules :rules="[val => !!val || 'Quest radius is required']" />
						    <q-badge class="slider-badge">
						      <b>Total of cashdrops</b> : {{ cashDropCountModel }}
						    </q-badge>
							<q-slider class="q-mt-none q-mb-sm amount-range-slider"
						      :value="10"
						      v-model="cashDropCountModel"
						      :min="10"
						      :max="100"
						      :step="1"
						     label/>
						    <q-badge class="slider-badge">
						      <b>Amount</b> : {{ amount.toFixed(8) }}
						    </q-badge>
						    <q-slider class="q-mt-none q-mb-none amount-range-slider"
						      :value="0.00000000"
						      v-model="amount"
						      :min="0.00000000"
						      :max="3.00000000"
						      :step="0.00000001"
						      label
						      :label-value="amount.toFixed(8)"
						    />
						    <span class="text-weight-light" style="font-size: 11px; color: red;">Amount must not be empty</span>
							<q-input color="grey-5" :dense="true" class="q-mb-lg" bg-color="white" outlined
						        v-model="feeBreakdown" label="Fee breakdown"
						        input-class="text-right" readonly />
							<q-btn :label="'Cash Drop \uD83D\uDCA7'" outline type="submit" class="full-width" color="grey-6"/>
						</q-form>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>

<script>

export default {
	data() {
		return {
			refModels: ['merchantName','phoneNumber','contactUrl','memo','tierModel','presenceModel','radiusModel'],
			merchantName: null,
			phoneNumber: null,
			contactUrl: null,
			memo: null,
			tierModel: null,
			tier: {
			    options: [
			        'Direct \uD83D\uDC9A', 'Indirect \uD83E\uDDE1', 'Upcoming \uD83D\uDC99', 'Inactive \uD83D\uDDA4'
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
			cashDropCountModel: 10,
			cashDropFormModels: {
				tier: null,
				radius: null
			},
			feeBreakdown: 0.00002000,
			amountBoolean: false,
			questPresence: null

		}
	},
	props: ['questCoordinates'],
	watch: {
		radiusModel (newRadius, oldRadius) {
			this.changeRadius()
		},
		tierModel (newTier, oldTier) {
			this.changeTier()
		},
		cashDropCountModel (newBreakdown, oldBreakdown) {
			let C = 0.00050000, T = 0.00002000, N = this.cashDropCountModel, OT = N*T
			this.feeBreakdown = OT.toFixed(8)
		},
		presenceModel (newPresence, oldPresence) {
			if (this.presence.options.indexOf(newPresence) === 0) {
				this.questPresence = 'Yes'
			} else {
				this.questPresence = 'No'
			}
		},
	},
	methods: {
		onSubmitQuest (evt) {

			this.$q.loading.show({
		        message: 'Creating of quest is in progress. <br/><span class="text-white">Hang on...</span>'
		    })

		    // if ((this.amount).toFixed(8) == '0.00000000') {
			   //  this.$q.notify({
						//         message: 'Amount is invalid...',
						//         color: 'red-8',
						//         timeout: 1000,
						//         position: 'top'
						//     })
			   //  this.$q.loading.hide()

			   //  return false
		    // }

			this.$refs.questForm.validate().then(success => {

				if (success) {
					let coordinates = []
					for (let i=0; Object.keys(this.questCoordinates).length>i; i++) {
						coordinates.push(Object.values(this.questCoordinates)[i])
					}

					let questCreate = {
						"user": "a8b163ef-1149-448d-99b0-0fbbc45a76b3",
						"token": "-",
						"name": this.merchantName,
						"phone_no": this.phoneNumber,
						"contact_url": this.contactUrl,
						"memo": this.memo,
						"acceptance_tier": this.cashDropFormModels.tier,
						"coors": coordinates,
						"radius": this.cashDropFormModels.radius,
						"total_cashdrops": this.cashDropCountModel,
						"presence": this.questPresence,
						"amount": this.amount.toFixed(8),
						"payment_address": "bitcoincash:pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g",
						"pubkey": "dddddddd"
					}

					console.log('Form: ', questCreate)

					// this.$axios.post('https://staging.purelypeer.cash/api/quests/', questCreate)
					// .then(response => {
					// 	console.log('Success :', response)

					// 	for (let i=0;this.refModels.length>i;i++) {
					// 		this[this.refModels[i]] = null
					// 		this.$refs[this.refModels[i]].resetValidation()
					// 	}

					//     this.timer = setTimeout(() => {
					//         this.$q.loading.hide()
					//         this.timer = void 0
					// 		this.onReset()
					//     }, 0)
					// })
					// .catch(error => {
					// 	console.log('Error: ', error)
					// })
				}
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
			}
			else if (this.tier.options.indexOf(this.tierModel) === 1) {
				tierIcon = 'PurelyPeer-location-orange.png'
				tier = 'indirect'

				this.cashDropFormModels.tier = 'Indirect'
			}
			else if (this.tier.options.indexOf(this.tierModel) === 2) {
				tierIcon = 'PurelyPeer-location-blue.png'
				tier = 'upcoming'

				this.cashDropFormModels.tier = 'Upcoming'
			}
			let tierObject = {
				tierIcon,
				tier
			}
			this.$emit('changeQuestTier', tierObject)

		},
		changeRadius () {
			let radius = 1500000
			this.cashDropFormModels.radius = radius
			if(this.radius.options.indexOf(this.radiusModel) === 0) {
				radius = 1500

				this.cashDropFormModels.radius = radius
			}
			else if (this.radius.options.indexOf(this.radiusModel) === 1) {
				radius = 15000

				this.cashDropFormModels.radius = radius
			}
			else if (this.radius.options.indexOf(this.radiusModel) === 2) {
				radius = 150000

				this.cashDropFormModels.radius = radius
			}
			this.$emit('changeQuestRadius', radius)
		}
	}
}
</script>

<style scoped>
.amount-range-slider {
	color: #0AC18E;
}
.slider-badge {
	background: #0AC18E;
}
</style>