// logger.js
(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('WelcomeCtrl', WelcomeCtrl);
        WelcomeCtrl.$inject = ['$scope', '$state', '$q', 'UserService', '$ionicLoading'];
    function WelcomeCtrl() { 
    	var vm = this;

    }
})();
