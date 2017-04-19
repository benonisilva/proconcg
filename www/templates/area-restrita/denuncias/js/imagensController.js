(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('ImagensCtrl', ImagensCtrl);
        
        ImagensCtrl.$inject = ['$scope'];

    function ImagensCtrl($scope){ 
      var vm = this;
      console.log("ImagensCtrl:init");
      vm.openCamera = function () {
          console.log("camera");
          alert("falta implementar.");
      }
    
    }
})();
