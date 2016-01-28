(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('CadastroCtrl', CadastroCtrl);
        CadastroCtrl.$inject = ['$q','$http','$timeout'];

    function CadastroCtrl($q,$http,$timeout) { 
    	var vm = this;
    }	
})();