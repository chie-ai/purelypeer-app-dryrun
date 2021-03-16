<template>
	<div>
		<Navbar />
		<BchWalletBalance />
	    <router-view/>
	</div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'
import BchWalletBalance from '../../components/explore/BchWalletBalance.vue'

export default {
	data() {
		return {
		}
	},
	components: {
		Navbar,
		BchWalletBalance
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