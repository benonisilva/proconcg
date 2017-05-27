(function () {
    'use strict';
    angular.module('starter.controllers')
    .controller('CodigoCtrl',CodigoCtrl);
    
    CodigoCtrl.$Inject = ['pdfDelegate'];
    
    function CodigoCtrl(pdfDelegate) {
        var vm = this;
        console.log('CodigoCtrl');
        vm.pdfUrl = 'http://189.80.19.75:8080/procon-mobile/Content/codigo.pdf';

    }
})();
