(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('EventosCtrl', EventosCtrl);
        EventosCtrl.$inject = ['$scope','EventosService','$q'];

        function EventosCtrl($scope,EventosService,$q){
        	
        	var vm = this;
        	vm.eventos = [
        		{
        			Titulo:"fasfasfasfasfasfasfasfas",
        			DataPublicacao:"01/04/2016",
        			DataInicio:"01/04/2016",
        			DataFim:"01/07/2016"
        		}
        	];

        	activate();

        	function activate() {
        	  var promises = [initEventos()];
        	    return $q.all(promises).then(function() {
        	       console.log("activate");
        	    });
        	}

        	function initEventos(){
        		return EventosService.getEventos().then(function(data){
        			//console.log(JSON.stringify(data));
        			vm.eventos = data.data;
        			return vm.eventos;
        		});
        	}

        };
})();        