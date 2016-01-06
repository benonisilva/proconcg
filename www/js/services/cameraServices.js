angular.module('starter.services.cam', [])

// get upload url for file transfer (upload to http post service)
.factory('GetUU', function() {
	var uploadurl = "http://localhost/upl";
	return  {
    	query: function() {
		return uploadurl;
		}
	}
})
.service('ArquivosFactory', function() {
  
  this.pics = [];

  //return {
    this.all= function() {
      return this.pics;
    };
    this.get= function(id) {
      return pics[id];
    };
    this.remove= function(id){
      pics.splice(id, 1);
    };
    this.add= function(pic){
      //console.log("pic adicionada: "+ pic);
      this.pics.push(pic);
    };
  //}
})
.factory('CameraService', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])
;