(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('LoginService', LoginService);
        LoginService.$inject = ['$q','$http','$timeout'];

    function LoginService($q,$http,$timeout) { 
    	var login;
        
        login = {
    		getUser : getUser
    	};

    	return login;

    	function getUser(user) {
    		console.log("LoginService.getUser: " + user);
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
    }    
})();