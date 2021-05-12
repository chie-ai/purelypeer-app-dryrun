<template>
  <div id="setting">
    <div class="col-12 q-pt-xs">
      <div class="">
        <p class="q-mb-sm q-mt-md text-h5" style="color: #0AC18E"><strong>Settings</strong></p>
      </div>
      <p class="security text-subtitle1 text-left q-mb-none q-mt-lg"><strong>Security:</strong></p>
      <div class="q-pt-xs q-mb-sm">
        <div class="security-menu" @click="redirectToRecoverySeed">
          <span class="security-menu-label" v-wave="{ color: '#bbbbbb', initialOpacity: 0.5, easing: 'ease-in', duration: 0.3 }">&#x1F4D2; My Recovery Phrase</span>
          <span class="mdi mdi-chevron-right mdi-18px chevron-custon-css"></span>
        </div>
        <div class="security-menu">
          <span class="security-menu-label">&#x1F510; App Lock</span>
          <q-toggle
          class="toggle-custom-css"
          v-model="value"
          color="green"
          />
        </div>
      </div>
      <p class="security text-subtitle1 text-left q-mb-none q-mt-lg"><strong>Help & Support:</strong></p>
      <div class="q-pt-xs">
        <div class="security-menu">
          <span class="security-menu-label">&#x2139;&#xFE0F; About</span>
          <span class="mdi mdi-chevron-right mdi-18px chevron-custon-css"></span>
        </div>
        <div class="security-menu">
          <span class="security-menu-label">&#x1F6E9;&#xFE0F; Tour</span>
          <span class="mdi mdi-chevron-right mdi-18px chevron-custon-css"></span>
        </div>
      </div>
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
