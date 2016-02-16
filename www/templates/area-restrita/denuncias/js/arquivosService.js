(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('ArquivosService', ArquivosService);
        ArquivosService.$inject = ['$q','$http','$timeout','UserService'];

    function ArquivosService($q,$http,$timeout,UserService) { 
    	var cadastro = {
    		save : save
    	};

    	return cadastro;

    	function save(cadastro) {
    	   console.log("ArquivosService.get: "+cadastro);
           var deferred = $q.defer();
            //fake
            $timeout(function(){
                if(true){
                    UserService.setUser(cadastro);
                    deferred.resolve(true);
                }else{
                    deferred.reject(false);
                }
            },5000);
            return deferred.promise;
    	};
    }    
})();