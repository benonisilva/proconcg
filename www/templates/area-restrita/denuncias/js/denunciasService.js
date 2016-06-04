(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('DenunciaService', DenunciaService);
        DenunciaService.$inject = ['$q','$http','$timeout','DenunciaDB'];

    function DenunciaService($q,$http,$timeout,DenunciaDB) { 
      var denuncia = {
        
        saveLocal : saveLocal,
        enviar : enviar,
        getDenunciasLocal : getDenunciasLocal,
        getDenunciasRemoto : getDenunciasRemoto,
        getDenunciaLocal : getDenunciaLocal
      
      };

      return denuncia;

        function enviar(denuncia){
            
            console.log("Denuncia.enviar: ");
            console.log(denuncia||"null");
            var url = 'http://192.168.1.107:8088/Home/Fato';

            var retVal = {
              StatusId:1,
              TipoId:1,
              DescricaoDosFatos : denuncia.DescricaoDosFatos,
              Fornecedor: {
                Cnpj : denuncia.Fornecedor.Cnpj,
                Cep : denuncia.Fornecedor.Cep,
                RazaoSocial : denuncia.Fornecedor.RazaoSocial,
                Endereco : denuncia.Fornecedor.Endereco,
                Telefone : denuncia.Fornecedor.Telefone,
                Complemento : denuncia.Fornecedor.Complemento,
                Bairro : denuncia.Fornecedor.Bairro,
                IncricaoEstadual : denuncia.Fornecedor.IncricaoEstadual
              }
            };

            var deferred = $q.defer();
            $http.post(url, retVal).then(_successCallback, _errorCallback);

            function _successCallback(data){
                console.log("_successCallback");
                console.log(data||"null");
                deferred.resolve(true);
            };

            function _errorCallback(data){
                console.log("_errorCallback");
                console.log(data||"null");
                deferred.reject(false);
            };

            return deferred.promise;
        };

       function saveLocal(denuncia){
           
           console.log("Denuncia.saveLocal: ");
           console.log(denuncia||"null");

           var deferred = $q.defer();
           DenunciaDB.insert(denuncia);

           function _successCallback(data){
               console.log("_successCallback");
               console.log(data||"null");
               
               deferred.resolve(true);
           };

           function _errorCallback(data){
               console.log("_errorCallback");
               console.log(data||"null");
               deferred.reject(false);
           };

           return deferred.promise;
       };

       function getDenunciasLocal(){
        return DenunciaDB.selectAll();
       };

       function getDenunciasRemoto(){
          console.log("DenunciaService.getDenunciasRemoto: ");
          var url = 'http://192.168.1.51:8088/Home/Denuncias';
          
          return $http.get(url).then(_successCallback, _errorCallback).catch(_getFailed);

          function _successCallback(response){
               console.log("_successCallback");
               console.log(response||"null");
               alert(response||"null");
               return response.data;
           };

           function _errorCallback(data){
               console.log("_errorCallback");
               console.log(data||"null");
               alert(data||"null");
               
           };

          
          function _getFailed(error) {
            alert(error||"null");
            //logger.error('XHR Failed for getAvengers.' + error.data);
          };

          
       };

       function getDenunciaLocal(id){
          return DenunciaDB.get(id);
       };
    }    
})();