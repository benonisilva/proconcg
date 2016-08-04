(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('DenunciasHistoricoCtrl', DenunciasHistoricoCtrl);
        
        DenunciasHistoricoCtrl.$inject = ['$scope', '$stateParams', 'DenunciaService',
  '$ionicSlideBoxDelegate','$timeout','$ionicPopup',
  'ArquivosService','$ionicScrollDelegate', '$state','$q','$ionicHistory','$ionicLoading'];

    function DenunciasHistoricoCtrl($scope, $stateParams, DenunciaService,
      $ionicSlideBoxDelegate,$timeout,$ionicPopup,
      ArquivosFactory,$ionicScrollDelegate,$state,$q,$ionicHistory,$ionicLoading){ 

      var vm = this;
      vm.status = ["","Em Andamento","Arquivado"]
      vm.denunciasRemotas = [];
      
      activate();
      
      function activate() {
        var promises = [initDenuncias()];
              $ionicLoading.show({
                      template: 'Carregando...',
                      duration: 1000
                    });
              return $q.all(promises).then(function() {
                console.log("activate");
                $ionicLoading.hide();
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