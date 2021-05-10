<template>
  <div id="bch-balance">
    <div class="col-12 text-center q-pt-lg">
      <div class="bch-menu-list">
        <ul>
          <li>
            <a href="#?"><strong>Receive</strong></a>
            <div class="divider"></div>
          </li>
          <li>
            <a href="#?" class="active"><strong>Balance</strong></a>
            <div class="divider"></div>
          </li>
          <li><a href="#?"><strong>Send</strong></a></li>
        </ul>
      </div>
      <p class="bch-amount q-my-sm q-mt-xs bch-balance"><span class="numeric">{{ BCHBalance }}</span> sat&#x20BF; ~ <span class="numeric">{{ fiat }}</span> USD</p>
      <!-- <p class="bch-amount q-my-none">~ X.YZ fiat</p> -->
    </div>
  </div>
</template>

<script>
import server from '../../utils/getAPIServer.js'
import checkBCHBalance from '../../utils/check_bchbalance.js'
import { satoshisToFiat } from 'bitcoin-conversion'

export default {
  data () {
    return {
      satBalance: null,
      fiat: null
    }
  },
  computed: {
    BCHBalance () {
      return server.bchjs.BitcoinCash.toSatoshi(server.bchjs.BitcoinCash.toBitcoinCash(Number(this.satBalance)))
    }
  },
  async created () {
    console.log('BCH Add: ', localStorage.getItem('bchAddress'))
    checkBCHBalance(localStorage.getItem('bchAddress')).then(response => {
      console.log('Success: ', response)
      this.satBalance = Number(response.balance.confirmed) + Number(response.balance.unconfirmed)
      // convert satoshi to {fiat}
      satoshisToFiat(this.satBalance, 'USD')
        .then(res => {
          console.log('Conversion: ', res)
          this.fiat = res
        })
    }).catch(error => {
      console.log('Failed: ', error)
    })
  }
}
</script>

<style>
.numeric {
  font-family: Monospace;
}
.active {
  color: #0e3247 !important;
  font-family: PurelyPeer-Bold;
}
.bch-balance {
  color: #7F7F7F;
  font-size: 14px;
}
#bch-balance {
  width: 100%;
}
.bch-menu-list ul {
  display: block;
  list-style: none;
  height: 30px;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: center;
}
.bch-menu-list ul li {
  position: relative;
  display: inline-block;
  line-height: 24px;
}
.bch-menu-list ul li a {
  display: block;
  color: #7F7F7F;
  text-align: center;
  text-decoration: none;
  padding: 4px 26px 2px 26px;
  font-size: 15px;
  width: 100%;
}
.divider {
  position: absolute;
  height: 14px;
  border-left: 2px solid #54796F;
  right: -.45px;
  top: 6px;
  z-index: 11;
}
</style>
