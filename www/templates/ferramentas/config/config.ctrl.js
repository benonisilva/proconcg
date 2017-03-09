(function () {
    'use strict';
    angular.module('starter.controllers')
    .controller('ConfigCtrl',ConfigCtrl);
    ConfigCtrl.$inject = ['ConfigService'];
    function ConfigCtrl(ConfigService) {
        var vm = this;
        vm.server = 'http://proconwebapp-dev.sa-east-1.elasticbeanstalk.com';

        vm.setup = setup;

        function setup(server) {
            ConfigService.set(server);
            console.log(server);
        }
    }
})();