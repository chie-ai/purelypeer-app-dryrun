<template>
  <div>
      <div id="logo" @click="redirectToMenu">
        <img src="PurelyPeer-icon-inverse.png" width="100%" class="q-ma-none">
      </div>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  methods: {
    redirectToMenu () {
      this.$router.push({ path: 'purelypeer-menu' })
    }
  }
}
</script>

<style scoped>
</style>
