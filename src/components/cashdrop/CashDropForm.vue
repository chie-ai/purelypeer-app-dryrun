<template>
	<div id="quest-list" class="q-mx-xs">
		<div class="col-12 quest-container">
			<h5 class="text-center q-mt-lg q-mb-sm q-mx-lg">Add your tokens to the map!</h5>


			<div class="q-mx-md q-mt-md">
				<div class="row justify-center">
					<div class="col-10">
						<q-form
					      class="q-gutter-y-sm"
					    >
							<q-input color="grey-5" dense="true" bg-color="white" outlined label="Merchant Name" />
							<q-input color="grey-5" dense="true" bg-color="white" outlined label="Phone number" />
							<q-input color="grey-5" dense="true" bg-color="white" outlined label="Contact URL" />
							<q-input color="grey-5" dense="true" bg-color="white" outlined label="Custom field" />
							<q-btn label="Submit" type="submit" class="full-width" color="primary"/>
						</q-form>
					</div>
				</div>
			</div>

			<div class="q-mx-md q-mt-lg">
				<div class="row justify-center">
					<div class="col-10">
						<q-input color="grey-5" bg-color="white" outlined label="Search. . .">
					        <template v-slot:append>
					          <q-icon name="search" />
					        </template>
					    </q-input>
					</div>
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
	font-family: PurelyPeer-Regular;
	src: url(../../assets/static/Comfortaa-Regular.ttf) format('truetype');
}
@font-face {
	font-family: PurelyPeer-Bold;
	src: url(../../assets/static/Comfortaa-Bold.ttf) format('truetype');
}
h5 {
	font-family: PurelyPeer-Bold;
	color: #0AC18E;
}
p {
	font-family: PurelyPeer-Regular;
	color: #175477;
}
#quest-list {
	height: 420px;
	width: 100%;
	border: 3px solid #B5C2BD;
	border-radius: 20px;
	background: #B5ECDD;
	box-shadow: inset 6px 6px 12px #a8dbce,
	            inset -6px -6px 12px #c2fdec;
}
.quest-container {
}
table tbody.quest-table tr.quest-row {
	margin: 0px !important;
	border: 1px solid green !important;
}
</style>