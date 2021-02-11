<template>
	<div id="quest-list" class="q-mx-xs">
		<div class="col-12 quest-container">
			<h4 class="text-center q-mt-lg q-mb-sm">QUESTS</h4>

			<div class="quest-main q-mx-md">
				<div class="column quest-body">
					<div class="col-4 q-py-md quest-list">
						<div class="row">
							<div class="col-12 text-center">
								<p class="q-mb-sm">Free one cup of coffee</p>
							</div>
							<div class="col-12 text-center q-gutter-xs">
								<q-btn size="sm" color="teal" label="Play" />
								<q-btn size="sm" color="teal" label="Show on map" />
							</div>
						</div>
					</div>
					<div class="col-4 q-py-md quest-list">
						<div class="row">
							<div class="col-12 text-center">
								<p class="q-mb-sm">Free mug</p>
							</div>
							<div class="col-12 text-center q-gutter-xs">
								<q-btn size="sm" color="teal" label="Play" />
								<q-btn size="sm" color="teal" label="Show on map" />
							</div>
						</div>
					</div>
					<div class="col-4 q-py-md quest-list">
						<div class="row">
							<div class="col-12 text-center">
								<p class="q-mb-sm">Secret Item</p>
							</div>
							<div class="col-12 text-center q-gutter-xs">
								<q-btn size="sm" color="teal" label="Play" />
								<q-btn size="sm" color="teal" label="Show on map" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="ratio-option" class="q-mt-md">
			    <ul>
			        <li><a href="#?" class="fs-2">🕺</a></li>
			        <li><a href="#?" class="fs-2">♿</a></li>
			        <li><a href="#?" class="fs-2">💃</a></li>
			        <li><a href="#?" class="fs-2 color-b">🏙️</a></li>
			        <li><a href="#?" class="fs-2">🛣</a></li>
			        <li><a href="#?" class="fs-2 color-b">🌐</a></li>
			    </ul>
			</div>
			<div class="q-mx-md">
				<div class="row justify-center">
					<div class="col-10">
						<q-input color="teal" bg-color="white" outlined label="Search. . .">
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
h4 {
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
.quest-main {
	height: 200px;
	overflow: auto;
	border-top: 1px solid #B2B2B2;
	border-bottom: 1px solid #B2B2B2;
}
.quest-list {
	border-bottom: 1px solid #B2B2B2;
}
#ratio-option ul {
  display: inline-block;
  list-style: none;
  height: 60px;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: center
}
#ratio-option ul li {
  display: inline-block;
  margin: -4px;
  padding: 4px 0 0 4px;
  text-align: center;
}
#ratio-option ul li a {
  display: block;
  height: 60px;
  color: #fff;
  padding: 12px 12px 0 12px;
  text-decoration: none;
}
</style>