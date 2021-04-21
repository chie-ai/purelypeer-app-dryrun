<template>
  <div id="bch-balance">
    <div class="col-12 text-center q-pt-lg">
      <div class="bch-menu-list">
        <ul>
          <li>
            <a href="#?">Receive</a>
            <div class="divider"></div>
          </li>
          <li>
            <a href="#?">Balance</a>
            <div class="divider"></div>
          </li>
          <li><a href="#?">Send</a></li>
        </ul>
      </div>
      <p class="bch-amount q-my-sm q-mt-sm" style="color: #6C9E91; font-weight: bolder;"><span style="font-family: Monospace;">{{ BCHBalance }}</span> BCH</p>
      <!-- <p class="bch-amount q-my-none">~ X.YZ fiat</p> -->
    </div>
  </div>
</template>

<script>
import bchjs from '../../utils/getAPIServer.js'
import checkBCHBalance from '../../utils/check_bchbalance.js'

export default {
  data () {
    return {
      balance: null
    }
  },
  computed: {
    BCHBalance () {
      return bchjs.bchjs.BitcoinCash.toBitcoinCash(Number(this.balance))
    }
  },
  created () {
    console.log('BCH Add: ', localStorage.getItem('bchAddress'))
    checkBCHBalance(localStorage.getItem('bchAddress')).then(response => {
      console.log('Success: ', response)
      // this.balance = Number((response.balance.confirmed).toFixed(4)).toLocaleString(undefined, { minimumFractionDigits: 2 })
      this.balance = response.balance.confirmed
    }).catch(error => {
      console.log('Failed: ', error)
    })
  }
}
</script>

<style>
</style>
