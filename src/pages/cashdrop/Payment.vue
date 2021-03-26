<template>
	<div class="row animate-in-load">
		<PaymentMap />
		<Payment />
	</div>
</template>

<script>
import PaymentMap from '../../components/cashdrop/PaymentMap.vue'
import Payment from '../../components/cashdrop/Payment.vue'

export default {
	data () {
		return {}
	},
	components: {
		PaymentMap,
		Payment
	}
}
</script>