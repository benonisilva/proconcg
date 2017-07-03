
(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('HomeCtrl', HomeCtrl);
        HomeCtrl.$inject = ['$scope', '$state', 
        '$ionicLoading'];
    
    function HomeCtrl($scope, $state, $ionicLoading) { 
    	var vm = this;
    	var status;
		
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
