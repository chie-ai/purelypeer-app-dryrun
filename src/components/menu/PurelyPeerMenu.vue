<template>
  <div class="q-pa-md" style="width: 100% !important">
    <div class="menu-main-container q-pb-lg">
      <BchWalletBalance />
      <PurelyPeerMenu />
    </div>
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
  }
}
</script>

<style>
.menu-main-container {
  border-radius: 20px;
  background: #B5ECDD;
  margin-top: 60px;
  border: 2px solid #84C2B1;
}
</style>
