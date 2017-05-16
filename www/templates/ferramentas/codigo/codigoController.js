(function () {
    'use strict';
    angular.module('starter.controllers')
    .controller('CodigoCtrl',CodigoCtrl);
    
    CodigoCtrl.$Inject = ['pdfDelegate'];
    
    function CodigoCtrl(pdfDelegate) {
        var vm = this;
        console.log('CodigoCtrl');
        vm.pdfUrl = 'http://187.33.231.170:8080/procon-mobile/Content/codigo.pdf';

    }
})();
