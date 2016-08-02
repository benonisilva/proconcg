(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('EventosService', EventosService);
        EventosService.$injetc = ['$q','$http','constantConfig'];
    function EventosService($q,$http,constantConfig) { 

      var eventos = {
        getEventos : getEventos
      }

      return eventos;

      function getEventos(){
        var q = $q.defer();
        var url = constantConfig.url + '/Eventos/Index'
        $http.get(url)
          .then(_successCallback, _errorCallback).catch(function(e){
            console.log(e || "catch login error");
        });

        function _successCallback(data){
          q.resolve(data);
        }

        function _errorCallback(err){
            q.reject(err);
        }

        return q.promise;  
      }
      
    };

})();