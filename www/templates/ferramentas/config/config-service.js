(function() {
    'use strict';
    angular
        .module('starter.services')
        .factory('ConfigService', ConfigService);
        
        ConfigService.$inject = ['localStorage','$http'];
         

        function ConfigService(localStorage,$http) {
            var config = {
                set : set,
                get : get
            };
            return config;

            function set(url) {
                var key = "_url";
                url = localStorage.set(key,url);
                return;
            }

            function get() {
                return localStorage.get('_url');
            }
        }

})();    