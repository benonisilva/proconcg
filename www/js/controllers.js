angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, 
  $ionicPopover, $timeout,$ionicLoading) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;
    

    var user = window.localStorage.getItem('_user');
    //var userObj = JSON.parse(user);
    //userObj.data.ativo = true;
    $scope.logged = user.ativo;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setLogged = function(bool) {
        $scope.logged = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

    $scope.showLoading = function(msg, duration) {
    $ionicLoading.show({
      template: msg,
      duration: 1000
    });
  };
  
  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };
})

    ////////////////////////////////////////
    // Controllers
    ////////////////////////////////////////
//acompanhamento
.controller('AcompanhamentoCtrl', ['$scope','$timeout','FactoryHistorico','$ionicLoading',
  function($scope,$timeout,FactoryHistorico,$ionicLoading) {
  console.log("AcompanhamentoCtrl");
  $scope.pesquisa={'protocolo':'','nDocumento':''};
  $scope.historicos = {};
  $scope.pesquisaDenuncia = function(pesquisa){
    $scope.showLoading("Buscando...",3000);
    FactoryHistorico.all().then(function(resp) {
          console.log('Success', resp.data);
          $scope.historicos = [resp.data];
          $scope.hideLoading();

        }, function(err) {
        console.error('ERR', err);
        $scope.hideLoading();
        $scope.showLoading(err.statusText,2000);
    });
  };

  
}])
//end denuncia controler
.controller('TabsCtrl', function($scope,$rootScope) {
  
  $scope.hide = true;
  window.addEventListener('native.keyboardshow', function (e){
        //alert('Keyboard height is: ' + e.keyboardHeight);
        $scope.hide = true;
        //alert('Keyboard height is: ' + $scope.hide);
      });

      

      window.addEventListener('native.keyboardhide', function (e){
        $scope.hide = false;
        //alert('Goodnight, sweet prince: ' + $scope.hide);
      });
  
})

.controller('CadastroSlideCtrl', function($scope,$ionicSlideBoxDelegate) { 
  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }
})
.controller('ReclamacaoCtrl', 
      function($scope,$stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,
        FactoryBuscaEndereco,FactoryOpcoes,
    constantConfig,$ionicLoading,localDBService) {
    
    
    $scope.opcoes = {
      assuntos : [{'id':'','nome':'Assunto'}],
      desejos : [
      
      {'id':'1','nome':'CANCELAMENTO DE COMPRA'},
      {'id':'2','nome':'CANCELAMENTO DE CONTRATO'},
      {'id':'3','nome':'CANCELAMENTO DE SERVIÇO'},
      {'id':'4','nome':'DENUNCIA'},
      {'id':'5','nome':'TROCA'},
      {'id':'6','nome':'DEVOLUÇÂO DO VALOR'},
      {'id':'7','nome':'REPAROS'},
      {'id':'9','nome':'OUTROS'}

      ],
      descritivos : [{'id':'','descritivo':'Descritivo'}]
    };


  FactoryOpcoes.getOpcoes('assuntos').then(function(resp) {
          //console.log('Success', resp.data.assuntos);
 
          $scope.opcoes.assuntos = resp.data.assuntos;

        }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
  });

  FactoryOpcoes.getOpcoes('descritivos').then(function(resp) {
          //console.log('Success', resp.data.descritivos);
          // For JSON responses, resp.data contains the result
          //deferred.resolve(data);
          $scope.opcoes.descritivos = resp.data.descritivos;

        }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
  });      
    

    $scope.postReclamacao = function(data){
      var numeroDocumentoRequerente = window.localStorage['documento'];
      //console.log(numeroDocumentoRequerente);
      var reclamacao = {
        id: '-1',
        AssuntoID : data.assunto.id,
        DescritivoID: data.descritivo.id,
        AcaoID: data.desejo.id,
        NotaFiscal : data.nota,
        Protocolo: data.nOs,
        Produto : data.item,
        Empresa: data.reclamado,
        Denuncia: data.denuncia,
        DocumentoReclamante : numeroDocumentoRequerente
      };
      console.log(reclamacao);
     

      if(true){
         alert("Denuncia Salva!");
         
         $scope.$parent.loginData.denuncias.push(
          {"empresa":reclamacao.Empresa,"motivo":reclamacao.Denuncia,"situacao":"Enviada"}
          );


      }else{

        FactoryOpcoes.postReclamacao(constantConfig.url+'Denuncia', reclamacao).then(function(resp) {
          
          $scope.showLoading("Denuncia Salva...",3000);
          $state.go('tab.acompanhamento');
          console.log(resp);
      
      }, function(err){
          $scope.hideLoading();
          console.error(err);
      }).finally( function(){

          $scope.hideLoading();

        });
      }

    };

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
});