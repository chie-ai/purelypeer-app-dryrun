<template>
  <div class="text-center logo-loading" ref="logoLoading">
    <img src="PurelyPeer-loading-tiers.gif" alt="Logo loading..." style="width: 70%">
  </div>
</template>

<script>

export default {
  data () {
    return {
      loader: false
    }
  },
  props: ['animateLoader'],
  methods: {
    animate () {
      this.animateLoader === true ? this.$refs.logoLoading.classList.add('animate-loader') : this.$refs.logoLoading.classList.remove('animate-loader')
    }
  },
  mounted () {
    this.loader = this.animateLoader
    this.animate()
  }
}
</script>

<style>
.logo-loading {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10%;
  height: 100%;
  width: 100%;
  z-index: 1000;
}
.animate-loader {
  animation: 1s appear;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
