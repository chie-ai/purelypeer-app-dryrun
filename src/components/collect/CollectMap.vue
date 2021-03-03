<template>
	<div id="collect-map" class="row">
		<div class="col-12" style="position: relative;">

			<GmapMap ref="mapRef" :center="coordinates" :zoom="zoomScale"
			  :options="{
			   styles: mapCustomStyle.styles, draggableCursor: true, gestureHandling: 'greedy',
			   zoomControl: false, mapTypeControl: false, scaleControl: false, streetViewControl: false,
			   rotateControl: false, fullscreenControl: false, disableDefaultUI: false }"
			   @center_changed="removeWindowInfo" map-type-id="roadmap" class="map-layout"
			   @click="removeWindowInfo"
			>

				<GmapCircle
				    v-for="(pin, index) in quest"
				    :key="index"
				    :center="pin.coordinates"
				    :radius="pin.questRadius"
				    :options="{ strokeColor: '#0AC18E', strokeOpacity: 0.5, strokeWeight: 2, fillColor:'white', fillOpacity: 0, visible: pin.radiusVisibility }">
				</GmapCircle>

				<GmapInfoWindow
					v-for="(info, infoIndex) in quest" :key="infoIndex+'windowinfo'"
					:options="{
								content: '<div>\
											<p><strong>Quest Info</strong></p>\
											<span><strong>Merchant: </strong>'+info.merchant+'</span><br/>\
											<span><strong>Quest Name: </strong>'+info.questName+'</span><br/>\
											<span><strong>Level: </strong>'+(info.level).charAt(0).toUpperCase()+(info.level).slice(1)+'</span><br/>\
											<span><strong>Cash Drop Count: </strong>'+info.cashDropCount+'</span><br/>\
											<span><strong>PurelyPeer Tier: </strong>'+info.tier+'</span>\
										</div>',
								pixelOffset: {
									width: 12,
									height: -25
								},
								disableAutoPan: true,
								minWidth: 300
					}"
					:position="info.coordinates"
					:opened="info.infoWinOpen"
					@closeclick="toggleWindowInfo(infoIndex)">
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
							url: (mark.questStatus === 'active' ? (mark.level === 'upcoming' ? 'PurelyPeer-location-blue.png' : (mark.level === 'direct' ? 'PurelyPeer-location-green.png' : 'PurelyPeer-location-orange.png')) : 'PurelyPeer-icon-black.png'),

							scaledSize: google && new google.maps.Size((mark.questStatus === 'active' ? 30 : 50), (mark.questStatus === 'active' ? 40 : 50)),

							anchor: google && new google.maps.Point((mark.questStatus === 'active' ? 1 : 12), (mark.questStatus === 'active' ? 40 : 44))
							}"
				    :position="google && new google.maps.LatLng(mark.coordinates)"
				    @click="toggleWindowInfo(markerIndex)" />

				<GmapMarker ref="cashDrops" v-for="(cashDropCoor, cashDropsIndex) in cashDropsCoordinates"
					:icon="{
							url: 'PurelyPeer-location-current-B.png',
							scaledSize: google && new google.maps.Size(30, 30),
							anchor: google && new google.maps.Point(40, 54)}"
				    :position="google && new google.maps.LatLng(cashDropCoor)" />

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
					merchant: "Jollibee",
					questName: "Star Card Collection",
					cashDropCount: "10",
					price: "Mug",
					phoneNumber: "###-###-####",
					contactUrl: "www.facebook.com/merchant-contact",
					tier: "\u2764\uFE0F\uD83D\uDCAF",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					radius: "\u2B55\uD83D\uDCAF",
					coordinates: {
						lat: 11.17783410449158,
						lng: 125.0017081909703
					},
					cashDropsCoordinates: [
						{
							lat: 11.170425256142286,
							lng: 125.00371409774162
						},
						{
							lat: 11.170225256142286,
							lng: 125.00471409774162
						},
						{
							lat: 11.170525256142286,
							lng: 125.00171409774162
						}
					],
					questRadius: 1900,
					questStatus: "active",
					level: 'upcoming',
					infoWinOpen: false,
					radiusVisibility: false
				},
				{
					merchant: "McDonalds",
					questName: "Half Moon Card Collection",
					cashDropCount: "14",
					price: "Spaghetti",
					phoneNumber: "###-###-####",
					contactUrl: "www.facebook.com/merchant-contact",
					tier: "\u2764\uFE0F\uD83D\uDCAF",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					radius: "\u2B55\uD83D\uDCAF",
					coordinates: {
						lat: 11.176572907648463,
						lng: 125.00093244003742
					},
					cashDropsCoordinates: [
						{
							lat: 11.170425256142286,
							lng: 125.00071409774162
						},
						{
							lat: 11.170225256142286,
							lng: 125.00071409774162
						},
						{
							lat: 11.170525256142286,
							lng: 125.00071409774162
						}
					],
					questRadius: 1000,
					questStatus: "active",
					level: 'direct',
					infoWinOpen: false,
					radiusVisibility: false
				},
				{
					merchant: "J & F Department Store Palo",
					questName: "Sale Card Collection",
					cashDropCount: "20",
					price: "50% less to all items",
					phoneNumber: "###-###-####",
					contactUrl: "www.facebook.com/merchant-contact",
					tier: "\u2764\uFE0F\uD83D\uDCAF",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					radius: "\u2B55\uD83D\uDCAF",
					coordinates: {
						lat: 11.180325256142286,
						lng: 125.00271409774162
					},
					cashDropsCoordinates: [
						{
							lat: 11.180425256142286,
							lng: 125.00371409774162
						},
						{
							lat: 11.180225256142286,
							lng: 125.00471409774162
						},
						{
							lat: 11.180525256142286,
							lng: 125.00171409774162
						}
					],
					questRadius: 1300,
					questStatus: "active",
					level: 'indirect',
					infoWinOpen: false,
					radiusVisibility: false
				},
				{
					merchant: "Seafoods & Ribs Warehouse",
					questName: "Coupon Card Collection",
					cashDropCount: "20",
					price: "50% less to all items",
					phoneNumber: "###-###-####",
					contactUrl: "www.facebook.com/merchant-contact",
					tier: "\u2764\uFE0F\uD83D\uDCAF",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					radius: "\u2B55\uD83D\uDCAF",
					coordinates: {
						lat: 11.172492400856424,
						lng: 124.9996134948425
					},
					cashDropsCoordinates: [
						{
							lat: 11.170425256142286,
							lng: 125.99171409774162
						},
						{
							lat: 11.170225256142286,
							lng: 125.99271409774162
						},
						{
							lat: 11.170525256142286,
							lng: 125.99571409774162
						}
					],
					questRadius: 1200,
					questStatus: "inactive",
					level: 'direct',
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
			this.cashDropsCoordinates = this.quest[infoIndex].infoWinOpen === true ? this.quest[infoIndex].cashDropsCoordinates : null
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

			newHeight >= 334 ? map.$el.style.height = newHeight + 'px' : ''
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
	position: absolute;
	top: -2px;
	left: 7.5px;
	font-size: 20px !important;
}
</style>