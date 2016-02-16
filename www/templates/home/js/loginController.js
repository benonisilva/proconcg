(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('LoginCtrl', LoginCtrl);
        LoginCtrl.$inject = ['$scope','$ionicLoading','$state','LoginService'];

    function LoginCtrl($scope,$ionicLoading,$state,LoginService) { 
    	var vm = this;
        vm.user = {email:'user@email.com',password:'1'};
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
            console.log("login success: "+arg);
            $ionicLoading.hide();
            $state.go("app.home");
        };
        function fnFail(arg){
            console.log("login fail: "+arg);
            $ionicLoading.hide();
            alert("Email ou senha invalidos.");
        };
    }    
})();