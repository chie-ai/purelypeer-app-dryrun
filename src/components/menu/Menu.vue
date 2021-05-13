<template>
  <div id="menu-list" ref="menuList">
    <div class="col-12 q-pt-xs">
      <div class="">
        <p class="q-mb-md q-mt-md text-h5" style="color: #0AC18E"><strong>Menu</strong></p>
      </div>
      <q-separator />
      <div class="security-menu-list">
        <div class="security-menu">
          <span class="security-menu-label">Explore</span>
          <span class="custom-icon-css">&#128220;</span>
        </div>
        <div class="security-menu">
          <span class="security-menu-label">Cashdrop</span>
          <span class="custom-icon-css">&#128167;</span>
        </div>
        <div class="security-menu">
          <span class="security-menu-label">Collect</span>
          <span class="custom-icon-css">&#128176;</span>
        </div>
        <div class="security-menu">
          <span class="security-menu-label">Settings</span>
          <span class="custom-icon-css">&#x2699;&#xFE0F;</span>
        </div>
        <div class="security-menu">
          <span class="security-menu-label">&#x2699;&#xFE0F; Wallet</span>
          <span class="custom-icon-css">&#x1F4B5;</span>
        </div>
        <div class="security-menu">
          <span class="security-menu-label">&#x2699;&#xFE0F; Security</span>
          <span class="custom-icon-css">&#x1F510;</span>
        </div>
        <div class="security-menu">
          <span class="security-menu-label">&#x2699;&#xFE0F; About</span>
          <span class="custom-icon-css">&#x2139;&#xFE0F;</span>
        </div>
        <div class="security-menu">
          <span class="security-menu-label">&#x2699;&#xFE0F; Tour</span>
          <span class="custom-icon-css">&#x1F6E9;&#xFE0F;</span>
        </div>
      </div>
<!--
      <q-list bordered separator class="bg-white menu-label">
        <q-item clickable v-ripple>
          <q-item-section class="text-left">Explore</q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#128220;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left">Cashdrop</q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#128167;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left">Collect</q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#128176;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left">Settings</q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#x2699;&#xFE0F;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left">Wallet</q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#x1F4B5;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left">Security</q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#x1F510;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left">About</q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#x2139;&#xFE0F;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left">Tour</q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px;">&#x1F6E9;&#xFE0F;</span>
          </q-item-section>
        </q-item>

      </q-list> -->
    </div>
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
.security-menu {
  position: relative;
  height: 50px;
  line-height: 50px;
  padding-top: 2px;
  border-bottom: 1px solid rgb(197, 206, 203);
}
.custom-icon-css {
  position: absolute !important;
  right: 12px !important;
  top: 2px !important;
}
.security-menu-label {
  color: #0e3247;
  vertical-align: middle !important;
}
.menu-label {
  color: #0e3247 !important;
}
</style>
