(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('FiscalizacaoMapCtrl', FiscalizacaoMapCtrl);
        FiscalizacaoMapCtrl.$inject = ['$scope'];

        function FiscalizacaoMapCtrl($scope){
            console.log('FiscalizacaoMapCtrl');
            $scope.closeModal = function () {
                console.log("closeModal")
                $scope.$parent.modal.hide();
            }
            console.log($scope);
            document.addEventListener("deviceready", function() {
                // Define a div tag with id="map_canvas"
                var mapDiv = document.getElementById("map_canvas");

                // Initialize the map plugin
                var map = plugin.google.maps.Map.getMap(mapDiv);

                // You have to wait the MAP_READY event.
                map.on(plugin.google.maps.event.MAP_READY, onMapInit);
            });

            function onMapInit(map) {
            }
        };
})();        