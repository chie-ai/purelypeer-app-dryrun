<template>
	<div id="bch-balance" class="q-mx-xs">
		<div class="col-12 text-center">
			<h5 class="text-white q-mt-md q-mb-sm">BCH Balance</h5>
			<p class="text-white q-my-xs">0</p>
			<p class="text-white q-my-none">USD</p>
		</div>
	</div>
</template>

<script>

export default {}
</script>

<style>
@font-face {
	font-family: PurelyPeer-Bold;
	src: url(../../assets/static/Comfortaa-Bold.ttf) format('truetype');
}
#bch-balance {
	height: 114px;
	width: 100%;
	border-radius: 10px;
	background: #0AC18E;
	box-shadow: inset 6px 6px 12px #09b283,
	            inset -6px -6px 12px #0bd099;
}
h5 {
	font-family: PurelyPeer-Bold
}
</style>