angular.module('starter.controllers', [])

//acompanhamento
.controller('AcompanhamentoCtrl', ['$scope','FactoryHistorico','$ionicLoading',
  function($scope,FactoryHistorico,$ionicLoading) {
  
  console.log("AcompanhamentoCtrl");
 
  $scope.showLoading = function(msg) {
    $ionicLoading.show({
      template: msg,
      duration: 1000
    });
  };
  
  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };

  $scope.pesquisa={'protocolo':'','nDocumento':''};
  $scope.historicos = {};

  $scope.pesquisaDenuncia = function(pesquisa){
    $scope.showLoading("Buscando...");
    FactoryHistorico.getHistorico(pesquisa).then(function(resp) {
          console.log('Success', resp.data);
          $scope.historicos = [resp.data];
          $scope.hideLoading();

        }, function(err) {
        console.error('ERR', err);
        $scope.hideLoading();
        $scope.showLoading(err.statusText);
    });
  };

  
}])
//end acompanhamento
//denuncia
.controller('DenunciaCtrl', ['$scope','$state', 'FactoryBuscaEndereco','FactoryOpcoes',
  'constantConfig' , '$ionicLoading', 'localDBService' , 
  function($scope, $state, FactoryBuscaEndereco,FactoryOpcoes,constantConfig,$ionicLoading,localDBService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.showLoading = function(msg) {
    $ionicLoading.show({
      template: msg,
      duration: 2000
    });
  };
  
  $scope.hideLoading = function(){
    $ionicLoading.hide();
  };


  $scope.user = {
    cep:"",
    name: "",
    nDocumento:"",
    email: "",
    tipoDocumento: "",
    endereco:{
      localidade: "",
      bairro : "",
      logradouro : "",
      numero: "",
      complemento:""

    }

  };
  

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

  $scope.cadastraUser = function(user){
    
    $scope.showLoading("Gravando dados...");
    FactoryOpcoes.postRequerente(constantConfig.url+'Requerente',
        { 
          id:'-1',
          Nome: user.name,
          Endereco: user.endereco.logradouro + '- N. '+ user.endereco.numero + ', ' + user.endereco.complemento,
          Bairro: user.endereco.bairro,
          Cidade : user.endereco.localidade,
          UfId: 15,
          TipoDoDocumentoId :user.tipoDocumento ,
          Cep : user.cep,
          Documento : user.nDocumento,
          Telefone : user.telefone,
          Email : user.email

        }

      ).then(function(resp) {
          
          $state.go('tab.reclamacao');
          localDBService.saveLocal('documento',user.nDocumento);
          console.log(resp);
          $scope.hideLoading();
      
      }, function(err){
          $scope.hideLoading();
          console.error(err);
      }).finally( function(){

          $scope.hideLoading();

        });

    
  };

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
      $scope.showLoading("Salvando denuncia...");

      FactoryOpcoes.postReclamacao(constantConfig.url+'Denuncia', reclamacao).then(function(resp) {
          //$scope.hideLoading();
          $scope.showLoading("Denuncia Salva...");
          $state.go('tab.acompanhamento');
          console.log(resp);
      
      }, function(err){
          $scope.hideLoading();
          console.error(err);
      }).finally( function(){

          $scope.hideLoading();

        });

  };

  $scope.onClickBuscar = function(cep){
    //console.log(cep);
    $scope.showLoading('Carregando endereco ...');
    FactoryBuscaEndereco.getEndereco(cep).then(function(resp) {
 
          $scope.user.endereco = resp.data;
          $scope.hideLoading();
        }, function(err) {
          
          $scope.hideLoading();
          console.error('ERR', err);
          alert(err);
 
        }).finally( function(){

          $scope.hideLoading();

        });

  };

  //$scope.endereco = FactoryBuscaEndereco.getEndereco('11');
  //$scope.optcoes = FatoryFormOptions.all();
  
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

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});