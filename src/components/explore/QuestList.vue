<template>
	<div id="quest-list">
		<div class="col-12 quest-container q-mt-lg">
			<h5 class="text-center q-mt-md q-mb-sm">Quests</h5>

			<div class="quest-main q-mx-md">
				<div class="column quest-body">
					<div class="col-12 q-py-md quest-list" v-for="(cashDrop, i) in cashDrops" :key="i">
						<div class="row">
							<div class="col-12 q-px-sm">
								<p class="q-mb-xs"><span class="text-weight-bold">Merchant Name: </span><span class="text-subtitle2">{{ cashDrop.merchant }}</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Cashdrops Count: </span><span class="text-subtitle2">{{ cashDrop.cashDropCount }}</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">PurelyPeer Tier: </span><span>{{ cashDrop.tier }}</span></p>

								<div class="cashDropMoreInfo" :ref="i">
									<p class="q-mb-xs"><span class="text-weight-bold">Phone Number: </span><span class="text-subtitle2">{{ cashDrop.phoneNumber }}</span></p>
									<p class="q-mb-xs"><span class="text-weight-bold">Contact URL: </span><a href="www.facebook.com" class="text-caption">{{ cashDrop.contactUrl }}</a></p>
									<p class="q-mb-xs"><span class="text-weight-bold">Presence: </span><span>{{ cashDrop.presence }}</span></p>
									<p class="q-mb-xs"><span class="text-weight-bold">Radius: </span><span>{{ cashDrop.radius }}</span></p>
								</div>
							</div>
							<div class="col-12 q-px-sm q-mt-sm">
								<q-btn size="sm" color="teal" :ref="'btn-'+i" label="Show more info" @click="showMoreCashDropInfo(i)"/>
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
			cashDrops: [
				{
					merchant: "Jollibee",
					cashDropCount: "10",
					price: "Mug",
					phoneNumber: "###-###-####",
					contactUrl: "www.facebook.com/merchant-contact",
					tier: "\u2764\uFE0F\uD83D\uDCAF",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					radius: "\u2B55\uD83D\uDCAF"
				},
				{
					merchant: "McDo",
					cashDropCount: "14",
					price: "Spaghetti",
					phoneNumber: "###-###-####",
					contactUrl: "www.facebook.com/merchant-contact",
					tier: "\u2764\uFE0F\uD83D\uDCAF",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					radius: "\u2B55\uD83D\uDCAF"
				},
				{
					merchant: "Gaisano",
					cashDropCount: "20",
					price: "50% less to all items",
					phoneNumber: "###-###-####",
					contactUrl: "www.facebook.com/merchant-contact",
					tier: "\u2764\uFE0F\uD83D\uDCAF",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					radius: "\u2B55\uD83D\uDCAF"
				}
			]
		}
	},
	methods: {
		showMoreCashDropInfo (ref) {
			let classList = this.$refs[ref][0].classList
			this.$refs[ref][0].classList.toggle('showMoreCashDropInfo')

			classList.value.match(/showMoreCashDropInfo/gi) === null
			? this.$refs['btn-'+ref][0].label = 'Show more info'
			: this.$refs['btn-'+ref][0].label = 'Hide other info'
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
	}
}
</script>

<style>
.cashDropMoreInfo {
	display: none;
}
.showMoreCashDropInfo {
	display: block;
}
</style>