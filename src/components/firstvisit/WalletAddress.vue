<template>
	<div id="wallet-address">
		<div class="text-center">
			Hello this is your generated BCH Address
			<qr-code :text="addresses" color="#0AC18E" class="text-center" :size="220" error-level="H"></qr-code>
		</div>
	</div>
</template>

<script>

export default {
	data () {
		return {
			addresses: null
		}
	},
	created () {
		this.addresses = localStorage.getItem("bch")
		console.log('BCH address: ', this.addresses)
	}
}
</script>