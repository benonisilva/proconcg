(function() {
    'use strict';

    angular
        .module('starter.controller')
        .controller('AddDenunciaCtrl', AddDenunciaCtrl);
        AddDenunciaCtrl.$inject = ['$scope', '$stateParams', 'DenunciasService',
  '$ionicSlideBoxDelegate','$timeout','$ionicPopup',
  'ArquivosFactory','$ionicScrollDelegate', '$state'];

    function AddDenunciaCtrl($scope, $stateParams, DenunciasService,
      $ionicSlideBoxDelegate,$timeout,$ionicPopup,
      ArquivosFactory,$ionicScrollDelegate,$state){ 

      var vm = this;
    }
})();