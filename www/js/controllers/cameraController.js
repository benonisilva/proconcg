angular.module('starter.controllers.cam', [])
.controller('ArquivosCtrl', ['$scope', '$location', 'GetUU',
	'ArquivosFactory', '$timeout','CameraService',
	function($scope, $location, GetUU,ArquivosFactory,$timeout,CameraService) {

	var url;
	$scope.pics = ArquivosFactory.all();
	

	function onSuccess(imageURI) {
    	//var image = document.getElementById('myImage');
    	var data_image = "data:image/jpeg;base64,"+imageURI;
    	ArquivosFactory.add(data_image);
    	//console.log(ArquivosFactory.all());
    	var pics = ArquivosFactory.all();
    	$scope.pics = pics;
	}

	function onFail(message) {
    	alert('Failed because: ' + message);
	}
	
	// on DeviceReady check if already logged in (in our case CODE saved)
	ionic.Platform.ready(function() {
		console.log("ready get camera types");
		if (!navigator.camera)
			{
				console.log("Dont have camera");
				return;
			}
		//pictureSource=navigator.camera.PictureSourceType.PHOTOLIBRARY;
		pictureSource=navigator.camera.PictureSourceType.CAMERA;
		destinationType=navigator.camera.DestinationType.DATA_URL;
		
	});
	
	// get upload URL for FORM
	GetUU.query(function(response) {
		$scope.data = response;
		console.log("got upload url ", $scope.data.uploadurl);
	});
	
	// take picture
	$scope.takePicture = function() {
		console.log("got camera button click");

		if (!navigator.camera)
			{
				alert("erro ao carregar plugin");
				return;
			}
		var options =   {
			quality: 60,
			destinationType: destinationType,
			sourceType: pictureSource,
			encodingType: Camera.EncodingType.JPEG,
			saveToPhotoAlbum: true,
			targetWidth: 100,
  			targetHeight: 100
		};

		CameraService.getPicture(options).then(function(imageURI) {
      		var data_image = "data:image/jpeg;base64,"+imageURI;
      		ArquivosFactory.add(data_image);
    		console.log("imagem: "+data_image[1]);
    		$timeout(function() {
        		var pics = ArquivosFactory.all();
        		$scope.pics = pics;
				//console.log('update: ' +$scope.pics);
    		}, 50);
    		return; 
    		
    		}, function(err) {
      		console.err("error: "+err);
    	});

		//navigator.camera.getPicture(onSuccess,onFail,options);

		console.log("end takePicture");

	};

	// do POST on upload url form by http / html form    
	$scope.update = function(obj) {
		if (!$scope.data.uploadurl)
			{
			// error handling no upload url
			return;
			}
		if (!$scope.mypicture)
			{
			// error handling no picture given
			return;
			}
		var options = new FileUploadOptions();
		options.fileKey="ffile";
		options.fileName=$scope.mypicture.substr($scope.mypicture.lastIndexOf('/')+1);
		options.mimeType="image/jpeg";
		var params = {};
		params.other = obj.text; // some other POST fields
		options.params = params;
		
		//console.log("new imp: prepare upload now");
		var ft = new FileTransfer();
		ft.upload($scope.mypicture, encodeURI($scope.data.uploadurl), uploadSuccess, uploadError, options);
		function uploadSuccess(r) {
			// handle success like a message to the user
			}
		function uploadError(error) {
			//console.log("upload error source " + error.source);
			//console.log("upload error target " + error.target);
			}
		};
}]);