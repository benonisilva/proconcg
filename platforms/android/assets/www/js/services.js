angular.module('starter.services', [])

.factory('FactoryHistorico', ['$q','$http',function($q,$http) {
  // Might use a resource here that returns a JSON array
  var urlHistorico = "http://192.168.56.1:8088/Home/Historico"
  // Some fake testing data
  var historicos = [
    
    {
      id: 0,
      texto: 'texto historico',
      dataEvento: '20/11/2015',
      parecer: 'parecer'
    },
    {
      id: 2,
      texto: 'texto historico',
      dataEvento: '20/11/2015',
      parecer: 'parecer'
    },
    {
      id: 3,
      texto: 'texto historico',
      dataEvento: '20/11/2015',
      parecer: 'parecer'
    }  
    
  ];

  return {
    all: function() {
      return historicos;
    },
    remove: function(historico) {
      historicos.splice(historicos.indexOf(historico), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (historicos[i].id === parseInt(historicoId)) {
          return historicos[i];
        }
      }
      return null;
    }, 
    getHistorico : function(pesquisa){
      return $http.post(urlHistorico,pesquisa);
    }
  };
}]).factory('FactoryBuscaEndereco',function($q,$http){

        

    return {
      getEndereco : function(cep) {
        //console.log(cep);
        var url = 'http://cep.correiocontrol.com.br/'+cep+'.json'
        return $http.get(url);
        //return deferred.promise;
      }
    };
 }).factory('FactoryOpcoes', function($q,$http){

    return { 
      getOpcoes : function(tipo){

        var url = 'js/'+tipo+'.json'
        return $http.get(url);
      },

      postReclamacao : function(url,data){

          return $http.post(url,data);

      },

      postRequerente : function(url,data){
        return $http.post(url,data);
      }

    };  
 }).service('localDBService', ['$window', function($window){

      this.saveLocal = function(key,value){
        $window.localStorage[key] = value;
      };

 }]).provider('localStorageProvider', function(){

    

    this.$get = ['$window', function($window){
      return {

          getLocalStorage : function(){

              return $window.localStorage;

          }

      };

    }];

 })
;