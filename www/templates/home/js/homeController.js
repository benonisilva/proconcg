
(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('HomeCtrl', HomeCtrl);
        HomeCtrl.$inject = ['$scope', '$state','$ionicLoading','LoginService','$ionicHistory'];
    
    function HomeCtrl($scope, $state, $ionicLoading,LoginService,$ionicHistory) { 
    	var vm = this;
    	var status;
        
        vm.login = function (){
            
            $ionicLoading.show({
                
                template: 'Carregando...'
                }).then(function(){
                console.log("nao mostra loading");
            });
            
            LoginService.isLogin().then(function (result){
                
                console.log("HomeCtrl.LoginService.getUser:" + result);
                $ionicLoading.hide();
                
                if(result===true){
                    
                    $scope.$parent.setLogged(true);
                    $ionicHistory.clearCache();
                    $ionicHistory.removeBackView();
                    $ionicHistory.clearHistory();
                    $state.go("app.fiscalizacao");
                
                }else {
                    $state.go("app.login");
                }

            
            }, function (error){
                
                console.log("HomeCtrl.LoginService.getUser:" + error);
                $ionicLoading.hide();
                $state.go("app.login");
            
            });
        }
		function fnSuccess(resp){
			console.log("HomeCtrl.facebookSignIn.fnSuccess:");
            console.log(resp || "");
            $state.go("app.cadastro",{profile:resp});
		};

		function fnFail(resp){
			console.log("HomeCtrl.facebookSignIn.fnFail:");
            console.log(resp || "");
		};

    }
})();
