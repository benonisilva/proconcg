(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('ImagensCtrl', ImagensCtrl);
        
        ImagensCtrl.$inject = ['$scope','DenunciaService','CameraService','$q'];

    function ImagensCtrl($scope,DenunciaService){ 
      var vm = this;
      vm.Anexos = [];
      vm.removePic = removePic;
      console.log("ImagensCtrl:init");
      
      vm.openCamera = function () {
          console.log("CameraCtrl:openAlbum"); 
          CameraService.getFromAlbum().then(function(data){
             vm.Anexos.push(data);
          },function(err){
          var strData = JSON.stringify(err);
          console.log(strData);
          });  
       };
      
      function enviaImagem(anexos) {
        console.log("ImagensCtrl.enviaImagem");
        var promisses = DenunciaService.uploadFiles(id,anexos);
        $q.all(promisses).then(function(data){
          console.log("uploadFiles:success: ", data);
        },function(err){
          console.log("uploadFiles:success: "+err);
        });
      }

      function removePic(pos){
        vm.Anexos.splice(pos,1);
      };
    
    }
})();
