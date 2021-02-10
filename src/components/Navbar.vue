<template>
  <div class="wrapper">
    <AppLogo />
    <div id="menu" class="q-mt-xs q-mr-xs">
      <ul>
        <li><a href="#?" class="fs-2 active">📜</a></li>
        <li><a href="#?" class="fs-2">💧</a></li>
        <li><a href="#?" class="fs-2">💰</a></li>
        <li><a href="#?" class="fs-2 color-b">⚙</a></li>
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

<style lang="scss">
.wrapper {
    display: flex;
    width: 100%;
    margin: auto;
    align-items: stretch;
}
#menu {
  width: 100%;
  border-radius: 10px;
  background: #0AC18E;
  box-shadow: inset 6px 6px 12px #09b384,
              inset -6px -6px 12px #0bcf98;
}
#menu ul {
  display: inline-block;
  list-style: none;
  height: 60px;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: center
}
#menu ul li {
  display: inline-block;
  margin: -4px;
  padding: 4px 0 0 4px;
  text-align: center;
}
#menu ul li a {
  display: block;
  height: 60px;
  color: #fff;
  padding: 12px 20px 0 20px;
  text-decoration: none;
}
#menu ul li a.active {
  background: #0AAB7E;
}
.fs-2 {
  font-size: 24px;
}
.color-b {
  color: #fff;
}
</style>