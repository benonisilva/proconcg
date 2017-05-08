(function() {
    'use strict';
    angular
        .module('starter.services')
        .factory('ConfigService', ConfigService);
        
        //ConfigService.$inject = ['localStorage','$http'];
         

        function ConfigService() {
            var config = {
                set : set,
                get : get
            };
            return config;

            function set(url) {
                var key = "_url";
                return;
            }

            function get() {
                return "http://187.33.231.170:8080/procon-mobile";
            }
        }

})();    