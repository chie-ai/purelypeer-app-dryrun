<template>
  <div id="setting">
    <div class="q-px-md q-mt-lg">
      <q-card>
        <q-card-section>
          <div class="text-h6 quest-caption">
            Setting
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <p class="mnemonic text-left q-mb-none q-mt-md"><strong>Mnemonic:</strong></p>
          <div class="row justify-between q-py-md q-gutter-sm">
            <div class="seed__phrase text-center text-white q-py-xs q-px-md shadow-2" v-for="(seed, index) in seedPhrase" :key="index">
              {{ seed }}
            </div>
          </div>
        </q-card-section>
      </q-card>

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
  }
}
</script>

<style scoped>
.setting-caption {
  color: #0AC18E !important;
}
.mnemonic {
  color: #0AC18E !important;
}
.bg-notify-purelypeer {
  background-color: #0AC18E;
}
.seed__phrase {
  border-radius: 10px;
  background: #0AC18E;
}
</style>
