(function () {
    'use strict';
    angular.module('starter.controllers')
    .controller('InfoCtrl',InfoCtrl);
    function InfoCtrl() {
        var vm = this;
        vm.src = 'https://www.youtube.com/embed/watch?v=B7Zo1yVoG1E?html5=1';

    }
})();