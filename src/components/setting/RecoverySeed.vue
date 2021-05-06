<template>
  <div class="q-px-sm bg-grey-2" ref="recovery" style="width: 100% !important; margin-top: 60px;">
    <div class="text-center q-pt-lg">
      <p class="recovery-phrase-caption q-mb-sm"><strong>My Recovery Phrase</strong></p>
      <span style="font-size: 12px; line-height: 10px">Your recovery phrase is the key to access your wallet in the event that you ever lose or break your device</span>
    </div>
    <div class="row q-col-gutter-sm q-mt-xs">
      <div class="col-4 q-my-xs" style="height: 44px; line-height: 44px; color: #0e3247" v-for="(seed, index) in seedPhrase" :key="index">
        <div class="q-pl-md" style="border-radius: 10px; border: 1.5px solid rgb(197, 206, 203)">
          <span style="color: #7F7F7F; font-family: Monospace;">{{ index }}.</span> {{ seed }}
        </div>
      </div>
      <!-- <div class="row justify-between q-py-md q-gutter-sm">
        <div class="seed__phrase text-center text-white q-py-xs q-px-md shadow-2" v-for="(seed, index) in seedPhrase" :key="index">
          {{ seed }}
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      seedPhrase: null
    }
  },
  created () {
    this.seedPhrase = localStorage.getItem('seedPhrase').split(' ')
  },
  mounted () {
    const screenHeight = screen.height
    const newHeight = screenHeight - 61

    console.log('height: ', newHeight)

    this.$refs.recovery.setAttribute('style', 'height: ' + newHeight + 'px !important; width: 100% !important; margin-top: 60px;')
  }
}
</script>

<style>
.seed__phrase {
  border-radius: 10px;
  background: #0AC18E;
}
.recovery-phrase-caption {
  color: #0e3247;
}
</style>
