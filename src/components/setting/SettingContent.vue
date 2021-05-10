<template>
  <div id="setting">
    <div class="col-12 q-pt-xs">
      <div class="">
        <p class="q-mb-sm q-mt-md text-h5" style="color: #0AC18E"><strong>Settings</strong></p>
      </div>
      <p class="security text-subtitle1 text-left q-mb-none q-mt-md"><strong>Security:</strong></p>
      <div class="security-menu-list q-pt-xs">
        <div class="security-menu" @click="redirectToRecoverySeed">
          <span class="security-menu-label" v-wave="{ color: '#bbbbbb', initialOpacity: 0.5, easing: 'ease-in', duration: 0.3 }">My Recovery Phrase</span>
          <span class="mdi mdi-chevron-right mdi-18px chevron-custon-css"></span>
        </div>
        <div class="security-menu">
          <span class="security-menu-label">App Lock</span>
          <q-toggle
          class="toggle-custom-css"
          v-model="value"
          color="green"
          />
        </div>
        <!-- <div class="security-menu">
          <p class="security-menu-label">App Lock</p>
        </div> -->
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
      seedPhrase: null,
      value: false
    }
  },
  methods: {
    redirectToRecoverySeed () {
      this.$router.push({ path: '/setting/recovery-seed' })
    }
  },
  created () {
    this.seedPhrase = localStorage.getItem('seedPhrase').split(' ')
  }
}
</script>

<style scoped>
.security-menu {
  position: relative;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(197, 206, 203);
}
.chevron-custon-css {
  position: absolute !important;
  right: 8px !important;
  top: 2px !important;
}
.toggle-custom-css {
  position: absolute;
  right: 3px;
  top: 3px;
}
.security-menu-label {
  color: #0e3247;
  vertical-align: middle !important;
}
#setting {
  height: 350px;
  width: 100%;
}
.setting-caption {
  color: #0AC18E !important;
}
.security {
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
