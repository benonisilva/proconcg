(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('LoginCtrl', LoginCtrl);
        LoginCtrl.$inject = ['$scope','$ionicLoading','$state','LoginService'];

    function LoginCtrl($scope,$ionicLoading,$state,LoginService) { 
    	var vm = this;
        vm.user = {email:'benonisilva@hotmail.com',password:'2e62'};
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
            $ionicLoading.hide();
            if(arg===true){    
                console.log("login success: "+arg);
                $scope.$parent.setLogged(true);
                $state.go("app.area-restrita");
            }
            
        };
        function fnFail(arg){
            console.log("login fail: "+arg);
            $ionicLoading.hide();
            alert("Falha no servidor");
        };
    }    
})();