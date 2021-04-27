<template>
  <div class="full-width q-px-md q-py-md">
    <q-card ref="questListCard">
      <q-card-section ref="questCardHeader">
        <div class="text-h6 quest-caption">
          Gallery
          <q-btn color="white" @click="toggleGalleryList" style="position: absolute; right: 16px; top: 14px" rounded :dense="true" text-color="black" :icon="questExpanderIcon" />
        </div>
      </q-card-section>
      <q-separator ref="cardSeparator" />
      <q-card-section class="q-pa-none q-px-md q-py-md shadow-4">
        <div class="q-px-none q-mb-sm">
          <q-btn :label="'Battle \u2694\uFE0F'" disable outline type="submit" class="full-width q-mx-lg battle-btn"/>
        </div>
        <div class="gallery-list" ref="questMain" style="position: relative">
          <div class="row justify-center">
            <div class="q-pa-sm" v-for="(gal, index) in collectibles" :key="index" @click="toggleCollectibles(index)">
              <div class="gallery-collectibles text-center shadow-2" :ref="'coll'+index">
                <p class="text-h4 q-my-none">&#10084;&#x1F451;</p>
                <p class="text-h4 q-my-none">&#x1F34C;&#x1F43B;</p>
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
      questExpanderIcon: 'mdi-arrow-expand-all',
      collectibles: [1, 2, 3, 4, 5, 6]
    }
  },
  methods: {
    toggleGalleryList () {
      this.$refs.questListCard.$el.classList.toggle('card-expander')
      this.$refs.questListCard.$el.classList.toggle('no-shadow')
      this.questExpanderIcon = this.$refs.questListCard.$el.classList.contains('card-expander') ? 'mdi-arrow-collapse-all' : 'mdi-arrow-expand-all'
      this.$refs.questMain.classList.toggle('gallery-visible')
      this.$refs.questCardHeader.$el.classList.toggle('card-header')
      this.$refs.cardSeparator.$el.classList.toggle('card-ceparator')
    },
    toggleCollectibles (index) {
      const els = document.getElementsByClassName('gallery-collectibles')
      for (let i = 0; els.length > i; i++) {
        if (i !== index) {
          els[i].classList.add('hidden')
        }
      }
      els[index].classList.add('active-thumbnail')
    }
  }
}
</script>

<style>
.gallery-collectibles {
  display: table-cell;
  height: 120px !important;
  width: 120px !important;
  border-radius: 16px;
  background: #B5ECDD;
  border: 3px solid #0AC18E;
  vertical-align: middle;
}
.active-thumbnail {
  background: #0E3247 !important;
  position: absolute;
  top: 0pt;
  left: 0pt;
  bottom: 0pt;
  width: 100% !important;
  height: 400px !important;
}
.gallery-list {
  height: 200px;
  overflow: auto;
  margin-top: none;
  margin-bottom: 10px !important;
}
.battle-btn {
  background: radial-gradient(circle, #0CDAA1 0%, #0AC18E 100%) !important;
  color: white;
}
.card-expander {
  position: absolute;
  width: 100%;
  top: 0pt;
  left: 0pt;
  bottom: 0pt;
  z-index: 3000;
  border-radius: 0;
}
.card-header {
  position: fixed;
  top: 0pt;
  height: 61px;
  width: 100%;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: none;
  z-index: 3000;
}
.card-ceparator {
  margin-top: 60px;
}
.gallery-visible {
  height: inherit !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}
</style>
