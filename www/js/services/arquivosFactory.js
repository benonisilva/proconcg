(function() {
    'use strict';

    angular
        .module('starter')
        .factory('ArquivosService', ArquivosService);

    function ArquivosService() { 

    	var arquivos = {
    		getFotos : getFotos
    	};

    	return arquivos;

    	function getFotos(){
    		
    	};

    }
})();