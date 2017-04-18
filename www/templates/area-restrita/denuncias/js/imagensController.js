(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('ImagensCtrl', ImagensCtrl);
        
        ImagensCtrl.$inject = ['$scope'];

    function ImagensCtrl($scope){ 
      
      console.log("ImagensCtrl:init");
    
    }
})();
