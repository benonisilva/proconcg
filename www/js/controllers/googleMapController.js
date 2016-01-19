angular.module('starter.controllers').controller('MapaCtrl', 
	function($scope, $ionicLoading, $compile) {
    	console.log("MapCtrl");
    	document.addEventListener("deviceready", function() {
    		
    		var div = document.getElementById("map_canvas");
    		// Initialize the map view
    		map = plugin.google.maps.Map.getMap(div);
    		map.setCenter(new google.maps.LatLng(-34, 151));
    		console.log("map: "+map);
    		console.log("div: "+div);
    	},false);
});