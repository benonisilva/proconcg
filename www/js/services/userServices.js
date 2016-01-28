(function() {
    'use strict';

    angular
        .module('stater.services.user',[])
        .factory('UserService', UserService);
        UserService.$injetc = ['localStorage'];
    function UserService(localStorage) { 

      var setUser = function(user_data) {
        localStorage.set('user',user_data);
      };

      var getUser = function(){
        return localStorage.get('user');
      };

      return {
        getUser: getUser,
        setUser: setUser
      };
    }
})();