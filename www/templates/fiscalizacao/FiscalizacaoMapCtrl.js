(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('FiscalizacaoMapCtrl', FiscalizacaoMapCtrl);
        FiscalizacaoMapCtrl.$inject = ['$scope'];
        document.addEventListener("deviceready", FiscalizacaoMapCtrl,false);
        
        function FiscalizacaoMapCtrl($scope){
            console.log('FiscalizacaoMapCtrl');
            $scope.closeModal = function () {
                console.log("closeModal")
                $scope.$parent.modal.hide();
            }

            var mapDiv = document.getElementById("map_canvas");

                // Initialize the map plugin
            var map = plugin.google.maps.Map.getMap(mapDiv);

                // You have to wait the MAP_READY event.
            map.on(plugin.google.maps.event.MAP_READY, onMapInit);
            console.log('deviceready');
            console.log($scope);
            

            function onMapInit(map) {
                console.log('onMapInit');
                console.log(map);
            }
        };
})();        