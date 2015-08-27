angular.module('starter.controllers', [])

.controller('ChatsCtrl', function($scope) {})

.controller('DenunciaCtrl', ['$scope','$state', 'FactoryBuscaEndereco','FactoryOpcoes',  function($scope, $state, FactoryBuscaEndereco,FactoryOpcoes) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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
          // For JSON responses, resp.data contains the result
          //deferred.resolve(data);
          $scope.opcoes.assuntos = resp.data.assuntos;

        }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
  });

  FactoryOpcoes.getOpcoes('descritivos').then(function(resp) {
          console.log('Success', resp.data.descritivos);
          // For JSON responses, resp.data contains the result
          //deferred.resolve(data);
          $scope.opcoes.descritivos = resp.data.descritivos;

        }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
  });      
  

  $scope.cadastraUser = function(formUser){
    //console.log(formUser);
    $state.go('tab.reclamacao');
  };

  $scope.onClickBuscar = function(cep){
    //console.log(cep);
    FactoryBuscaEndereco.getEndereco(cep).then(function(resp) {
          //console.log('Success', resp.data);
          // For JSON responses, resp.data contains the result
          //deferred.resolve(data);
          $scope.endereco = resp.data;
        }, function(err) {
        console.error('ERR', err);
        // err.status will contain the status code
        });

  };

  //$scope.endereco = FactoryBuscaEndereco.getEndereco('11');
  //$scope.optcoes = FatoryFormOptions.all();
  
}])

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
