<template>
  <div id="setting">
    <div class="col-12">
      <h5 class="text-white text-center setting-caption q-mt-md q-mb-none">Setting</h5>

      <p class="mnemonic text-left q-px-md q-mb-none q-mt-md"><strong>Mnemonic:</strong></p>  
      <div class="row justify-evenly q-pa-md text-center q-gutter-md">
        <q-badge color="teal" v-for="(seed, index) in seedPhrase" class="text-center" :key="index">
          {{ seed }}
        </q-badge>
      </div>

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
    this.seedPhrase = localStorage.getItem('seedPhrase').split(" ")

  }
}
</script>

<style scoped>
.setting-caption {
  margin-top: 90px;
  color: #0AC18E !important;
}
.mnemonic {
  color: #0AC18E !important;
}
.bg-notify-purelypeer {
  background-color: #0AC18E;
}
</style>