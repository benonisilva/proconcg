(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('LoginCtrl', LoginCtrl);
        LoginCtrl.$inject = ['$scope','LoginService'];

    function LoginCtrl($scope,LoginService) { 
    	var vm = this;
        vm.user = {email:'seuemail@gmail.com',password:'1'};
        vm.login = login;
        
        function login(user) {
            console.log("login: "+user.email);
            LoginService.login.getUser(user).then(fnSuccess,fnFail);
        };

        function fnSuccess(arg){
            console.log("login success: "+arq);
        };
        function fnFail(arg){
            console.log("login fail: "+arq);
        };
    }    
})();