<template>
  <div class="row">
    <BchWalletBalance />
    <Menu />
  </div>
</template>

<script>
import BchWalletBalance from '../../components/explore/BchWalletBalance.vue'
import Menu from '../../components/explore/Menu.vue'

export default {
  components: {
    BchWalletBalance,
    Menu
  }
}
</script>

<style lang="scss">
</style>
