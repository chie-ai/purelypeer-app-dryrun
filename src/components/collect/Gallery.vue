<template>
  <div class="full-width q-px-md q-py-md">
    <q-card ref="galleryListCard">
      <q-card-section ref="questCardHeader">
        <div class="text-h6 quest-caption">
          Gallery
          <q-btn color="white" @click="toggleGalleryList" style="position: absolute; right: 16px; top: 14px" rounded :dense="true" text-color="black" :icon="questExpanderIcon" />
        </div>
      </q-card-section>
      <q-separator ref="cardSeparator" />
      <q-card-section class="q-pa-none q-px-md q-py-md shadow-4">
        <div class="q-px-none q-mb-sm">
          <q-btn :label="'Battle \u2694\uFE0F'" disable outline class="full-width q-mx-lg"/>
        </div>
        <div class="gallery-list" ref="galleryList">
          <div class="row justify-center">
            <div class="q-pa-sm">
              <div class="gallery-collectibles text-center shadow-2" style="background: #0E3247">
                <p class="text-h4 q-my-none">&#10084;&#x1F451;</p>
                <p class="text-h4 q-my-none">&#x1F34C;&#x1F43B;</p>
              </div>
            </div>
            <div class="q-pa-sm" v-for="(thumb, index) in thumbnail" :key="index">
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
      thumbnail: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  methods: {
    toggleGalleryList () {
      const expander = this.$refs.galleryListCard.$el.classList.contains('card-expander')
      this.$refs.galleryListCard.$el.classList.toggle('card-expander')
      this.$refs.galleryListCard.$el.classList.toggle('no-shadow')
      this.questExpanderIcon = expander ? 'mdi-arrow-collapse-all' : 'mdi-arrow-expand-all'
      this.$refs.questCardHeader.$el.classList.toggle('card-header')
      this.$refs.cardSeparator.$el.classList.toggle('card-ceparator')
      const screenHeight = screen.height
      const newHeight = screenHeight - 61

      this.$refs.galleryList.setAttribute('style', 'min-height: ' + (newHeight - 90) + 'px !important')
    }
    // toggleCollectibles (index) {
    //   // this.$refs.questListCard.$el.classList.contains('card-expander') ? undefned : this.toggleGalleryList()
    //   const els = document.getElementsByClassName('gallery-collectibles')
    //   for (let i = 0; els.length > i; i++) {
    //     if (i !== index) {
    //       els[i].classList.add('hidden')
    //     }
    //   }

    //   const screenHeight = screen.height
    //   const newHeight = screenHeight - 61

    //   this.$refs.questMain.setAttribute('style', 'min-height: ' + (newHeight - 90) + 'px !important')
    //   els[index].classList.add('active-thumbnail')
    //   els[index].setAttribute('style', 'min-height: ' + (newHeight - 90) + 'px !important')
    // }
  }
}
</script>

<style>
.gallery-collectibles {
  display: table-cell;
  height: 170px !important;
  width: 170px !important;
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
}
.gallery-list {
  position: relative;
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
</style>
