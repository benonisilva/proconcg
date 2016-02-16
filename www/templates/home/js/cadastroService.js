(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('CadastroService', CadastroService);
        CadastroService.$inject = ['$q','$http','$timeout','UserService'];

    function CadastroService($q,$http,$timeout,UserService) { 
    	var cadastro = {
    		save : save
    	};

    	return cadastro;

    	function save(cadastro) {
    	   console.log("CadastroService.save: "+cadastro);
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