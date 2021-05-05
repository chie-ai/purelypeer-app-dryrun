<template>
  <div class="row justify-center animate-in-load">
    <ConfirmTransaction v-on:routeStatus="updateRouteStatus" />
  </div>
</template>

<script>
import ConfirmTransaction from '../../components/cashdrop/ConfirmTransaction.vue'

export default {
  data () {
    return {
      routable: true
    }
  },
  components: {
    ConfirmTransaction
  },
  methods: {
    updateRouteStatus (status) {
      this.routable = status
    }
  },
  beforeRouteLeave (to, from, next) {
    this.routable ? next() : next(false)
  }
}
</script>

<style lang="scss">
</style>
