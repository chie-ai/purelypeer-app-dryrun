<template>
  <div class="row animate-in-load">
    <CollectMap :move-to-the-quest-coordinates="coordinates" />
    <!-- <Gallery v-on:moveToTheQuestCoordinates="questCoordinates" /> -->
  </div>
</template>

<script>
import CollectMap from '../../components/collect/CollectMap.vue'
import Gallery from '../../components/collect/Gallery.vue'

export default {
  data () {
    return {
      coordinates: null
    }
  },
  components: {
    CollectMap,
    Gallery
  },
  methods: {
    questCoordinates (coordinates) {
      this.coordinates = coordinates
    }
  },
}
</script>

<style lang="scss">
</style>