(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('FiscalizacaoCtrl', FiscalizacaoCtrl);
        FiscalizacaoCtrl.$inject = ['$scope',
           '$ionicLoading','$state','fiscalizacao','$ionicHistory','$q'];

    function FiscalizacaoCtrl($scope,
        $ionicLoading,$state,fiscalizacao,$ionicHistory,$q) { 
    	var vm = this;
        vm.fiscalizacao = [];


        
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