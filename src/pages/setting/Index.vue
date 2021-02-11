<template>
	<div class="row">
		<BchWalletBalance />
		<Setting />
	</div>
</template>

<script>
import BchWalletBalance from '../../components/explore/BchWalletBalance.vue'
import Setting from '../../components/setting/Setting.vue'

export default {
	components: {
		BchWalletBalance,
		Setting
	}
}
</script>

<style lang="scss">
</style>