<template>
	<div id="collect-map" class="row">
		<div class="col-12" style="position: relative;">

			<GmapMap ref="mapRef" :center="coordinates" :zoom="zoomScale"
			  :options="{
			   styles: mapCustomStyle.styles, draggableCursor: true, gestureHandling: 'greedy',
			   zoomControl: false, mapTypeControl: false, scaleControl: false, streetViewControl: false,
			   rotateControl: false, fullscreenControl: false, disableDefaultUI: false }"
			   @center_changed="removeWindowInfo" map-type-id="roadmap" class="map-layout"
			   @click="removeWindowInfo" >

				<GmapCircle
				    v-for="(pin, index) in quest"
				    :key="index"
				    :center="pin.coors"
				    :radius="pin.radius"
				    :options="{ strokeColor: '#0AC18E', strokeOpacity: 0.5, strokeWeight: 2, fillColor:'white', fillOpacity: 0, visible: pin.radiusVisibility }">
				</GmapCircle>

				<GmapInfoWindow
					v-for="(info, infoIndex) in quest" :key="infoIndex+'windowinfo'"
					:options="{
								pixelOffset: {
									width: 12,
									height: -25
								},
								disableAutoPan: true,
								minWidth: 300
					}"
					:position="info.coors"
					:opened="info.infoWinOpen"
					@closeclick="toggleWindowInfo(infoIndex)">
					<div class="infowindow">
						<p class="text-h6 info-header"><strong>Quest Info</strong></p>
						<p class="q-my-sm"><strong>Quest Name: </strong>{{ info.name }}</p>
						<p class="q-my-sm"><strong>PurelyPeer Tier: </strong>{{ (info.acceptance_tier).charAt(0).toUpperCase()+(info.acceptance_tier).slice(1) }}</p>
						<p class="q-my-sm"><strong>Remaining Cash Drop: </strong>{{ info.cashdrops_remaining }}</p>
						<p class="q-my-sm"><strong>Cash Drop Count: </strong>{{ info.total_cashdrops }}</p>
					</div>
				</GmapInfoWindow>

				<GmapMarker ref="userLocation"
					:icon="{
							url: 'PurelyPeer-location-current-A.png',
							scaledSize: google && new google.maps.Size(80, 80),
							anchor: google && new google.maps.Point(40, 54)}"
				    :position="google && new google.maps.LatLng(mapCoordinates)"
				    :visible="isLocationShared ? true : false" />

				<GmapMarker v-for="(mark, markerIndex) in quest" :key="markerIndex+'marker'"
					:icon="{
							url: (mark.active === 'active' ? (mark.acceptance_tier === 'upcoming' ? 'PurelyPeer-location-blue.png' : (mark.acceptance_tier === 'direct' ? 'PurelyPeer-location-green.png' : 'PurelyPeer-location-orange.png')) : 'PurelyPeer-icon-black.png'),

							scaledSize: google && new google.maps.Size((mark.active === 'active' ? 30 : 50), (mark.active === 'active' ? 40 : 50)),

							anchor: google && new google.maps.Point((mark.active === 'active' ? 1 : 12), (mark.active === 'active' ? 40 : 44))
							}"
				    :position="google && new google.maps.LatLng(mark.coors)"
				    @click="toggleWindowInfo(markerIndex)" />

				<GmapMarker ref="cashDrops" v-for="(cashDropCoor, cashDropsIndex) in cashDropsCoordinates"
					:icon="{
							url: 'PurelyPeer-location-current-B.png',
							scaledSize: google && new google.maps.Size(30, 30),
							anchor: google && new google.maps.Point(40, 54)}"
				    :position="google && new google.maps.LatLng(cashDropCoor.coors)" />

			</GmapMap>
			<!-- <p>{{ mapCoordinates.lat }} Latitude, {{ mapCoordinates.lng }}, Longitude</p> -->
		</div>
		<div class="adjust-map-height">
			<button class="btn-google-maps-resizer" v-touch-pan.vertical.prevent.mouse="resizeMapHeight"><i class="mdi mdi-arrow-split-horizontal text-h4 resize-controller" ></i></button>
		</div>
	</div>
</template>

<script>
import { gmapApi } from 'gmap-vue'

export default {
	data () {
		return {
			cashDropsCoordinates: null,
			zoomScale: 13,
		    quest: [
				{
					name: "Star Card Collection",
					total_cashdrops: 10,
					cashdrops_remaining: 10,
					phone_no: null,
					contact_url: "www.facebook.com/merchant-contact",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					coors: {
						lat: 11.17783410449158,
						lng: 125.0017081909703
					},
					cashdrops: [
						{
							coors: {
								lat: 11.170425256142286,
								lng: 125.00371409774162
							}
						},
						{
							coors: {
								lat: 11.170225256142286,
								lng: 125.00471409774162
							}
						},
						{
							coors: {
								lat: 11.170525256142286,
								lng: 125.00171409774162
							}
						}
					],
					radius: 1900,
					active: "active",
					acceptance_tier: 'upcoming',
					infoWinOpen: false,
					radiusVisibility: false
				},
				{
					name: "Half Moon Card Collection",
					total_cashdrops: 10,
					cashdrops_remaining: 10,
					phone_no: null,
					contact_url: "www.facebook.com/merchant-contact",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					coors: {
						lat: 11.176572907648463,
						lng: 125.00093244003742
					},
					cashdrops: [
						{
							coors: {
								lat: 11.170425256142286,
								lng: 125.00071409774162
							}
						},
						{
							coors: {
								lat: 11.170225256142286,
								lng: 125.00071409774162
							}
						},
						{
							coors: {
								lat: 11.170525256142286,
								lng: 125.00071409774162
							}
						}
					],
					radius: 1000,
					active: "active",
					acceptance_tier: 'direct',
					infoWinOpen: false,
					radiusVisibility: false
				},
				{
					name: "Sale Card Collection",
					total_cashdrops: 10,
					cashdrops_remaining: 10,
					price: "50% less to all items",
					phone_no: null,
					contact_url: "www.facebook.com/merchant-contact",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					coors: {
						lat: 11.180325256142286,
						lng: 125.00271409774162
					},
					cashdrops: [
						{
							coors: {
								lat: 11.180425256142286,
								lng: 125.00371409774162
							}
						},
						{
							coors: {
								lat: 11.180225256142286,
								lng: 125.00471409774162
							}
						},
						{
							coors: {
								lat: 11.180525256142286,
								lng: 125.00171409774162
							}
						}
					],
					radius: 1300,
					active: "active",
					acceptance_tier: 'indirect',
					infoWinOpen: false,
					radiusVisibility: false
				},
				{
					name: "Coupon Card Collection",
					total_cashdrops: 10,
					cashdrops_remaining: 10,
					price: "50% less to all items",
					phone_no: null,
					contact_url: "www.facebook.com/merchant-contact",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					coors: {
						lat: 11.172492400856424,
						lng: 124.9996134948425
					},
					cashdrops: [
						{
							coors: {
								lat: 11.170425256142286,
								lng: 125.99171409774162
							}
						},
						{
							coors: {
								lat: 11.170225256142286,
								lng: 125.99271409774162
							}
						},
						{
							coors: {
								lat: 11.170525256142286,
								lng: 125.99571409774162
							}
						}
					],
					radius: 1200,
					active: "inactive",
					acceptance_tier: 'direct',
					infoWinOpen: false,
					radiusVisibility: false
				}
		    ],
			coordinates: {
				lat: 0,
				lng: 0
			},
        	mapCustomStyle: {
				styles: [
				    { elementType: "labels.icon", stylers: [{ color: "#A6ACAF" }]},
				    { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#A3A3A3" }] },
				    { featureType: "landscape", elementType: "labels.text.fill", stylers: [{ color: "#939393" }] },
				    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
				    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
				    { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
				    { featureType: "road", elementType: "geometry", stylers: [{ color: "#F4F6F7" }] },
				    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9B9A9A" }] },
				    { featureType: "road.highway", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
				    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#D7DBDD" }] },
				    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#2980B9" }] },
				]
			},
			mapHeight: null,
			startY: null,
			counter: 0,
			map: null,
			activeIndex: 0,
			isLocationShared: false
		}
	},
	computed: {
	    google: gmapApi,
	    mapCoordinates () {
	    	if(!this.map) {
	    		return {
	    			lat: 0,
	    			lng: 0
	    		}
	    	}

	    	return {
	    		lat: this.map.getCenter().lat(),
	    		lng: this.map.getCenter().lng()
	    	}
	    },
	},
	methods: {
		removeWindowInfo () {
			this.quest[this.activeIndex].infoWinOpen = false
			this.quest[this.activeIndex].radiusVisibility = false
			this.cashDropsCoordinates = null
		},
		toggleWindowInfo (infoIndex) {
			this.activeIndex !== infoIndex ? this.quest[this.activeIndex].infoWinOpen = false : ''
			this.activeIndex !== infoIndex ? this.quest[this.activeIndex].radiusVisibility = false : ''
			this.quest[infoIndex].infoWinOpen = !this.quest[infoIndex].infoWinOpen
			this.quest[infoIndex].radiusVisibility = !this.quest[infoIndex].radiusVisibility
			this.cashDropsCoordinates = this.quest[infoIndex].infoWinOpen === true ? this.quest[infoIndex].cashdrops : null
			this.activeIndex = infoIndex
		},
		resizeMapHeight ({ evt, ...info }) {
			let map = this.$refs.mapRef.$el

		    if(this.counter == 0) {
				this.mapHeight = parseInt(document.defaultView.getComputedStyle(map).height, 10);
		    	this.startY = (evt.type !== 'mousemove' ? Math.round(evt.changedTouches[0].screenY) : Math.round(evt.clientY))
		    }
		    if (!info.isFinal) {
		    	this.counter++
		    } else {
		    	this.counter = 0
		    }
			this.doResize(event)
	    },
		doResize (e) {
			let map = this.$refs.mapRef
			let newHeight = this.mapHeight + (e.type !== 'mousemove' ? e.changedTouches[0].screenY : e.clientY) - this.startY
			let min_MapHeight = 334

			if (((80/100) * window.innerHeight) >= newHeight) {
				newHeight >= min_MapHeight ? map.$el.style.height = newHeight + 'px' : ''
			}
		},
	},
	created () {
		this.$getLocation({})
		.then(coordinates => {
			this.coordinates = coordinates
			this.isLocationShared = true
		})
		.catch(function(error) {
			// this.$router.push({ name: '/' })
			console.log('Unable to retreive your location: ', error)
		})
	},
	mounted () {
		let el = document.createElement('div')
		el.classList.add('q-mt-md')
		el.style.position = "absolute"
		el.style.zIndex = "20"
		el.style.width =  "100%"
		el.style.textAlign = "center"

		let elSpan1 = document.createElement('span')
		elSpan1.classList.add('q-mr-xs')
		elSpan1.style.fontSize = "28px"
		elSpan1.style.cursor = "pointer"
		elSpan1.appendChild(document.createTextNode('\u23EB'))
		elSpan1.addEventListener("click", () => {
			this.zoomScale++
		})

		let elSpan2 = document.createElement('span')
		elSpan2.classList.add('q-ml-xs')
		elSpan2.style.fontSize = "28px"
		elSpan2.style.cursor = "pointer"
		elSpan2.appendChild(document.createTextNode('\u23EC'))
		elSpan2.addEventListener("click", () => {
			this.zoomScale--
		})

		el.appendChild(elSpan1)
		el.appendChild(elSpan2)

		let el2 = document.getElementsByClassName('vue-map')

	    this.$refs.mapRef.$mapPromise.then((map) => {
	    	this.map = map
			setTimeout(() => {
				el2[0].firstChild.firstChild.prepend(el)
			}, 3000)
	    })
	}
}
</script>

<style scoped>
.adjust-map-height {
	position: absolute;
	text-align: center;
	bottom: -17px;
	width: 100%;
	z-index: 2 !important;
}
.resize-controller {
	cursor: pointer;
	color: 
}
.btn-google-maps-resizer {
	position: relative;
	height: 35px;
	width: 35px;
	padding: 0;
	border-radius: 100%;
	border: none;
	color: #fff;
	background: #0AC18E;
	outline: none;
	box-shadow: inset -6px -6px 12px #09ae80,
            inset 6px 6px 12px #0bd49c;
}
.btn-google-maps-resizer i {
	/*position: absolute;
	top: -2px;
	left: 7.5px;*/
	font-size: 20px !important;
}
.infowindow p {
	color: #676767;
}
</style>