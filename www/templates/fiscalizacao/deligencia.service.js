(function() {
    'use strict';

    angular
        .module('starter.services')
        .service('DiligenciaService', DiligenciaService);
        DiligenciaService.$injetc = ['$q','$http','ConfigService'];
    function DiligenciaService($q,$http,ConfigService) { 

      var fiscalizacao = {};
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