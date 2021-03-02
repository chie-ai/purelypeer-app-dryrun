<template>
	<div id="quest-list">
		<div class="col-12 quest-container q-mt-lg">
			<h5 class="text-center q-mt-md q-mb-sm">Quest Form</h5>

			<div class="q-mx-md q-mt-md">
				<div class="row justify-center q-mb-md">
					<div class="col-11">
						<q-form ref="questForm" class="q-gutter-y-sm" action="https://some-url.com" method="post" @submit="onSubmitQuest" >
							<q-input color="grey-5" :dense="true" bg-color="white" outlined label="Merchant Name" v-model="merchantName"
								:rules="[val => !!val || 'Merchant name is required']" />
							<q-input color="grey-5" :dense="true" bg-color="white" outlined label="Phone number" v-model="phoneNumber"
								:rules="[val => !!val || 'Phone number is required']" />
							<q-input color="grey-5" :dense="true" bg-color="white" outlined label="Contact URL" v-model="contactUrl"
								:rules="[val => !!val || 'Contact URL is required']" />
							<q-select outlined color="grey-5" :dense="true" bg-color="white" v-model="tierModel"
								:options="tier.options" label="PurelyPeer Tier"
								:rules="[val => !!val || 'PurelyPeer tier is required']" />
							<q-select outlined color="grey-5" :dense="true" bg-color="white" v-model="presenceModel"
								:options="presence.options" label="Physical Presence"
								:rules="[val => !!val || 'Physical presence is required']" />
							<q-select outlined color="grey-5" :dense="true" bg-color="white" v-model="radiusModel"
								:options="radius.options" label="Quest Radius"
								:rules="[val => !!val || 'Quest radius is required']" />
							<q-select outlined color="grey-5" :dense="true" bg-color="white" v-model="cashDropCountModel"
								:options="cashDropCount" label="Cash Drop Count"
								:rules="[val => !!val || 'Cash drop count is required']" />
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
			merchantName: null,
			phoneNumber: null,
			contactUrl: null,
			tierModel: null,
			tier: {
			    options: [
			        '\uD83D\uDC9A', '\uD83E\uDDE1', '\uD83D\uDC99', '\uD83D\uDDA4'
			    ]
			},
			presenceModel: null,
			presence: {
				options: [
					'\uD83E\uDDF1\u2714\uFE0F', '\uD83E\uDDF1\u274C'
				]
			},
			radiusModel: null,
			radius: {
				options: [
					'\uD83D\uDD7A\u267F\uD83D\uDC83', '\uD83C\uDFD9\uFE0F', '\uD83D\uDEE3\uFE0F', '\uD83C\uDF10'
				]
			},
			cashDropCountModel: null,
			cashDropCount: []
		}
	},
	watch: {
		radiusModel (newRadius, oldRadius) {
			this.changeRadius()
		},
		tierModel (newTier, oldTier) {
			this.changeTier()
		}
	},
	methods: {
		onSubmitQuest (evt) {
			this.$refs.questForm.validate().then(success => {
				if (success) {
					// console.log('@submit - do something here', evt)
					let questCreate = {
						user: '76f62a58-5404-486d-9afc-07bded328704',
						token: '-',
						name: 'Merchant',
						phone_no: '09934222342',
						contact_url: 'www.gmail.com',
						memo: null,
						acceptance_tier: 10,
						coor: [ 11.1584,124.9919 ],
						radius: 1500,
						total_cashdrops: 10,
						amount: 1500,
						address: 'bitcoincash:pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g'
					}
					this.$axios.post('https://staging.purelypeer.cash/api/quests/', questCreate)
					.then(response => {
						console.log('Success :', response)
					})
					.catch(error => console.log('Error: ', error))
				}
				else {
					// oh no, user has filled in
					// at least one invalid value
				}
			})
		},
		changeTier () {
			let tierIcon = 'PurelyPeer-icon-black.png'
			let tier = 'inactive'
			if (this.tier.options.indexOf(this.tierModel) === 0) {
				tierIcon = 'PurelyPeer-location-green.png'
				tier = 'direct'
			}
			else if (this.tier.options.indexOf(this.tierModel) === 1) {
				tierIcon = 'PurelyPeer-location-orange.png'
				tier = 'indirect'
			}
			else if (this.tier.options.indexOf(this.tierModel) === 2) {
				tierIcon = 'PurelyPeer-location-blue.png'
				tier = 'upcoming'
			}
			let tierObject = {
				tierIcon,
				tier
			}
			this.$emit('changeQuestTier', tierObject)

		},
		changeRadius () {
			let radius = 3000
			if(this.radius.options.indexOf(this.radiusModel) === 0) {
				radius = 1000
			}
			else if (this.radius.options.indexOf(this.radiusModel) === 1) {
				radius = 1500
			}
			else if (this.radius.options.indexOf(this.radiusModel) === 2) {
				radius = 2000
			}
			else if (this.radius.options.indexOf(this.radiusModel) === 3) {
				radius = 2500
			}
			this.$emit('changeQuestRadius', radius)
		}
	},
	created () {
		for (let i=10;i<=100;i++) {
			this.cashDropCount.push(i)
		}

		// let questCreate = {
		// 	user: '76f62a58-5404-486d-9afc-07bded328704',
		// 	token: '-',
		// 	name: 'Merchant',
		// 	phone_no: '09934222342',
		// 	contact_url: 'www.gmail.com',
		// 	memo: null,
		// 	acceptance_tier: 10,
		// 	coor: [ 11.1584, 124.9919 ],
		// 	radius: 1500,
		// 	total_cashdrops: 10,
		// 	amount: 1500,
		// 	address: 'bitcoincash:pp8skudq3x5hzw8ew7vzsw8tn4k8wxsqsv0lt0mf3g'
		// }
		// this.$axios.post('https://staging.purelypeer.cash/api/quests/', questCreate)
		// .then(response => {
		// 	console.log('Success :', response)
		// })
		// .catch(error => console.log('Error: ', error))
	}
}
</script>

<style scoped>
</style>