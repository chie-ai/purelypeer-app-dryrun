<template>
  <div class="q-mt-lg q-px-lg text-center" style="width: 100%">
    <span class="mdi mdi-check-circle mdi-48px" style="color: #0AC18E"></span>
    <p><strong>The quest has been created!</strong></p>
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
      <q-btn :label="'Pay \uD83D\uDCB5'" type="submit" class="full-width q-mt-md quest-btn"/>
      <q-btn label="Cancel" type="submit" class="full-width q-mt-md"/>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      quest: null
    }
  },
  mounted () {
    this.quest = this.$route.query
  }
}
</script>

<style>
.fnt-10 {
  font-size: 12px;
}
</style>
