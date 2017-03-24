(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('MapCtrl', MapCtrl);
        MapCtrl.$inject = ['$scope'];

        function MapCtrl($scope){
        	var vm = this;
        	var lat = -7.2191022;
        	var lon = -35.8826189;
        	initializeMap(lat,lon);
        	/*document.addEventListener("deviceready", function(){
        		initializeMap();
        	}, false);*/
        	
        	function initializeMap(lat,lon) {
        	    console.log(lat+":"+lon);
        	    var mapLoc = new Microsoft.Maps.Location(lat, lon); 
        	    var mapOptions = {
        	        credentials: "ApekYdmvuWWJDzcvPIsH5RKqRcw0IJ2k5QTDOdScLR0GxIsHBR2NgAr5a2ffYgEW",
        	        mapTypeId: Microsoft.Maps.MapTypeId.road,
        	        center: mapLoc,
        	        zoom: 16
        	    };
        	    
        	    var pushpin= new Microsoft.Maps.Pushpin(mapLoc, null); 
        	    var infoboxOptions = {title:'Procon - Campina Grande', description:'R. Pref. Ernane Lauritzen, 226 - Centro, <br /> Campina Grande - PB, 58400-133.  (83) 98802-5525 (83) 3342-9179 - Disk Denúncia151'}; 
        	    var defaultInfobox = new Microsoft.Maps.Infobox(mapLoc, infoboxOptions );    
        	    var map = new Microsoft.Maps.Map(document.getElementById("map_canvas"), mapOptions);
        	    map.entities.push(pushpin);
        	    map.entities.push(defaultInfobox);
        	    //map.entities.clear(); 
        	    
        	    
        	}
        };
})();        