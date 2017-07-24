(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('FiscalizacaoCtrl', FiscalizacaoCtrl);
        FiscalizacaoCtrl.$inject = ['$scope',
           '$ionicLoading','$state','fiscalizacao','$ionicHistory','$q','FiscalizacaoService','$timeout','$ionicNavBarDelegate'];

    function FiscalizacaoCtrl($scope,
        $ionicLoading,$state,fiscalizacao,$ionicHistory,$q,FiscalizacaoService,$timeout,$ionicNavBarDelegate) { 
    	var vm = this;
        vm.fiscalizacao = [];

        $scope.$watch(
         "vm.fiscalizacao",
          function( newValue, oldValue ) {
              vm.fiscalizacao = newValue;
            }
        );

        $scope.$on('$ionicView.enter', function(){
            console.log("ionicView.enter")
            $timeout(function(){
                $ionicNavBarDelegate.align('center');
                $ionicHistory.removeBackView();
            });
        });

        vm.recarregar = function () {
             console.log("FiscalizacaoCtrl:recarregar");
             FiscalizacaoService.getFiscalizacao().then(function (result){
              vm.fiscalizacao = result.data.autos;
              return vm.fiscalizacao;
            });
        }
        
        active();
        
        function active() {
           console.log("FiscalizacaoCtrl:active");
           $ionicHistory.clearCache();
           $ionicHistory.removeBackView();
           $ionicHistory.clearHistory();
           vm.fiscalizacao = fiscalizacao.data.autos;
           console.log(fiscalizacao.data.autos);
           return vm.fiscalizacao;
        };
    }    
})();