angular.module('stater.services.user', [])

.service('UserService', function(localStorage) {

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
});