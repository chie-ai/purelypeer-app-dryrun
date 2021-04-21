<template>
  <div id="menu-list" ref="menuList">
    <div class="col-12 q-pt-none q-px-md text-center">
      <q-list bordered separator style="background: #0AC18E;">
        <q-item clickable v-ripple>
          <q-item-section class="text-left q-ml-md text-white">Explore</q-item-section>
          <q-item-section avatar class="q-mr-md">
            <span style="font-size: 18px">&#128220;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left q-ml-md text-white">Cashdrop</q-item-section>
          <q-item-section avatar class="q-mr-md">
            <span style="font-size: 18px">&#128167;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left q-ml-md text-white">Collect</q-item-section>
          <q-item-section avatar class="q-mr-md">
            <span style="font-size: 18px">&#128176;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left q-ml-md text-white">Settings</q-item-section>
          <q-item-section avatar class="q-mr-md">
            <span style="font-size: 18px">&#x2699;&#xFE0F;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left q-ml-md text-white">Wallet</q-item-section>
          <q-item-section avatar class="q-mr-md">
            <span style="font-size: 18px">&#x1FA99;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left q-ml-md text-white">Back Up</q-item-section>
          <q-item-section avatar class="q-mr-md">
            <span style="font-size: 18px">&#x1F510;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left q-ml-md text-white">Defaults</q-item-section>
          <q-item-section avatar class="q-mr-md">
            <span style="font-size: 18px">&#9881;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left q-ml-md text-white">About</q-item-section>
          <q-item-section avatar class="q-mr-md">
            <span style="font-size: 18px">&#x2139;&#xFE0F;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left q-ml-md text-white">Tour</q-item-section>
          <q-item-section avatar class="q-mr-md">
            <span style="font-size: 18px;">&#x1F6E9;&#xFE0F;</span>
          </q-item-section>
        </q-item>

      </q-list>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  mounted () {
    // const height = this.$q.screen.height
    // console.log('Height: ', height)

    // this.$refs.menuList.style.height = (height - 160) + 'px'
  }
}
</script>

<style scoped>
</style>
