(function() {
    'use strict';

    angular
        .module('starter.servives')
        .factory('LoginService', LoginService);
        CadastroService.$inject = ['$q','$http','$timeout'];

    function LoginService($q,$http,$timeout) { 
    	var login {
    		getUser : getUser
    	};

    	return login;

    	function getUser(user) {
    		var deferred = $q.defer();
    		//fake
    		$timeout(function(){
    			if(user.email==="user@email.com" && user.password==="1"){
    				deferred.resolve(true);
    			}else{
    				deferred.reject(false);
    			}
    		},5000);
    		return deferred.promise;
    	};
})();