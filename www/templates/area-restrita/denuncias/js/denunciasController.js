(function() {
    'use strict';

    angular
        .module('starter.controller')
        .controller('DenunciaCtrl', DenunciaCtrl);
        DenunciaCtrl.$inject = ['$scope', '$stateParams', 'DenunciasService',
  '$ionicSlideBoxDelegate','$timeout','$ionicPopup',
  'ArquivosFactory','$ionicScrollDelegate', '$state'];

    function DenunciaCtrl($scope, $stateParams, DenunciasService,
      $ionicSlideBoxDelegate,$timeout,$ionicPopup,
      ArquivosFactory,$ionicScrollDelegate,$state){ 

      var vm = this;
    }
})();