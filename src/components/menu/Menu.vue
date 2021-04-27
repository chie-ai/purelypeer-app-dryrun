<template>
  <div id="menu-list" ref="menuList">
    <div class="col-12 q-pt-xs q-px-md text-center">
      <h6 class="text-center q-mt-none q-mb-md" style="color: #0AC18E"><strong>Menu</strong></h6>
      <q-list bordered separator style="background: #B5ECDD; color: #0AC18E">
        <q-item clickable v-ripple>
          <q-item-section class="text-left"><strong>Explore</strong></q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#128220;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left"><strong>Cashdrop</strong></q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#128167;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left"><strong>Collect</strong></q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#128176;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left"><strong>Settings</strong></q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#x2699;&#xFE0F;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left"><strong>Wallet</strong></q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#x1F4B8;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left"><strong>Back Up</strong></q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#x1F510;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left"><strong>About</strong></q-item-section>
          <q-item-section avatar>
            <span style="font-size: 18px">&#x2139;&#xFE0F;</span>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section class="text-left"><strong>Tour</strong></q-item-section>
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

<style scoped>
</style>
