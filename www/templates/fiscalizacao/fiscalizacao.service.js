(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('FiscalizacaoService', FiscalizacaoService);
        FiscalizacaoService.$injetc = ['$q','$http','ConfigService'];
    function FiscalizacaoService($q,$http,ConfigService) { 

      var fiscalizacao = {
        getFiscalizacao : getFiscalizacao,
        getProvas : getImages,
        finalizar : finalizar,
        mudarAgente : mudarAgente,
        getAgentes : getAgentes
      }

      return fiscalizacao;

      function mudarAgente (autoId,agenteId) {
         console.log(agenteId);
         var q = $q.defer();
         var url = ConfigService.get() + 'Auto/MudarAgente?autoId=' + autoId +"&agenteId="+agenteId;
         $http.get(url).then(_successCallback,_errorCallback);
         function _successCallback(data){
          q.resolve(data);
        }

        function _errorCallback(err){
            q.reject(err);
        }
          return q.promise;  
      }

      function getAgentes () {
        var q = $q.defer();
        var url = ConfigService.get() + 'Agente/Listar';
        $http.get(url).then(_successCallback,_errorCallback);
        function _successCallback(data){
          q.resolve(data);
        }

        function _errorCallback(err){
            q.reject(err);
        }
          return q.promise;  
      }

      function finalizar(dados) {
         var url = ConfigService.get() + 'Auto/FinalizarDenuncia';
         console.log(dados);
         return $http.post(url,dados);
      }

      function getImages(fatoId){
        var q = $q.defer();
        var url = ConfigService.get() + 'Fato/Provas?fatoId=' + fatoId;
        $http.get(url)
          .then(_successCallback, _errorCallback).catch(function(e){
            console.log(e || "catch getImages error");
        });

        function _successCallback(data){
          q.resolve(data);
        }

        function _errorCallback(err){
            q.reject(err);
        }

        return q.promise;  
      }

      function getFiscalizacao(){
        var q = $q.defer();
        var url = ConfigService.get() + 'Auto/Listar'
        $http.get(url)
          .then(_successCallback, _errorCallback).catch(function(e){
            console.log(e || "catch getFiscalizacao error");
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