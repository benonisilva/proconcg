// logger.js
(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('WelcomeCtrl', WelcomeCtrl);
        WelcomeCtrl.$inject = ['$scope', '$state', 'UserService', '$ionicLoading','FacebookService'];
    
    function WelcomeCtrl($scope, $state,UserService, $ionicLoading,FacebookService) { 
    	var vm = this;
    	var status;
    	var profileInfo;
    	FacebookService.getLoginStatus(fnSuccess,fnFail);
		
		function fnSuccess(resp){
			console.log(resp);
		};

		function fnFail(resp){
			console.log(resp);
		};    	

    }
})();
