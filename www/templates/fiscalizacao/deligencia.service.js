(function() {
    'use strict';

    angular
        .module('starter.services')
        .service('DiligenciaService', DiligenciaService);
        DiligenciaService.$injetc = ['$q','$http','ConfigService'];
    function DiligenciaService($q,$http,ConfigService) { 

      var fiscalizacao = {};
      var consumidor = {};
      
      this.getConsumidor = function (id) {
        return _setConsumidor(id);
      }

      function _setConsumidor(id){
        var q = $q.defer();
        var url = ConfigService.get() + 'Fato/Consumidor?fatoId='+id;
        $http.get(url)
          .then(_successCallback, _errorCallback).catch(function(e){
            console.log(e || "catch getFiscalizacao error");
        });

        function _successCallback(data){
          consumidor = data.data.consumidor;
          q.resolve(consumidor);
        }

        function _errorCallback(err){
            q.reject(false);
        }

        return q.promise;  
      }


      this.getFiscalizacao = function (id) {
        return _setFiscalizacao(id);
      }

      function _setFiscalizacao(id){
        var q = $q.defer();
        var url = ConfigService.get() + 'Auto/?id='+id;
        $http.get(url)
          .then(_successCallback, _errorCallback).catch(function(e){
            console.log(e || "catch getFiscalizacao error");
        });

        function _successCallback(data){
          fiscalizacao = data.data.auto;
          q.resolve(fiscalizacao);
        }

        function _errorCallback(err){
            q.reject(false);
        }

        return q.promise;  
      }
      
    };

})();