(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('FiscalizacaoDetalheCtrl', FiscalizacaoDetalheCtrl);
        FiscalizacaoDetalheCtrl.$inject = ['$scope',
           '$ionicLoading','$state','$ionicHistory',
             '$q','DiligenciaService','$stateParams','FiscalizacaoService','$ionicModal'];

    function FiscalizacaoDetalheCtrl($scope,
        $ionicLoading,$state,$ionicHistory,$q,
         DiligenciaService,$stateParams,FiscalizacaoService,$ionicModal) { 
    	var vm = this;
        vm.id = 0;
        vm.provas = [];
        vm.tipos = [ {StatusId:2,Nome : "Constatado"}, {StatusId:3,Nome : "Não Constatado"}];
        vm.showEndereco = true;
        vm.showEmpresa = false;
        vm.showConstatacao = false;
        vm.showProvas = false;
        vm.showFinalizar = false;
        
        $scope.$watch('vm.provas', function(n, old) {
            console.log(n);
            console.log("velho: "+ old);
        });

        vm.finalizar = function (dados){
            _showLoading();
            dados.ConstatacaoId = vm.id;
            dados.DataEntrega = dados.DataConclusao;
            FiscalizacaoService.finalizar(dados).then(function(dados){
                $ionicLoading.hide();
                $state.go('app.fiscalizacao');
            });
        }

        vm.carregar = function (id){
           _showLoading();
           FiscalizacaoService.getProvas(id).then(function(data){
               var retVal = data.data.provas;
               var newProvas = [];
               retVal.forEach(function(element) {
                   newProvas.push({ url: "http://189.80.19.75:8080/procon-admin/Fato/Prova?fatoId="+id+"&id="+element.AnexoId })
               }, this);
               vm.provas = newProvas;
               $ionicLoading.hide();
               return vm.provas;
           });
           return;
        }

        function _showLoading(){
            
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
        }

        vm.show = function (index) {
            switch (index) {
                case 2:
                    vm.showEndereco = false;
                    vm.showEmpresa = true;
                    vm.showConstatacao = false;
                    vm.showProvas = false;
                    vm.showFinalizar = false;
                    break;
                case 3:
                    vm.showEndereco = false;
                    vm.showEmpresa = false;
                    vm.showConstatacao = true;
                    vm.showProvas = false;
                    vm.showFinalizar = false;
                    break;
                case 4:
                    vm.showEndereco = false;
                    vm.showEmpresa = false;
                    vm.showConstatacao = false;
                    vm.showProvas = true;
                    vm.showFinalizar = false;
                    break;
                case 5:
                    vm.showEndereco = false;
                    vm.showEmpresa = false;
                    vm.showConstatacao = false;
                    vm.showProvas = false;
                    vm.showFinalizar = true;
                    break;
                default:
                   _openModalMap();
                    break;
            }
            return;
        }


        function _openModalMap () {
            $scope.modal.show();
        }

        active();
        
        function active() {
           var id = $stateParams.id;
           vm.id = id;
           DiligenciaService.getFiscalizacao(id).then(function(result){
                
                if(result){
                    vm.fiscalizacao =  result;
                    $scope.$broadcast('vm', result.Empresa.Endereco);
                    return vm;
                }  
                
           });
           console.log("FiscalizacaoDetalheCtrl:active");
           $ionicModal.fromTemplateUrl('templates/fiscalizacao/modal-map.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
            });
           
        };
    }    
})();