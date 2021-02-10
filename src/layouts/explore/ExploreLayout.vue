<template>
	<div>
		<Navbar />
	    <router-view/>
	</div>
</template>

<script>
import Navbar from '../../components/Navbar.vue'

export default {
	data() {
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
	font-familly: PurelyPeer;
	src: url('../../assets/default_fonts/Comfortaa-VariableFont_wght.ttf') format('truetype');

}
body {
	font-family: PurelyPeer;
}
</style>