angular.module('starter.controllers').controller('MapaCtrl', 
	function($scope, $ionicLoading, $compile) {
    	console.log("MapCtrl");
    	var map;
    	try{
    		map = new google.maps.Map(document.getElementById('map'), {
    	    center: {lat: -34.397, lng: 150.644},
    	    zoom: 19
    	  });
    	}catch(e){
    		console.error("Erro maps: "+e);
    	}
    	console.log("map: "+map);
    	
    	/*var contentString = '<div id="content">'+
    	      '<div id="siteNotice">'+
    	      '</div>'+
    	      '<div id="bodyContent">'+
    	      '<p>Rua Afonso Campos, 305, Centro</p>'+
    	      '<p>Campina Grande-PB</p>'+
    	      '</div>'+
    	      '</div>';

    	var infowindow = new google.maps.InfoWindow({
    	    content: contentString,
    	    maxWidth: 200
    	  });


    	$scope.mapCreated = function(map) {
    	    var marker = new google.maps.Marker({
    	      position: {lat:-7.2191022,lng:-35.8804302},
    	      map: map,
    	      title: 'Procon'
    	    });
    	    $scope.map = map;
    	    console.log('init map');
    	    infowindow.open(map,marker);
    	  };*/
});