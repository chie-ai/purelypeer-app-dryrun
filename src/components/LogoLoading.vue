<template>
  <div class="text-center logo-loading bg-white" ref="logoLoading">
    <img src="PurelyPeer-loading-tiers.gif" alt="Logo loading..." style="width: 70%">
  </div>
</template>

<script>

export default {
  data () {
    return {}
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
  top: 0pt;
  left: 0pt;
  z-index: 10000 !important;
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
