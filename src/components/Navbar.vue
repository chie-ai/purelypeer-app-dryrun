<template>
  <div class="wrapper">
    <AppLogo />
    <div id="menu">
      <ul>
        <li><router-link to="/" class="fs-2" :class="$route.path === '/' ? 'active' : ''">&#128220;</router-link></li>
        <li><router-link to="/cash-drop" class="fs-2" :class="$route.path === '/cash-drop' ? 'active' : ''">&#128167;</router-link></li>
        <li><router-link to="/collect" class="fs-2" :class="$route.path === '/collect' ? 'active' : ''">&#128176;</router-link></li>
        <li><router-link to="/setting" class="fs-2" :class="$route.path === '/setting' ? 'active' : ''">&#9881;</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
import AppLogo from '../components/AppLogo.vue'

export default {
  data() {
    return {}
  },
  components: {
    AppLogo
  }
}
</script>

<style scoped>
</style>