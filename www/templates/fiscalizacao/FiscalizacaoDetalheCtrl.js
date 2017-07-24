(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('FiscalizacaoDetalheCtrl', FiscalizacaoDetalheCtrl);
        FiscalizacaoDetalheCtrl.$inject = ['$scope',
           '$ionicLoading','$state','$ionicHistory',
             '$q','DiligenciaService','$stateParams','FiscalizacaoService','$ionicModal','$cordovaInAppBrowser'];

    function FiscalizacaoDetalheCtrl($scope,
        $ionicLoading,$state,$ionicHistory,$q,
         DiligenciaService,$stateParams,FiscalizacaoService,$ionicModal,$cordovaInAppBrowser) { 
        
        var options = {
            location: 'yes',
            clearcache: 'yes',
            toolbar: 'no'
        };

        var vm = this;
        vm.id = 0;
        vm.provas = [];
        vm.agentes = [];
        vm.dados = { AgenteId : 1 };
        vm.tipos = [ {StatusId:2,Nome : "Constatado"}, {StatusId:3,Nome : "Não Constatado"}];
        vm.showEndereco = false;
        vm.showEmpresa = true;
        vm.showConstatacao = false;
        vm.showProvas = false;
        vm.showFinalizar = false;
        vm.showMudarAgente = false;
        
        $scope.$watch('vm.provas', function(n, old) {
            console.log(n);
            console.log("velho: "+ old);
        });



        vm.openGeo = function (endereco) {
            document.addEventListener("deviceready", function () {
                if(endereco===null ||endereco===undefined ) endereco = ""
                var lat = -7.2164603;
        	    var lng = -35.8821985;
                var geocoords = lat + ',' + lng;
                $cordovaInAppBrowser.open('geo:0,0?q=' +  endereco.Rua + ' Cep:' + endereco.Cep +' Numero: ' +endereco.Numero, '_system', options)
                    .then(function(event) {
                        // success
                        console.log(event)
                     })
                    .catch(function(event) {
                        // error
                        console.log(event)
                });

            }, false);
        }

        vm.finalizar = function (dados){
            _showLoading();
            dados.ConstatacaoId = vm.id;
            dados.DataEntrega = dados.DataConclusao;
            FiscalizacaoService.finalizar(dados).then(function(dados){
                $ionicLoading.hide();
                $state.go('app.fiscalizacao');
            });
        }

        vm.mudarAgente = function (autoid,agenteid){
            FiscalizacaoService.mudarAgente(autoid,agenteid).then(function (result){
                console.log(result);
            });
        }

        vm.carregar = function (id){
           _showLoading();
           FiscalizacaoService.getProvas(id).then(function(data){
               var retVal = data.data.provas;
               var newProvas = [];
               retVal.forEach(function(element) {
                   newProvas.push({ url: "http://189.80.19.75:8080/procon-admin-teste/Fato/Prova?fatoId="+id+"&id="+element.AnexoId })
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
                    vm.showMudarAgente = false;
                    break;
                case 3:
                    vm.showEndereco = false;
                    vm.showEmpresa = false;
                    vm.showConstatacao = true;
                    vm.showProvas = false;
                    vm.showFinalizar = false;
                    vm.showMudarAgente = false;
                    break;
                case 4:
                    vm.showEndereco = false;
                    vm.showEmpresa = false;
                    vm.showConstatacao = false;
                    vm.showProvas = true;
                    vm.showFinalizar = false;
                    vm.showMudarAgente = false;
                    break;
                case 5:
                    vm.showEndereco = false;
                    vm.showEmpresa = false;
                    vm.showConstatacao = false;
                    vm.showProvas = false;
                    vm.showFinalizar = true;
                    vm.showMudarAgente = false;
                    break;
                case 6:
                    vm.showEndereco = false;
                    vm.showEmpresa = false;
                    vm.showConstatacao = false;
                    vm.showProvas = false;
                    vm.showFinalizar = false;
                    vm.showMudarAgente = true;
                    break;
                default:
                    vm.showEndereco = false;
                    vm.showEmpresa = true;
                    vm.showConstatacao = false;
                    vm.showProvas = false;
                    vm.showFinalizar = false;
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
                    vm.dados.AgenteId = result.Agente.AgenteId;
                    DiligenciaService.getConsumidor(result.FatoId).then(function (dado){
                        vm.consumidor = dado;
                    });
                    return vm;
                }  
                
           });
            FiscalizacaoService.getAgentes().then(function (data){
                vm.agentes = data.data.agentes;
                return vm;
            }); 
        console.log("FiscalizacaoDetalheCtrl:active");
        };
    }    
})();