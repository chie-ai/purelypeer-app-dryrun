<template>
	<div id="quest-map" class="q-mx-xs">
		<div class="col-12 quest-scrollable">
			<h4 class="text-center q-my-lg">QUESTS</h4>

			<div class="row">
				<div class="col-12 q-px-md">
					<table style="width: 100%">
						<tbody class="quest-table">
							<tr class="quest-row">
								<td>Quest 1</td>
								<td class="text-right">
								  <q-btn-group push>
							      <q-btn push color="teal" label="Play" />
							      <q-btn push color="teal" label="Show on map" />
							      </q-btn-group>
							  	</td>
							</tr>
							<tr class="quest-row">
								<td>Quest 2</td>
								<td class="text-right">
								  <q-btn-group push>
							      <q-btn push color="teal" label="Play" />
							      <q-btn push color="teal" label="Show on map" />
							      </q-btn-group>
							  	</td>
							</tr>
							<tr class="quest-row">
								<td>Quest 3</td>
								<td class="text-right">
								  <q-btn-group push>
							      <q-btn push color="teal" label="Play" />
							      <q-btn push color="teal" label="Show on map" />
							      </q-btn-group>
							  	</td>
							</tr>
							<tr class="quest-row">
								<td>Quest 4</td>
								<td class="text-right">
								  <q-btn-group push>
							      <q-btn push color="teal" label="Play" />
							      <q-btn push color="teal" label="Show on map" />
							      </q-btn-group>
							  	</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {}
	},
}
</script>

<style>
@font-face {
	font-familly: PurelyPeer;
	src: url('../assets/default_fonts/Comfortaa-VariableFont_wght.ttf') format('truetype');

}
h4 {
	font-family: PurelyPeer;
	color: #0AC18E;
}
#quest-map {
	height: 350px;
	width: 100%;
	border: 3px solid #B5C2BD;
	border-radius: 20px;
	background: #B5ECDD;
	box-shadow: inset 6px 6px 12px #a8dbce,
	            inset -6px -6px 12px #c2fdec;
}
.quest-scrollable {
	overflow: auto
}
table tbody.quest-table tr.quest-row {
	margin: 0px !important;
	border: 1px solid green !important;
}
</style>