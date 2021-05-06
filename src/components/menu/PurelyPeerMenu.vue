<template>
  <div class="q-px-md bg-grey-2" ref="menu" style="width: 100% !important; margin-top: 60px;">
    <div class="quest-caption q-pb-none q-mb-md">
      <BchWalletBalance />
    </div>
    <q-separator ref="cardSeparator"/>
    <PurelyPeerMenu />
  </div>
</template>

<script>
import BchWalletBalance from '../../components/menu/BchWalletBalance.vue'
import PurelyPeerMenu from '../../components/menu/Menu.vue'

export default {
  data () {
    return {}
  },
  components: {
    BchWalletBalance,
    PurelyPeerMenu
  },
  mounted () {
    const screenHeight = screen.height
    const newHeight = screenHeight - 61

    console.log('height: ', newHeight)

    this.$refs.menu.setAttribute('style', 'height: ' + newHeight + 'px !important; width: 100% !important; margin-top: 60px;')
  }
}
</script>

<style>
</style>
