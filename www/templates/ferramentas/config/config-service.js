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
                return "http://localhost:1119";
            }
        }

})();    