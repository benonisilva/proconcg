(function() {
    'use strict';

    angular
        .module('starter.services')
        .factory('DenunciaService', DenunciaService);
        DenunciaService.$inject = ['$q','$http','$timeout',
        'DenunciaLocalDBService','$cordovaFileTransfer','constantConfig'];

    function DenunciaService($q,$http,$timeout,
      DenunciaLocalDBService,$cordovaFileTransfer,constantConfig) { 
      
      var denuncia = {
        
        saveLocal : saveLocal,
        enviar : enviar,
        getDenunciasLocal : getDenunciasLocal,
        getDenunciasRemoto : getDenunciasRemoto,
        getDenunciaLocal : getDenunciaLocal,
        updateLocal : updateLocal
      
      };

      return denuncia;

      function updateLocal(denuncia){
        DenunciaLocalDBService.update(denuncia);
      }

      function enviar(denuncia){
            
            console.log("Denuncia.enviar: ");
            console.log(denuncia||"null");
            var url = constantConfig.url+'/Fato/Adicionar';
            var idLocal = denuncia.Id;
            var tipos = [{TipoFatoId:1,Nome:"Denúncia"},{TipoFatoId:2,Nome:"Reclamação"}];
            
            var retVal = {
              Tipo:tipos[denuncia.TipoId -1],
              Descricao : denuncia.Descricao,
              Data: denuncia.Data,
              Empresa: {
                Cnpj : denuncia.Empresa.Cnpj,
                Cep : denuncia.Empresa.Cep,
                RazaoSocial : denuncia.Empresa.RazaoSocial,
                IncricaoEstadual : denuncia.Empresa.IncricaoEstadual,
                Endereco : {
                         Rua : denuncia.Empresa.Endereco.Rua,
                         Telefone : denuncia.Empresa.Endereco.Telefone,
                         Complemento : denuncia.Empresa.Endereco.Complemento,
                         Bairro : denuncia.Empresa.Endereco.Bairro
                }
              },
              Anexos : denuncia.Anexos
            };

            var deferred = $q.defer();
            $http.post(url, retVal).then(_successCallback, _errorCallback);

            function _successCallback(data){
                var strData = JSON.stringify(data);
                console.log("Service:_successCallback");
                console.log(strData||"null");
                if(idLocal){
                  DenunciaLocalDBService.deleta(idLocal);
                }
                //_uploadFiles(data.data.FatoId,retVal.Anexos);
                deferred.resolve(true);
            };

            function _errorCallback(data){
                var strError = JSON.stringify(data);
                console.log("Service:_errorCallback");
                console.log(strError||"null");
                deferred.reject(false);
            };

            return deferred.promise;
      };

      function _uploadFiles(id,arquivos) {
        console.log("_uploadFiles: " + id);

        var server = constantConfig.url+'/Fato/AdicionarAnexo/'+id;
        var promisses = [];
        var options = {
          
          fileKey:'arquivo',
          fileName:"arquivoTeste",
          params:{fatoId:id}

        };
        //var filePath = arquivos[0];
        for(var i=0; arquivos.length > i; i++ ){
          options.fileName = arquivos[i].split("/").pop();
          promisses.push($cordovaFileTransfer.upload(server, arquivos[i], options));
        }
        //$cordovaFileTransfer.upload(server, filePath, options).then(_win,_fail,_progress);
        return $q.all(promisses).then(_win,_fail,_progress);
        
        function _win(data){
          console.log("_uploadFiles:_win");
          var strdata = JSON.stringify(data);
          console.log(strdata);
        };

        function _fail(error){
          console.log("_uploadFiles:_fail");
          var strdata = JSON.stringify(error);
          console.log(strdata);
        };

        function _progress(res){
          console.log("res");
          console.log(res);

        }; 
      };

      function saveLocal(denuncia){
           
           console.log("Denuncia.saveLocal: ");
           console.log(denuncia||"null");

           var deferred = $q.defer();
           DenunciaLocalDBService.insert(denuncia);

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
        return DenunciaLocalDBService.getAll();
      };

      function getDenunciasRemoto(){
          console.log("DenunciaService.getDenunciasRemoto: ");
          var url = constantConfig.url+'/Home/Denuncias';
          
          return $http.get(url).then(_successCallback, _errorCallback).
            catch(_getFailed);

          function _successCallback(response){
               var strResp = JSON.stringify(response);
               console.log("getDenunciasRemoto:_successCallback");
               console.log(strResp||"null");
               return response.data;
           };

           function _errorCallback(data){
               var strResp = JSON.stringify(data);
               console.log("getDenunciasRemoto:_errorCallback");
               console.log(strResp||"null");
           };

          
          function _getFailed(_getFailed) {
            var strResp = JSON.stringify(error);
            console.log("_errorCallback");
            console.log(strResp||"null");
          };
      };

      function getDenunciaLocal(id){
          var defer = $q.defer();
          var denuncia;
          $timeout(function(){
            denuncia = DenunciaLocalDBService.get(id);
            console.log("denuncia");
            console.log(JSON.stringify(denuncia));
            defer.resolve(denuncia);
          },50);
          return defer.promise;

      };
    }    
})();