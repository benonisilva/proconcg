(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('FacebookService', FacebookService);
        FacebookService.$inject = ['$q','UserService'];

    function FacebookService($q,UserService) { 
    	var profile = {
            getInfo : getInfo,
            getLoginStatus : getLoginStatus
        };

        return profile;

        function getLoginStatus() {
            console.log("FacebookService.getLoginStatus");
            var info = $q.defer();

            facebookConnectPlugin.getLoginStatus(function(resp){
              if(resp.status === 'connected'){
                console.log("Conectado");
                return getInfo(resp.authResponse);
              }
              else{
                  console.log("Conectaando...");
                  facebookConnectPlugin.login(['email', 'public_profile'], function(resp){
                      console.log("Conectaando...");
                      return getInfo(resp.authResponse);
                  }, function(resp){

                  });
              }
            },function(resp){
              console.log("erro getLoginStatus");
            });
        };

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

        function _fnSuccess(resp) {
          if(resp.status === 'connected'){
            console.log("Conectado");
            return getInfo(resp.authResponse);
          }
          else{
            console.log("Conectando...")
            facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
          }
          
        };

        function _fnFail(resp) {
          console.log("get status fail");
        };

        function fbLoginSuccess(resp){
          return getInfo(resp.authResponse);
        };
    }  

})();