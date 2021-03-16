<template>
	<div id="setting">
		<div class="col-12 text-center">
			<h5 class="text-white setting-caption q-mt-md q-mb-sm">Setting</h5>

			<q-btn-group>
		      <q-btn color="notify-purelypeer" label="Load" />
		      <q-btn color="notify-purelypeer" label="Receive" />
		      <q-btn color="notify-purelypeer" label="Send" />
		      <q-btn color="notify-purelypeer" label="History" />
		    </q-btn-group>
		</div>
	</div>
</template>

<script>

export default {
	data () {
		return {}
	},
}
</script>

<style scoped>

.bg-notify-purelypeer {
	background-color: #0AC18E;
}
</style>