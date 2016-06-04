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

    	function _getUser(user) {
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

        function getUser(login){
            
            console.log("LoginService.getUser: ");
            console.log(login||"null");
            //var headers = {'Access-Control-Allow-Origin:':'http://localhost/*','Authorization': 'Token token=xxxxYYYYZzzz'};
            var url = 'http://189.71.6.16:8088/Home/Login';

            var deferred = $q.defer();
            $http.post(url,login)
            .then(_successCallback, _errorCallback).catch(function(e){
                console.log(e || "catch login error");
            });

            function _successCallback(data){
                console.log("_successCallback");
                console.log(data||"null");
                if(data.data.success===true){
                    console.log("login correct");
                    deferred.resolve(true);
                    alert(data||"null");
                }else{
                    console.log("login incorrect");
                    deferred.resolve(false);
                }
                
            };

            function _errorCallback(data){
                console.log("_errorCallback");
                console.log(data||"null");
                alert(data||"null");
                deferred.reject(false);
            };

            return deferred.promise;
        };
    }    
})();