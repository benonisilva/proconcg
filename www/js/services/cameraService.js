(function() {
    'use strict';
    angular
        .module('starter.services')
        .factory('CameraService', CameraService);
        
        CameraService.$inject = ['$q'];
        document.addEventListener("deviceready", CameraService, false);

    function CameraService($q){
    	
    	console.log("CameraService:Ready");
    	
    	var camera = {
    		
			getFromAlbum : getFromAlbum,
    		getFromCamera : getFromCamera
    	};

    	return camera;

    	/*function onDeviceReady() {
    	  console.log(navigator.camera);
    	}*/

    	function getFromAlbum(){
    		
			var q = $q.defer();
    		var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    		var options = _setOptions(srcType);
    		
    		navigator.camera.getPicture(function(data){
    			q.resolve(data);
    		},function(err){
    			q.reject(err);
    		},options);

    		return q.promise;
    	}

    	function getFromCamera(){
    		var q = $q.defer();
    	}


     function _setOptions(srcType) {
    	    var options = {
    	        // Some common settings are 20, 50, and 100
    	        quality: 50,
    	        destinationType: Camera.DestinationType.FILE_URI,
    	        // In this app, dynamically set the picture source, Camera or photo gallery
    	        sourceType: srcType,
    	        encodingType: Camera.EncodingType.JPEG,
    	        mediaType: Camera.MediaType.PICTURE,
    	        allowEdit: false,
    	        correctOrientation: true  //Corrects Android orientation quirks
    	    }
    	    return options;
    	}


    	function _success(data){

    	}

    	function _error(error){

    	}



    }

})();
