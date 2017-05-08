(function () {
    'use strict';
    angular.module('starter.controllers')
    .controller('InfoCtrl',InfoCtrl);
    InfoCtrl.$Inject = ['pdfDelegate'];
    function InfoCtrl(pdfDelegate) {
        var vm = this;
        console.log('InfoCtrl');
        vm.pdfUrl = 'img/manual.pdf';
    }
})();