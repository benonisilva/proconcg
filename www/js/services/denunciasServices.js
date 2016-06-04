angular.module('starter.services')

.service('DenunciasService', function(DenunciaDB,$q,$timeout) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  this.denuncias = [{
    id: 0,
    empresa: 'Oi/Telemar',
    ultimoParecer: 'Pendente',
    data: '28/07/16',
    historico:[{
      situacao:'Enviado',
      local:'Sistema de Denuncias',
      dataUltimaVisualizacao:'28/07/16'
    }],
    enviada: true
  }, {
    id: 1,
    empresa: 'Tim',
    ultimoParecer: 'Procedente',
    data: '28/07/16',
    historico:[{
      situacao:'Enviado',
      local:'Sistema de Denuncias',
      dataUltimaVisualizacao:'28/07/16'
    }],
    enviada: true
  }, {
    id: 2,
    empresa: 'Casas Bahia',
    ultimoParecer: 'Enviado',
    data: '28/07/16',
    historico:[{
      situacao:'Enviado',
      local:'Sistema de Denuncias',
      dataUltimaVisualizacao:'28/07/16'
    }],
    enviada: false
  }, {
    id: 3,
    empresa: 'Shopping Iguatemi',
    ultimoParecer: 'Parecer',
    data: '28/07/16',
    historico:[{
      situacao:'Enviado',
      local:'Sistema de Denuncias',
      dataUltimaVisualizacao:'28/07/16'
    }],
    enviada: false
  }, {
    id: 4,
    empresa: 'BlaBlaBla',
    ultimoParecer: 'Indo Bem',
    data: '28/07/16',
    historico:[{
      situacao:'Enviado',
      local:'Sistema de Denuncias',
      dataUltimaVisualizacao:'28/07/16'
    }],
    enviada: false
  }];

  this.get = function(denunciasId){
    for (var i = 0; i < this.denuncias.length; i++) {
        if (this.denuncias[i].id === parseInt(denunciasId)) {
          return this.denuncias[i];
        }
      }
      return null;
  };
  
  this.add = function(denuncia){
      this.denuncias.push(denuncia);
  };

  this.addLocal = function(denuncia){
    DenunciaDB.insert(denuncia);
  };

  this.removeLocal = function(denuncia){
    DenunciaDB.delete(denuncia);
  };

  this.allLocal = function(){
    var defer;
    var retVal = {};
    defer = $q.defer();
    retVal = DenunciaDB.selectAll();
    $timeout(function() {
      defer.resolve(retVal);
    }, 50);
    
    return defer.promise;
  };

  this.getLocal = function(id){
    var defer;
    var retVal = {};
    defer = $q.defer();
    retVal = DenunciaDB.get(id);
    $timeout(function() {
      defer.resolve(retVal);
    }, 50);

    return defer.promise;
  };  

});