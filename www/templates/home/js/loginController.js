(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('LoginCtrl', LoginCtrl);
        LoginCtrl.$inject = ['$scope','$ionicLoading','$state','LoginService','$ionicHistory'];

    function LoginCtrl($scope,$ionicLoading,$state,LoginService,$ionicHistory) { 
    	var vm = this;
        vm.user = {Email:"",Password:""};
        vm.login = login;
        
        function login(user) {
            console.log("login: "+user.email);
            
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            LoginService.getUser(user).then(fnSuccess,fnFail);
        };

        function fnSuccess(arg){
            var strArg = JSON.stringify(arg);
            $ionicLoading.hide();
            if(arg===true){    
                console.log("login success: "+strArg);
                $ionicHistory.clearHistory();
                $scope.$parent.setLogged(true);
                $state.go("app.area-restrita");
                
            }else{
                alert("Seu login esta incorreto");
            }
            
        };
        function fnFail(arg){
            var strFail = JSON.stringify(arg);
            console.log("login fail: "+strFail);
            $ionicLoading.hide();
            alert("Falha no servidor");
        };
    }    
})();