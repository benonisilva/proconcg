(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('LoginService', LoginService);
        LoginService.$inject = ['$q','$http','$timeout','constantConfig'];

    function LoginService($q,$http,$timeout,constantConfig) { 
    	var login;
        
        login = {
    		getUser : getUser
    	};

    	return login;

        function getUser(login){
            
            console.log("LoginService.getUser: ");
            console.log(login||"null");
            //var headers = {'Access-Control-Allow-Origin:':'http://localhost/*','Authorization': 'Token token=xxxxYYYYZzzz'};
            var url = constantConfig.url+'/Home/Login';

            var deferred = $q.defer();
            $http.post(url,login)
            .then(_successCallback, _errorCallback).catch(function(e){
                console.log(e || "catch login error");
            });

            function _successCallback(data){
                var strData = JSON.stringify(data);
                console.log("_successCallback");
                console.log(strData||"null");
                if(data.data.success===true){
                    console.log("LOGIN CERTO");
                    var user = window.localStorage.getItem('_user');
                    var userObj = JSON.parse(user);
                    userObj.ativo = true;
                    window.localStorage.setItem('_user',JSON.stringify(userObj));
                    deferred.resolve(true);
                    //alert(data||"null");
                }else{
                    console.log("login incorrect");
                    deferred.resolve(false);
                }
                
            };

            function _errorCallback(data){
                var strFail = JSON.stringify(data);
                console.log("_errorCallback");
                console.log(strFail||"null");
                //alert(strFail||"null");
                deferred.reject(false);
            };

            return deferred.promise;
        };
    }    
})();