<template>
  <div style="position: absolute; width: 100%; height: 100%" class="bg-grey-1 q-pt-lg">
    <div class="q-px-lg q-pt-lg text-center">
      <!-- <img src="PurelyPeer-stamp.png" alt="Logo stamp" width="80%"> -->
      <span class="mdi mdi-check-circle" style="color: #0AC18E; font-size: 170px"></span>
      <!-- <p style="font-size: 150px;"><span>&#x1F4B8;</span></p> -->
      <p class="text-h5" style="color: #0AC18E; font-family: PurelyPeer-Bold;">Yay, It's Done!</p>
      <p style="color: #0e3247 !important">Payment successful! We are glad you have made your quest.</p>
    </div>

    <div class="q-px-lg">
      <q-btn label="Back to create quest" type="submit" @click="backToCreate" class="full-width q-mt-md quest-btn"/>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  methods: {
    backToCreate () {
      this.$router.push({ path: '/cash-drop' })
    }
  }
}
</script>

<style>
.quest-btn {
  background: radial-gradient(circle, #0CDAA1 0%, #0AC18E 100%) !important;
  color: white;
}
</style>
