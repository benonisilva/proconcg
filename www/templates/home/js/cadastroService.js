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

    	function _save(cadastro) {
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

        function save(cadastro){
            
            console.log("CadastroService.save: ");
            console.log(cadastro||"null");
            var url = 'http://localhost:1118/Home/Requerente';

            var deferred = $q.defer();
            $http.post(url, cadastro).then(_successCallback, _errorCallback);

            function _successCallback(data){
                console.log("_successCallback");
                console.log(data||"null");
                deferred.resolve(true);
            };

            function _errorCallback(data){
                console.log("_errorCallback");
                console.log(data||"null");
                deferred.reject(false);
            };

            return deferred.promise;
        };
    }    
})();