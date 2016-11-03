(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('CadastroService', CadastroService);
        CadastroService.$inject = ['$q','$http','$timeout','constantConfig'];

    function CadastroService($q,$http,$timeout,constantConfig) { 
    	var cadastro = {
    		save : save
    	};

    	return cadastro;

/*    	function _save(cadastro) {
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
    	};*/

        function save(cadastro){
            
            console.log("CadastroService.save: ");
            console.log(cadastro||"null");
            var url = constantConfig.url +'/Account/Register';

            var deferred = $q.defer();
            $http.post(url, cadastro).then(_successCallback, _errorCallback);

            function _successCallback(data){
                console.log("_successCallback");
                var strDados = JSON.stringify(data.data);
                console.log(strDados||"null");
                //window.localStorage.setItem('_user',strDados);
                deferred.resolve(true);
            };

            function _errorCallback(error){
                console.log("_errorCallback");
                var strDados = JSON.stringify(error);
                //alert("Erro");
                console.log(strDados||"null");
                deferred.reject(false);
            };

            return deferred.promise;
        };
    }    
})();