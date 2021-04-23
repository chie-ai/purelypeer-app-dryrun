<template>
  <div class="full-width q-px-md q-py-md">
    <q-card>
      <q-card-section>
        <div class="text-h6 quest-caption">
          Gallery
          <q-btn color="white" @click="toggleQuestList" style="position: absolute; right: 16px; top: 14px" rounded :dense="true" text-color="black" :icon="questExpanderIcon" />
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pa-none q-pt-md">
        <div class="q-px-xs">
          <div class="row justify-center">
            <div class="q-pa-sm" style="height: 200px; width: 200px;">
              <div class="gallery-collectibles text-center">
                <div style="width: 100%; padding-top: 28%">
                  <p class="text-h4 q-my-none">&#10084;&#x1F451;</p>
                  <p class="text-h4 q-my-none">&#x1F34C;&#x1F43B;</p>
                </div>
              </div>
            </div>
            <div class="q-pa-sm" style="height: 200px; width: 200px;">
              <div class="gallery-collectibles text-center">
                <div style="width: 100%; padding-top: 28%">
                  <p class="text-h4 q-my-none">&#10084;&#x1F451;</p>
                  <p class="text-h4 q-my-none">&#x1F34C;&#x1F43B;</p>
                </div>
              </div>
            </div>
            <div class="q-pa-sm" style="height: 200px; width: 200px;">
              <div class="gallery-collectibles text-center">
                <div style="width: 100%; padding-top: 28%">
                  <p class="text-h4 q-my-none">&#10084;&#x1F451;</p>
                  <p class="text-h4 q-my-none">&#x1F34C;&#x1F43B;</p>
                </div>
              </div>
            </div>
            <div class="q-pa-sm" style="height: 200px; width: 200px;">
              <div class="gallery-collectibles text-center">
                <div style="width: 100%; padding-top: 28%">
                  <p class="text-h4 q-my-none">&#10084;&#x1F451;</p>
                  <p class="text-h4 q-my-none">&#x1F34C;&#x1F43B;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      questExpanderIcon: 'mdi-arrow-expand-all'
    }
  },
  methods: {
    toggleQuestList () {}
  }
}
</script>

<style>
.gallery-collectibles {
  height: 70px !important;
  width: 100% !important;
  height: 100% !important;
  border-radius: 10px;
  background: #B5ECDD;
  border: 3px solid #0AC18E;
}
</style>
