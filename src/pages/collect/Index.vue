<template>
  <div class="row">
    <CollectMap :move-to-the-quest-coordinates="coordinates" v-on:routeStatus="updateRouteStatus" />
    <Gallery v-on:moveToTheQuestCoordinates="questCoordinates" />
  </div>
</template>

<script>
import CollectMap from '../../components/collect/CollectMap.vue'
import Gallery from '../../components/collect/Gallery.vue'

export default {
  data () {
    return {
      coordinates: null,
      routable: true
    }
  },
  components: {
    CollectMap,
    Gallery
  },
  methods: {
    questCoordinates (coordinates) {
      this.coordinates = coordinates
    },
    updateRouteStatus (status) {
      this.routable = status
    }
  },
  beforeRouteLeave (to, from, next) {
    this.routable ? next() : next(false)
  }
}
</script>

<style lang="scss">
</style>
