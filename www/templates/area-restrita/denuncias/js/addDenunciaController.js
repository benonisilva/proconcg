(function() {
    
    'use strict';

    angular
        .module('starter.controllers')
        .controller('AddDenunciaCtrl', AddDenunciaCtrl);
        AddDenunciaCtrl.$inject = ['$scope', '$stateParams', 'DenunciaService',
  '$ionicSlideBoxDelegate','$timeout','$ionicPopup',
  '$ionicScrollDelegate', '$state','$ionicLoading','$q','Id','CameraService'];

    function AddDenunciaCtrl($scope, $stateParams, DenunciaService,
      $ionicSlideBoxDelegate,$timeout,$ionicPopup,$ionicScrollDelegate,
      $state,$ionicLoading,$q,Id,CameraService){ 

      console.log(Id||"Id null");
      var vm = this;
      vm.openAlbum = openAlbum;
      vm.removePic = removePic;      
      vm.denuncia = {
        Fornecedor:{
          Cnpj:null,
          Cep:null,
          Endereco : null,
          Bairro: null,
          Complemento:null,
          InscricaoEstadual:null,
          RazaoSocial:null,
          Telefone : null
        },
        TipoId:1,
        Data : "",
        Arquivos : []
      };

      vm.tipos = [{id:1,name:"Denúncia"},{id:2,name:"Reclamação"}];
      
      vm.myActiveSlide = 0;
      vm.showConfirm = showConfirm;
      vm.showConfirmEnviar = showConfirmEnviar;
      vm.nextSlide = nextSlide;
      vm.slideChanged = slideChanged;
      vm.previousSlide = previousSlide;
      vm.slideIndex = 0;

      active(Id);

      function removePic(pos){
        vm.denuncia.Arquivos.splice(pos,1);
      }

      function openAlbum(){
       console.log("CameraCtrl:openAlbum"); 
       CameraService.getFromAlbum().then(function(data){
        vm.denuncia.Arquivos.push(data);
       },function(err){
        var strData = JSON.stringify(err);
        console.log(strData);

       });  
      }

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
            console.log(JSON.stringify(denuncia));
            if(denuncia.Id){
              console.log("Ja existe. Id: "+denuncia.Id);
              DenunciaService.updateLocal(denuncia);
            }else{
              
              DenunciaService.saveLocal(denuncia);
            }
            
            $state.go('app.area-restrita');
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
            console.log(denuncia||"");
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
                    $state.go("app.area-restrita");
                }
            };
            
            function fnFail(arg){
                console.log("showConfirmEnviar fail: "+arg);
                $ionicLoading.hide();
                alert("Falha no servidor");
            };

            DenunciaService.enviar(denuncia).then(fnSuccess,fnFail);
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
        //console.log("click next");
        $timeout( function() {
          //console.log("proximo");
          $ionicSlideBoxDelegate.next(500);
          $ionicScrollDelegate.scrollTop(true);
        }, 50);
      };

      function previousSlide() {
        $ionicSlideBoxDelegate.previous(500);
      };

      function getLocal(id){
        if(id){
          return DenunciaService.getDenunciaLocal(id).then(function(data){
            vm.denuncia = data;
            return vm.denuncia;
          });
        }else{
          return vm.denuncia;
        }
        
      };

      function active(id) {
        console.log("Id:");
        console.log(id||"id null");
        var promises = [getLocal(id)];
              return $q.all(promises).then(function() {
                console.log("activate:getLocal");
              });
      };
    }  
})();