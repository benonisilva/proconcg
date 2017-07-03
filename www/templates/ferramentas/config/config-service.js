(function() {
    'use strict';
    angular
        .module('starter.services')
        .factory('ConfigService', ConfigService);         

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
                return "http://189.80.19.75:8080/procon-admin/";
            }
        }

})();
