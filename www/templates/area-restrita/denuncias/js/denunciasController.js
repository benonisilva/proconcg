(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('DenunciaCtrl', DenunciaCtrl);
        
        DenunciaCtrl.$inject = ['$scope', '$stateParams', 'DenunciaService',
  '$ionicSlideBoxDelegate','$timeout','$ionicPopup',
  'ArquivosService','$ionicScrollDelegate', '$state','$q'];

    function DenunciaCtrl($scope, $stateParams, DenunciaService,
      $ionicSlideBoxDelegate,$timeout,$ionicPopup,
      ArquivosFactory,$ionicScrollDelegate,$state,$q){ 

      var vm = this;
      
      vm.denunciasLocal = [];
      vm.denunciasRemotas = [];

      activate();
      //getLocal();

      function activate() {
        var promises = [getLocal(), initDenuncias()];
              return $q.all(promises).then(function() {
                console.log("activate");
                //logger.info('Activated Dashboard View');
              });
      };

      function getLocal(){
        return DenunciaService.getDenunciasLocal().then(function(data){
          vm.denunciasLocal = data;
          return vm.denunciasLocal;
        });
        
      };

      function initDenuncias(){
        return DenunciaService.getDenunciasRemoto().then(function(data){
          vm.denunciasRemotas = data;
          return vm.denunciasRemotas;
        });
      };



    }
})();