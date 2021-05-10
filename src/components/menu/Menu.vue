<template>
  <div id="menu-list" ref="menuList">
    <div class="col-12 q-pt-xs">
      <h6 class="q-mt-sm q-mb-sm" style="color: #0ac18e"><strong>Menu</strong></h6>
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
            <!-- &#x1F4B8; -->
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

      </q-list>
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
.menu-label {
  color: #0e3247 !important;
}
</style>
