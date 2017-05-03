(function () {
    'use strict';
    angular.module('starter.controllers')
    .controller('CodigoCtrl',CodigoCtrl);
    
    CodigoCtrl.$Inject = ['pdfDelegate'];
    
    function CodigoCtrl(pdfDelegate) {
        var vm = this;
        console.log('CodigoCtrl');
        vm.pdfUrl = 'img/codigo.pdf';

    }
})();