(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('HistoricoCtrl', HistoricoCtrl);
        
        HistoricoCtrl.$inject = ['$scope', '$stateParams', 'DenunciaService','$ionicLoading','$q','Id'];

    function HistoricoCtrl($scope, $stateParams, DenunciaService,$ionicLoading,$q,Id){ 

      var vm = this;
      vm.lista = [];
      
      activate(Id);

      function activate(Id) {
        var promises = [getLocal(Id)];
              $ionicLoading.show({
                      template: 'Carregando...',
                      duration: 4000
                    });
              return $q.all(promises).then(function() {
                console.log("activate");
                $ionicLoading.hide();
              });
      };

      function getLocal (id) {
         return DenunciaService.getHistorico(id).then(function (data){
            console.log(data);
            vm.lista = data.data.historico;
            return vm.lista;
         });
      }
    }
})();