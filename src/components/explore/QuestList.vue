<template>
	<div id="quest-list">
		<div class="col-12 quest-container">
			<h5 class="text-center q-mt-md q-mb-sm">QUESTS</h5>

			<div class="quest-main q-mx-md">
				<div class="column quest-body">
					<div class="col-4 q-py-md quest-list">
						<div class="row">
							<div class="col-12 q-px-sm">
								<p class="q-mb-xs"><span class="text-weight-bold">Merchant Name: </span><span class="text-subtitle2">Jollibee</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Phone Number: </span><span class="text-subtitle2">###-###-####</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Contact URL: </span><a href="www.facebook.com" class="text-caption">www.facebook.com/merchant-contact</a></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Custom field: </span><span class="text-subtitle2">xxxxxxxxx</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Tier: </span><span>&#10084;</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Presence: </span><span>&#129521;&#128175;</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Radius: </span><span>&#11093;&#128175;</span></p>
							</div>
							<div class="col-12 q-px-sm q-mt-sm text-center">
								<q-btn size="sm" color="teal" label="Show on map" />
							</div>
						</div>
					</div>
					<div class="col-4 q-py-md quest-list">
						<div class="row">
							<div class="col-12 q-px-sm">
								<p class="q-mb-xs"><span class="text-weight-bold">Merchant Name: </span><span class="text-subtitle2">Jollibee</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Phone Number: </span><span class="text-subtitle2">###-###-####</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Contact URL: </span><a href="www.facebook.com" class="text-caption">www.facebook.com/merchant-contact</a></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Custom field: </span><span class="text-subtitle2">xxxxxxxxx</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Tier: </span><span>&#10084;</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Presence: </span><span>&#129521;&#128175;</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Radius: </span><span>&#11093;&#128175;</span></p>
							</div>
							<div class="col-12 q-px-sm q-mt-sm text-center">
								<q-btn size="sm" color="teal" label="Show on map" />
							</div>
						</div>
					</div>
					<div class="col-4 q-py-md quest-list">
						<div class="row">
							<div class="col-12 q-px-sm">
								<p class="q-mb-xs"><span class="text-weight-bold">Merchant Name: </span><span class="text-subtitle2">Jollibee</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Phone Number: </span><span class="text-subtitle2">###-###-####</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Contact URL: </span><a href="www.facebook.com" class="text-caption">www.facebook.com/merchant-contact</a></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Custom field: </span><span class="text-subtitle2">xxxxxxxxx</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Tier: </span><span>&#10084;</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Presence: </span><span>&#129521;&#128175;</span></p>
								<p class="q-mb-xs"><span class="text-weight-bold">Radius: </span><span>&#11093;&#128175;</span></p>
							</div>
							<div class="col-12 q-px-sm q-mt-sm text-center">
								<q-btn size="sm" color="teal" label="Show on map" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="ratio-option" class="q-mt-lg">
			    <ul>
			        <li>
			        	<a href="#?" class="fs-2" @click="changeTier"><span v-html="purelyPeertier.options[purelyPeertier.number]"></span></a>
			        </li>
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
				options: ['&#10084; &#128175;', '&#128154;', '&#128155;', '&#128153;', '&#128420;'],
				number: 0
			},
			questRadius: {
				options: ['&#11093;&#128175;', '&#128378;&#9855;&#128131;', '&#127961;', '&#128739;', '&#127760;'],
				number: 0
			},
			phyicalPresence: {
				options: ['&#128175;', '&#10004;', '&#10060;'],
				number: 0
			}
		}
	},
	methods: {
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
		}
	}
}
</script>

<style>
</style>