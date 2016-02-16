
(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('HomeCtrl', HomeCtrl);
        HomeCtrl.$inject = ['$scope', '$state', 'UserService', 
        '$ionicLoading','FacebookService'];
    
    function HomeCtrl($scope, $state,UserService, $ionicLoading,FacebookService) { 
    	var vm = this;
    	var status;
    	var profileInfo;
        vm.facebookSignIn = facebookSignIn;
		
		function fnSuccess(resp){
			console.log("HomeCtrl.facebookSignIn.fnSuccess:");
            console.log(resp || "");
            $state.go("app.cadastro",{profile:resp});
		};

		function fnFail(resp){
			console.log("HomeCtrl.facebookSignIn.fnFail:");
            console.log(resp || "");
		};

        function facebookSignIn () {
            console.log("HomeCtrl.facebookSignIn:");
            FacebookService.getLoginStatus().then(fnSuccess,fnFail);
        };    	

    }
})();
