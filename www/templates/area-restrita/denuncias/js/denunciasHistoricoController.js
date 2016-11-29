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
      vm.status = ["","Recebido","Processado","Falta Documento","Arquivado"]
      vm.denunciasRemotas = [];
      vm.tipos = [{id:1,name:"Denúncia"},{id:2,name:"Reclamação"}];
      
      activate();
      
      function activate() {
        var promises = [initDenuncias()];
              $ionicLoading.show({
                      template: 'Carregando...'
                    });
              return $q.all(promises).then(function() {
                console.log("activate");
                $ionicLoading.hide();
              });
      };

      function initDenuncias(){
        return DenunciaService.getDenunciasRemoto().then(function(data){
          vm.denunciasRemotas = data.fatos;
          return vm.denunciasRemotas;
        });
      };
    }
})();