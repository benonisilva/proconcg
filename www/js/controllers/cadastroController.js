angular.module('starter.controllers')
 .controller('CadastroCtrl', 
  ['$scope','$state','$timeout' ,'FactoryBuscaEndereco','FactoryOpcoes',
  'constantConfig' , '$ionicLoading', 'localDBService' , 'UserService', 
  function($scope, $state, $timeout,FactoryBuscaEndereco,FactoryOpcoes,
    constantConfig,$ionicLoading,localDBService,UserService) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  var profile = UserService.getUser('user');
  
  showLoading = function(msg, duration) {
    $ionicLoading.show({
      template: msg,
      duration: 1000
    });
  };

  $scope.user = {
    facebookID: profile!==null? profile.userID: "",
    cep:"",
    name: profile!==null ? profile.name : "",
    nDocumento:"",
    email: profile!==null ? profile.email : "",
    tipoDocumento: "",
    endereco:{
      localidade: "",
      bairro : "",
      logradouro : "",
      numero: "",
      complemento:""

    }

  };

  $scope.cadastraUser = function(user){  
    
    if(true){
      //usou face para cadastro. Nao precisa confirmar email
      
      if(user.user!==undefined){
        console.log("profile "+profile);
        console.log("profile "+user);
        
        alert("Confirme seu email:"+user.email+"\npara receber sua senha");
        $timeout(function() {
            $scope.showLoading("Gravando dados...",3000);
          }, 4000);
        $state.go('app.login');
      }
      else{
        // $scope.showLoading("Gravando dados...",3000);
        alert("Confirme seu email:"+user.email+"\npara receber sua senha");
        console.log("profile "+user);
        $timeout(function() {
          $scope.showLoading("Gravando dados...",3000);

        }, 4000);
        $state.go('app.login');
      }

    }
    else{

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
    }
  };
  
  $scope.onClickBuscar = function(cep){
    console.log(cep);
    showLoading('Carregando endereco ...',3000);
    FactoryBuscaEndereco.getEndereco(cep).then(function(resp) {
          $scope.user.endereco = resp;
          $ionicLoading.hide();
          console.log("reposta: "+resp);
        }, function(err) {
          $ionicLoading.hide();
          console.error('Esse Cep Não Existe', err);
          alert("Esse Cep Não Existe");
        }
        );

  };
  
}]);