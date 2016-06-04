(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('DenunciaCtrl', DenunciaCtrl);
        DenunciaCtrl.$inject = ['$scope', '$stateParams', 'DenunciaService',
  '$ionicSlideBoxDelegate','$timeout','$ionicPopup',
  'ArquivosService','$ionicScrollDelegate', '$state'];

    function DenunciaCtrl($scope, $stateParams, DenunciaService,
      $ionicSlideBoxDelegate,$timeout,$ionicPopup,
      ArquivosFactory,$ionicScrollDelegate,$state){ 

      var vm = this;
      
      vm.denunciasLocal = {};
      vm.denunciasRemotas = [];

      activate();
      getLocal();

      function activate() {
             return initDenuncias().then(function() {
                 console.log('Resolve denuncias remoto');
             });
      };

      function getLocal(){
        vm.denunciasLocal = DenunciaService.getDenunciasLocal();
        return vm.denunciasLocal;
      };

      function initDenuncias(){
        return DenunciaService.getDenunciasRemoto().then(function(data) {
                vm.denunciasRemotas = data;
                return vm.denunciasRemotas;
            });
      };



    }
})();