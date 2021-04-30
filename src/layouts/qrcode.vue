<template>
  <div>
    <qr-code :text="address" color="#404543" :size="220" error-level="H" class="seed-phrase q-mt-none"></qr-code>
  </div>
</template>

<script>

export default {
  data () {
    return {
      address: null
    }
  },
  mounted () {
    this.address = localStorage.getItem('bchAddress')
  }
}
</script>
