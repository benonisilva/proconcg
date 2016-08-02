(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('DenunciaCtrl', DenunciaCtrl);
        
        DenunciaCtrl.$inject = ['$scope', '$stateParams', 'DenunciaService',
  '$ionicSlideBoxDelegate','$timeout','$ionicPopup',
  'ArquivosService','$ionicScrollDelegate', '$state','$q','$ionicHistory','$ionicLoading'];

    function DenunciaCtrl($scope, $stateParams, DenunciaService,
      $ionicSlideBoxDelegate,$timeout,$ionicPopup,
      ArquivosFactory,$ionicScrollDelegate,$state,$q,$ionicHistory,$ionicLoading){ 

      var vm = this;
      vm.status = ["","Em Andamento","Arquivado"]
      vm.denunciasLocal = [];
      vm.denunciasRemotas = [];
      $ionicHistory.clearHistory();
      activate();
      //getLocal();

      function activate() {
        var promises = [getLocal(), initDenuncias()];
              $ionicLoading.show({
                      template: 'Carregando...'
                    });
              return $q.all(promises).then(function() {
                console.log("activate");
                $ionicLoading.hide();
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