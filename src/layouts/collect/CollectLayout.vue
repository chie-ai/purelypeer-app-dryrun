<template>
  <div>
    <Navbar />
      <router-view/>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    Navbar
  }
}
</script>

<style>
@font-face {
  font-family: PurelyPeer-Regular;
  src: url(../../assets/static/Comfortaa-Regular.ttf) format('truetype');

}
body {
  font-family: PurelyPeer-Regular;
}
</style>
