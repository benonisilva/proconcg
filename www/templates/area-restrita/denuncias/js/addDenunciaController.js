(function() {
    
    'use strict';

    angular
        .module('starter.controllers')
        .controller('AddDenunciaCtrl', AddDenunciaCtrl);
        AddDenunciaCtrl.$inject = ['$scope', '$stateParams', 'DenunciaService',
  '$ionicSlideBoxDelegate','$timeout','$ionicPopup',
  'ArquivosService','$ionicScrollDelegate', '$state','$ionicLoading'];

    function AddDenunciaCtrl($scope, $stateParams, DenunciaService,
      $ionicSlideBoxDelegate,$timeout,$ionicPopup,
      ArquivosFactory,$ionicScrollDelegate,$state,$ionicLoading){ 

      var IdLocal = $stateParams.Id;
      console.log(IdLocal||"Id null");
      var vm = this;
      vm.denuncia = {
        Fornecedor:{
          Cnpj:"09412872000131",
          Cep:"58400565",
          Endereco : "Rua Qualquer, numero 12",
          Bairro: "Prata",
          Complemento:"Bloco A",
          InscricaoEstadual:"0021212121",
          RazaoSocial:"Empresa Denunciada",
          Telefone : "08311166612"
        },
        Data : "01/01/2001"
      };
      //vm.takePicture = takePicture;
      
      vm.myActiveSlide = 0;
      vm.showConfirm = showConfirm;
      vm.showConfirmEnviar = showConfirmEnviar;
      vm.nextSlide = nextSlide;
      vm.slideChanged = slideChanged;
      vm.previousSlide = previousSlide;
      vm.slideIndex = 0;

      

      /*Definicao de funcoes de escopo */
      function showConfirm(denuncia) {
      
        var confirmPopup = $ionicPopup.confirm({
          title: 'Salvar No Celular',
          template: 'Deseja Salvar A Denuncia Para Posterior Envio?',
          buttons: [
            { text: 'Não' },
            { text: 'Sim', type: 'button-positive', 
              onTap: function(e) {
              //e.preventDefault();
              return true;
            }
          }]
        });

        confirmPopup.then(function(res) {
          console.log('Res: ' +res);
          if(res) {
            console.log('denuncia adicionada-local');
            console.log(vm.denuncia||"");
            DenunciaService.saveLocal(vm.denuncia);
            //$state.go('app.denuncias');
          } else {
            console.log('You are not sure');
          }
        });
      };

      function showConfirmEnviar(denuncia) {
      
        var confirmPopup = $ionicPopup.confirm({
          title: 'Enviar Denuncia',
          template: 'Deseja Enviar A Denuncia Para ProconCG?',
          buttons: [
            { text: 'Não' },
            { text: 'Sim', type: 'button-positive', 
              onTap: function(e) {
              //e.preventDefault();
              return true;
            }
          }]
        });

        confirmPopup.then(function(res) {
          console.log('Res: ' +res);
          if(res) {
            console.log('denuncia enviar para servidor');
            console.log(vm.denuncia||"");
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });

            function fnSuccess(arg){
                $ionicLoading.hide();
                if(arg===true){    
                    console.log("showConfirmEnviar success: "+arg);
                    $scope.$parent.setLogged(true);
                    $state.go("app.area-restrita");
                }
                
            };
            
            function fnFail(arg){
                console.log("showConfirmEnviar fail: "+arg);
                $ionicLoading.hide();
                alert("Falha no servidor");
            };

            DenunciaService.enviar(vm.denuncia).then(fnSuccess,fnFail);
          } else {
            console.log('You are not sure');
          }
        });
      };

      function slideChanged(index) {
        console.log(index);
        vm.slideIndex = index;
      };

      function nextSlide() {
        console.log("click next");
        $timeout( function() {
          console.log("proximo");
          $ionicSlideBoxDelegate.next(500);
          $ionicScrollDelegate.scrollTop(true);
        }, 50);
      };

      function previousSlide() {
        console.log("voltar");
        $ionicSlideBoxDelegate.previous(500);
      };

      function getLocal(id){

        var denuncia = {
        Fornecedor:{
          Cnpj:"04011575000160",
          Cep:"58400565",
          Endereco : "Rua Qualquer, numero 12",
          Bairro: "Prata",
          Complemento:"Bloco A",
          InscricaoEstadual:"0021212121",
          RazaoSocial:"Empresa Denunciada",
          Telefone : "08311166612"
        },
        Data : "01/01/01"
      };

        if(id) return  DenunciaService.getDenunciaLocal(id);
        else return denuncia;
      };

      function takePicture() {
        console.log("Take a takePicture");
      };

      /*Definicao de funcoes de escopo */

    }  
      
})();