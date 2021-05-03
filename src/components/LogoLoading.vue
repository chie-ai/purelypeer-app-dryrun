<template>
  <div class="text-center logo-loading" ref="logoLoading">
    <img src="PurelyPeer-loading-tiers.gif" alt="Logo loading..." style="width: 70%">
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  props: ['animateLoader', 'animateHide'],
  methods: {
    animate () {
      this.animateLoader === true ? this.$refs.logoLoading.classList.add('animate-loader') : this.$refs.logoLoading.classList.remove('animate-loader')
    },
    animateHiding () {
      alert('Hide')
      this.animateHide === true ? this.$refs.logoLoading.classList.add('animate-hiding') : this.$refs.logoLoading.classList.add('animate-hiding')
    }
  },
  mounted () {
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
  z-index: 10000;
}
.animate-loader {
  animation: 1s appear;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
}
.animate-hiding {
  transition: opacity 2s;
}
/* @keyframes disappear {
  0% {
    opacity: 0;
  }
} */
</style>
