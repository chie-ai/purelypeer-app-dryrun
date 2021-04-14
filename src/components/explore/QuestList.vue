<template>
  <div id="quest-list">
    <div class="col-12 quest-container q-mt-none q-mb-none q-pt-lg q-pt-xs">

      <div class="q-px-md">
        <q-card class="my-card" ref="questListCard">
          <q-card-section>
            <div class="text-h6 quest-caption">
              Explore Quests
              <q-btn color="white" @click="toggleQuestList" style="position: absolute; right: 16px; top: 14px" rounded :dense="true" text-color="black" :icon="questExpanderIcon" />
            </div>
          </q-card-section>

          <q-separator/>

          <q-card-section class="q-pt-sm">
            <div class="quest-main" ref="questMain">
              <div class="col-12 q-py-md q-mt-sm quest-list q-px-sm" v-for="(quest, questIndex) in quests" :key="questIndex"
                @click="showQuestCoordinatesOnMap(quest, questIndex)">
                <div class="row">
                  <div class="col-12 q-px-sm">
                    <p class="q-mb-xs"><span class="text-weight-bold quest-label">Quest Name: </span><span class="text-subtitle2">{{ quest.name }}</span></p>
                    <p class="q-mb-xs"><span class="text-weight-bold quest-label">X/Y: </span><span class="text-subtitle2">{{ quest.cashdrops_remaining + '/' + quest.total_cashdrops }}</span></p>
                    <p class="q-mb-xs" v-if="quest.phone_no"><span class="text-weight-bold quest-label">Phone Number: </span><span class="text-subtitle2">{{ quest.phone_no }}</span></p>
                    <p class="q-mb-xs" v-if="quest.contactUrl"><span class="text-weight-bold quest-label">Contact URL: </span><a href="www.facebook.com" class="text-caption">{{ quest.contactUrl }}</a></p>

                    <div class="questMoreInfo" :ref="questIndex">
                      <p class="q-mb-xs"><span class="text-weight-bold quest-label" v-if="quest.memo">Memo: </span><span>{{ quest.memo }}</span></p>
                      <p class="q-mb-xs"><span class="text-weight-bold quest-label">PurelyPeer Tier | Presence | Radius: </span>
                      <br>
                        <span>
                          {{ quest.acceptance_tier === 'Direct' ? 'Direct \uD83D\uDC9A' : quest.acceptance_tier === 'Indirect' ? 'Indirect \uD83E\uDDE1' : quest.acceptance_tier === 'Upcoming' ? 'Upcoming \uD83D\uDC99' : 'Inactive \uD83D\uDDA4' }}
                          | {{ quest.has_physical_presence ? 'Yes \uD83E\uDDF1\u2714\uFE0F' : 'No \uD83E\uDDF1\u274C' }}
                          | {{ (quest.radius === 1500 ? '15 min \uD83D\uDD7A\u267F\uD83D\uDC83' : quest.radius === 15000 ? 'Urban \uD83C\uDFD9\uFE0F' : quest.radius === 15000 ? 'Regional \uD83D\uDEE3\uFE0F' : 'Continental \uD83C\uDF10' ) }}
                        </span>
                      </p>
                    </div>
                  </div>
                  <!-- <div class="col-12 q-px-sm q-mt-sm">
                    <q-btn size="sm" color="purelypeer" rounded :ref="'btn-'+questIndex" :label="quest.btnLabel" @click="showMorequestInfo(questIndex)"/>
                  </div> -->
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div id="ratio-option" class="q-mt-lg q-px-md">
        <ul>
          <li><a href="#?" class="fs-2" @click="changeTier"><span v-html="purelyPeertier.options[purelyPeertier.number]"></span></a></li>
          <li><a href="#?" class="fs-2" @click="changePhysicalPresence">&#129521;<span v-html="phyicalPresence.options[phyicalPresence.number]"></span></a></li>
          <li><a href="#?" class="fs-2" @click="changeQuestRadius"><span v-html="questRadius.options[questRadius.number]"></span></a></li>
        </ul>
      </div>
      <div class="q-mx-md">
        <div class="row justify-center">
          <div class="col-12 q-mb-md">
            <q-input :dense="true" color="grey-5" bg-color="white" outlined label="Search. . .">
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
  data () {
    return {
      purelyPeertier: {
        options: ['&#10084;&#128175;', '&#128154;', '&#128155;', '&#128153;'],
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
      quests: null,
      questIndexer: null,
      questExpanderIcon: 'mdi-arrow-expand-all'
    }
  },
  methods: {
    showQuestCoordinatesOnMap (coordinates, index) {
      const dummyCoors = {
        coors: [Number(coordinates.coors[0]) + 0.0000001, Number(coordinates.coors[1]) + 0.0000001],
        radius: coordinates.radius
      }

      if (this.questIndexer === index) {
        this.$emit('moveToTheQuestCoordinates', dummyCoors)
        setTimeout(() => {
          this.$emit('moveToTheQuestCoordinates', coordinates)
        }, 50)
      } else {
        this.$emit('moveToTheQuestCoordinates', coordinates)
      }
      this.questIndexer = index
      this.showMorequestInfo(index)
    },
    showMorequestInfo (ref) {
      const classList = this.$refs[ref][0].classList
      this.$refs[ref][0].classList.toggle('showMorequestInfo')

      if (classList.value.match(/showMorequestInfo/gi) === null) {
        this.quests[ref].btnLabel = 'Show more info'
      } else {
        this.quests[ref].btnLabel = 'Hide other info'
      }
    },
    changeTier () {
      this.purelyPeertier.number++
      if (this.purelyPeertier.number === 4) {
        this.purelyPeertier.number = 0
      }
    },
    changePhysicalPresence () {
      this.phyicalPresence.number++
      this.phyicalPresence.number = this.phyicalPresence.number === 3 ? 0 : this.phyicalPresence.number
    },
    changeQuestRadius () {
      this.questRadius.number++
      this.questRadius.number = this.questRadius.number === 5 ? 0 : this.questRadius.number
    },
    toggleQuestList () {
      this.$refs.questListCard.$el.classList.toggle('card-expander')
      this.questExpanderIcon = this.$refs.questListCard.$el.classList.contains('card-expander') ? 'mdi-arrow-collapse-all' : 'mdi-arrow-expand-all'
      this.$refs.questMain.classList.toggle('quest-visible')
    }
  },
  async mounted () {
    await this.$store.dispatch('cashdrop/fetchQuestList')
      .then(res => {
        this.quests = res.data.results.map(quest => ({ ...quest, btnLabel: 'Show more info' }))
        console.log('Quest: ', this.quests)
      })
      .catch(err => {
        console.log('Error: ', err)
      })
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
.bg-purelypeer {
  background-color: #0AC18E;
  padding-top: 2px;
}
p {
  color: #676767;
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
