<template>
	<div id="quest-list">
		<div class="col-12 quest-container q-mt-lg">
			<h5 class="text-center q-mt-md q-mb-sm">Quests</h5>

			<div class="quest-main q-mx-md">
				<div class="column quest-body">
					<div class="col-12 q-py-md quest-list" v-for="(quest, questIndex) in quests" :key="questIndex" @click="showQuestCoordinatesOnMap(quest.coors)">
						<div class="row">
							<div class="col-12 q-px-sm">
								<p class="q-mb-xs"><span class="text-weight-bold">Name: </span><span class="text-subtitle2">{{ quest.name }}</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Cash Drop Count: </span><span class="text-subtitle2">{{ quest.total_cashdrops }}</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">PurelyPeer Tier: </span><span>{{ quest.acceptance_tier }}</span></p>

								<div class="questMoreInfo" :ref="questIndex">
									<p class="q-mb-xs"><span class="text-weight-bold">Level: </span><span>{{ (quest.level).charAt(0).toUpperCase() + (quest.level).slice(1) }}</span></p>
									<p class="q-mb-xs"><span class="text-weight-bold">Radius: </span><span>{{ quest.radius }}</span></p>
									<p class="q-mb-xs"><span class="text-weight-bold">Phone Number: </span><span class="text-subtitle2">{{ quest.phone_no }}</span></p>
									<p class="q-mb-xs"><span class="text-weight-bold">Contact URL: </span><a href="www.facebook.com" class="text-caption">{{ quest.contactUrl }}</a></p>
									<p class="q-mb-xs"><span class="text-weight-bold">Presence: </span><span>{{ quest.presence }}</span></p>
									<p class="q-mb-xs"><span class="text-weight-bold">Radius: </span><span>{{ quest.radius }}</span></p>
								</div>
							</div>
							<div class="col-12 q-px-sm q-mt-sm">
								<q-btn size="sm" color="teal" :ref="'btn-'+questIndex" :label="quest.btnLabel" @click="showMorequestInfo(questIndex)"/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="ratio-option" class="q-mt-lg">
			    <ul>
			        <li><a href="#?" class="fs-2" @click="changeTier"><span v-html="purelyPeertier.options[purelyPeertier.number]"></span></a></li>
			        <li><a href="#?" class="fs-2" @click="changePhysicalPresence">&#129521;<span v-html="phyicalPresence.options[phyicalPresence.number]"></span></a></li>
			        <li><a href="#?" class="fs-2" @click="changeQuestRadius"><span v-html="questRadius.options[questRadius.number]"></span></a></li>
			    </ul>
			</div>
			<div class="q-mx-md">
				<div class="row justify-center">
					<div class="col-12 q-my-md">
						<q-input color="grey-5" bg-color="white" outlined label="Search. . .">
					        <template v-slot:append>
					          <q-icon name="search" />
					        </template>
					    </q-input>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import createWallet from '../../utils/create_wallet.js'

export default {
	data() {
		return {
			purelyPeertier: {
				options: ['&#10084;&#128175;', '&#128154;', '&#128155;', '&#128153;', '&#128420;'],
				number: 0
			},
			questRadius: {
				options: ['&#11093;&#128175;', '&#128378;&#9855;&#128131;', '&#127961;', '&#128739;', '&#127760;'],
				number: 0
			},
			phyicalPresence: {
				options: ['&#128175;', '&#10004;', '&#10060;'],
				number: 0
			},
			quests: [
				{
					name: "Jollibee",
					total_cashdrops: "10",
					price: "Mug",
					phone_no: "###-###-####",
					contact_url: "www.facebook.com/merchant-contact",
					acceptance_tier: "\u2764\uFE0F\uD83D\uDCAF",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					radius: "\u2B55\uD83D\uDCAF",
					coors: {
						lat: 11.17783410449158,
						lng: 125.0017081909703
					},
					level: "upcoming",
					btnLabel: "Show more info"
				},
				{
					name: "McDo",
					total_cashdrops: "14",
					price: "Spaghetti",
					phone_no: "###-###-####",
					contact_url: "www.facebook.com/merchant-contact",
					acceptance_tier: "\u2764\uFE0F\uD83D\uDCAF",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					radius: "\u2B55\uD83D\uDCAF",
					coors: {
						lat: 11.176572907648463,
						lng: 125.00093244003742
					},
					level: "direct",
					btnLabel: "Show more info"
				},
				{
					name: "J & F Department Store Palo",
					total_cashdrops: "20",
					price: "50% less to all items",
					phone_no: "###-###-####",
					contact_url: "www.facebook.com/merchant-contact",
					acceptance_tier: "\u2764\uFE0F\uD83D\uDCAF",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					radius: "\u2B55\uD83D\uDCAF",
					coors: {
						lat: 11.180325256142286,
						lng: 125.00271409774162
					},
					level: "indirect",
					btnLabel: "Show more info"
				},
				{
					name: "Seafoods & Ribs Warehouse",
					total_cashdrops: "20",
					price: "50% less to all items",
					phoneNumber: "###-###-####",
					contact_url: "www.facebook.com/merchant-contact",
					acceptance_tier: "\u2764\uFE0F\uD83D\uDCAF",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					radius: "\u2B55\uD83D\uDCAF",
					coors: {
						lat: 11.172492400856424,
						lng: 124.9996134948425
					},
					level: "direct",
					btnLabel: "Show more info"
				}
			]
		}
	},
	methods: {
		showQuestCoordinatesOnMap (coordinates) {
			this.$emit('moveToTheQuestCoordinates', coordinates)
		},
		showMorequestInfo (ref) {
			let classList = this.$refs[ref][0].classList
			this.$refs[ref][0].classList.toggle('showMorequestInfo')

			classList.value.match(/showMorequestInfo/gi) === null
			? this.quests[ref].btnLabel = 'Show more info'
			: this.quests[ref].btnLabel = 'Hide other info'
		},
		changeTier () {
			this.purelyPeertier.number++
			this.purelyPeertier.number = this.purelyPeertier.number == 5 ? 0 : this.purelyPeertier.number
		},
		changePhysicalPresence () {
			this.phyicalPresence.number++
			this.phyicalPresence.number = this.phyicalPresence.number == 3 ? 0 : this.phyicalPresence.number
		},
		changeQuestRadius () {
			this.questRadius.number++
			this.questRadius.number = this.questRadius.number == 5 ? 0 : this.questRadius.number
		},
		importWallet () {

			let wallet = {
				seed_hash: localStorage.getItem('seed_hash'),
				xpubkey: localStorage.getItem('xpubkey')
			}

			this.$axios.post("https://staging.purelypeer.cash/api/wallet/import_wallet/", wallet)
			.then(response => {
				console.log('Mutate Addresses', response)
				this.$store.commit('wallet/mutateAddresses', response.data.addresses)

				// this.fetchQuestList()

				console.log('BCH address: ', this.$store.state.wallet.wallet.addresses[0].bch)
				console.log('SLP address: ', this.$store.state.wallet.wallet.addresses[0].slp)
			})
			.catch(error => console.log('Failed importing'))
		},
		fetchQuestList () {
			this.$store.dispatch('cashdrop/fetchQuestList')
			.then(response => {
				console.log('Hello quest: ', response)
			})
		}
	},
	created () {
		this.importWallet()
	}
}
</script>

<style>
.questMoreInfo {
	display: none;
}
.showMorequestInfo {
	display: block;
}
</style>