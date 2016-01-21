(function() {
    'use strict';

    angular
        .module('starter.servives')
        .factory('CadastroService', CadastroService);
        CadastroService.$inject = ['$q','$http','$timeout'];

    function CadastroService($q,$http,$timeout) { 
    	var cadastro {
    		save : save
    	};

    	return cadastro;

    	function save(cadastro) {
    		var def = $q.defer();
    		return def.promise;
    	};
})();