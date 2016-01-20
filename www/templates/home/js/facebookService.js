(function() {
    'use strict';

    angular
        .module('starter.servives')
        .factory('FacebookService', FacebookService);
        FacebookService.$inject = ['$q'];

    function FacebookService() { 
    	var profile {
    		getInfo: getInfo,
    		getLoginStatus :getLoginStatus
    	};

    	return profile;

    	function getInfo(authResponse){
    	    var info = $q.defer();

    	    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
    	      function (response) {
    					console.log("FacebookService");
    					console.log("getInfo");
    					console.log("Sucess");
    					console.log(response);
    	        info.resolve(response);
    	      },
    	      function (response) {
    					console.log("FacebookService");
    					console.log("getInfo");
    					console.log("Sucess");
    					console.log(response);
    	        info.reject(response);
    	      }
    	    );
    	    return info.promise;
    	};
    };

    function getLoginStatus (fnSuccess,fnFail) {
    	// body...
    };
})();