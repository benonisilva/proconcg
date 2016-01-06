angular.module('starter').controller('LoginCtrl', 
  ['FactoryLogin','$scope', '$timeout', '$stateParams', 'ionicMaterialInk',
  'localDBService','$state','$ionicHistory',
  function(FactoryLogin,$scope, $timeout, $stateParams, ionicMaterialInk,
    localDBService,$state,$ionicHistory) {
    
    ionicMaterialInk.displayEffect();
    //$ionicHistory.clearHistory();

    $scope.user = {
      email:"seuemail@email.com",
      password:"1"
    };
    
    $scope.login = function(user) {
        console.log("LOGIN user: " + $scope.user.email + " - PW: " + $scope.user.password);
        if($scope.user.email!=="seuemail@email.com" || $scope.user.password!=="1" )
        {
            console.log("LOGIN user: error");
            $timeout(function() {
              $scope.showLoading("login invalido",4000);
              //$scope.$parent.hideHeader();
              }, 40);
        }
        else{
         
          console.log("logado");
          $scope.$parent.setLogged(true);
          $scope.showLoading("entrando",1000);
          $timeout(function() {
              $state.go('app.area-restrita');
              }, 2000);
           $ionicHistory.clearHistory();
        }
    }
}]);