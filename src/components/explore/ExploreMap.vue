<template>
	<q-layout>
		<q-page-container>
			<div id="explore-map" class="row">
			    <l-map
			      :zoom="zoom"
			      :center="center"
			      :options="mapOptions"
			      style="height: 334px"
			      @update:center="centerUpdate"
			      @ready="readyLocation"
			      @click="removePopUpinfo"
			      @move="removePopUpinfo"
			      ref="myPurelyPeerMap"
			    >

				    <l-tile-layer :url="url" :attribution="attribution" />

				    <l-marker :icon="icon" :lat-lng="markerLocation"></l-marker>

				    <l-marker v-for="(mark, markerIndex) in quest" :key="markerIndex+'marker'"
				    :lat-lng="mark.coors" @click="toggleWindowInfo(markerIndex)">
				    	<l-popup :options="popUpOptions" @remove="removePopUpinfo">
							<div class="infowindow">
								<p class="text-h6 info-header"><strong>Quest Info</strong></p>
								<p><strong>Quest Name: </strong>{{ mark.name }}</p>
								<p><strong>PurelyPeer Tier: </strong>{{ (mark.acceptance_tier).charAt(0).toUpperCase()+(mark.acceptance_tier).slice(1) }}</p>
								<p><strong>Remaining Cash Drop: </strong>{{ mark.cashdrops_remaining }}</p>
								<p><strong>Cash Drop Count: </strong>{{ mark.total_cashdrops }}</p>
							</div>
						</l-popup>
						<l-icon
				        	:icon-size="[mark.active === 'active' ? 30 : 50, mark.active === 'active' ? 40 : 50]"
				        	:icon-anchor="[mark.active === 'active' ? 1 : 12, mark.active === 'active' ? 40 : 44]"
				        	:icon-url="(mark.active === 'active' ? (mark.acceptance_tier === 'Upcoming' ? 'PurelyPeer-location-blue.png' : (mark.acceptance_tier === 'Direct' ? 'PurelyPeer-location-green.png' : 'PurelyPeer-location-orange.png')) : 'PurelyPeer-icon-black.png')" />
				    </l-marker>

				    <l-circle
				    	v-for="(pin, index) in quest":key="index"
					    :lat-lng="pin.coors"
					    :radius="circle.radius"
					    :color="circle.color"
					    :fillColor="circle.fillColor"
					    :weight="1"
					    :visible="pin.radiusVisibility"
					    @click="toggleWindowInfo(index)" />

			    </l-map>
			</div>
		</q-page-container>
	</q-layout>
</template>

<script>
import { latLng, icon } from "leaflet";
import { LMap, LTileLayer, LMarker, LCircle, LPopup, LIcon } from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';

export default {
	name: "Explore-map",
	components: {
	    LMap,
	    LTileLayer,
	    LMarker,
	    LCircle,
	    LPopup,
	    LIcon
	},
	data() {
	    return {
	    	zoom: 13,
	   		url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	    	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
	    	mapOptions: {
	        	zoomSnap: 0.5,
	        	closePopupOnClick: false
	    	},
	    	popUpOptions: { 
	    		autoPan: false,
	    	},
	    	center: latLng(0, 0),
	    	icon: icon({
		        iconUrl: "PurelyPeer-location-current-A.png",
		        iconSize: [80, 80],
		        iconAnchor: [40, 54]
		    }),
		    markerLocation: latLng(0, 0),
		    circle: {
		        center: [47.413220, -1.0482],
		        radius: 1500,
		        color: '#0AC18E',
		        fillColor: 'transparent'
		    },
		    quest: [
				{
					name: "Star Card Collection",
					total_cashdrops: 10,
					cashdrops_remaining: 10,
					phone_no: null,
					contact_url: "www.facebook.com/merchant-contact",
					presence: "\uD83E\uDDF1\uD83D\uDCAF",
					coors: [ 11.17783410449158, 125.0017081909703 ],
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
					acceptance_tier: 'Direct',
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
					coors: [ 11.176572907648463, 125.00093244003742 ],
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
					acceptance_tier: 'Indirect',
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
					coors: [ 11.180325256142286, 125.00271409774162 ],
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
					acceptance_tier: 'Upcoming',
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
					coors: [ 11.172492400856424, 124.9996134948425 ],
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
					acceptance_tier: 'Inactive',
					infoWinOpen: false,
					radiusVisibility: false
				}
		    ],
			activeIndex: 0,
			cashDropsCoordinates: null
		};
	},    
	methods: {
 	    centerUpdate(center) {
	      this.markerLocation = center;
	      this.circle.center = center;
	    },
	    readyLocation () {
			this.$watchLocation({})
			.then(coordinates => {
				let coors = latLng(coordinates.lat, coordinates.lng)
				this.center = coors
				// this.isLocationShared = true
				this.circle.center = coors
			})
			.catch(error => console.log('Unable to retreive your location: ', error))
		},
		toggleWindowInfo (infoIndex) {
			// this.activeIndex !== infoIndex ? this.quest[this.activeIndex].infoWinOpen = false : ''
			this.activeIndex !== infoIndex ? this.quest[this.activeIndex].radiusVisibility = false : ''
			// this.quest[infoIndex].infoWinOpen = !this.quest[infoIndex].infoWinOpen
			this.quest[infoIndex].radiusVisibility = !this.quest[infoIndex].radiusVisibility
			// this.cashDropsCoordinates = this.quest[infoIndex].infoWinOpen === true ? this.quest[infoIndex].cashdrops : ''
			this.activeIndex = infoIndex
		},
		removePopUpinfo () {
			// this.quest[this.activeIndex].infoWinOpen = false
			this.quest[this.activeIndex].radiusVisibility = false
			this.cashDropsCoordinates = null
		},
	},
};
</script>

<style scoped>
.infowindow p {
	color: #676767;
	margin: 0;
}
</style>
