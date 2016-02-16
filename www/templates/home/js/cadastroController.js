(function() {
    'use strict';

    angular
        .module('starter.controllers')
        .controller('CadastroCtrl', CadastroCtrl);
        CadastroCtrl.$inject = ['$scope','$state','$stateParams','$ionicLoading','CadastroService','EnderecoService'];

    function CadastroCtrl($scope,$state,$stateParams,$ionicLoading,CadastroService,EnderecoService) { 
    	var vm = this;
    	vm.user = {};
    	vm.buscarEndereco = buscarEndereco;
    	vm.cadastraUser = cadastraUser;
        console.log($stateParams);
    	function buscarEndereco (cep) {
    		console.log("CadastroCtrl.buscarEndereco: "+cep);
    		EnderecoService.getEndereco(cep).then(fnBuscaEnderecoSuccess,fnBuscaEnderecoFail);
    	};

    	function fnBuscaEnderecoSuccess(resp){
    		showLoading("BUscando...");
    		console.log("CadastroCtrl.buscarEndereco.fnBuscaEnderecoSuccess: ");
    		console.log(resp);
    		vm.user.endereco = resp;
    	};

    	function fnBuscaEnderecoFail(resp){
    		console.log("CadastroCtrl.buscarEndereco.fnBuscaEnderecoFail: ");
    		console.log(resp);
    	};

    	function cadastraUser (user) {
    		showLoading("Salvando...");
    		console.log("CadastroCtrl.cadastraUser.fnBuscaEnderecoSuccess: ");
    		console.log(user);
    		CadastroService.save(user).then(fnSucessCadastro,fnFailCadastro);
    	};

    	function fnSucessCadastro (resp) {
    		console.log("CadastroCtrl.cadastraUser.fnSucessCadastro: ");
    		console.log(resp || "");
    		hideLoading();
    	};

    	function fnFailCadastro (resp) {
    		console.log("CadastroCtrl.cadastraUser.fnFailCadastro: ");
    		console.log(resp || "");
    		hideLoading();
    	};

    	function showLoading (text,time) {
    		$ionicLoading.show({
    		    content: 'Loading',
    		    animation: 'fade-in',
    		    showBackdrop: true,
    		    maxWidth: 200,
    		    showDelay: 0,
    		    duration:time || 5000,
    		    template:text || "..."
    		});	
    	};

    	function hideLoading () {
    		$ionicLoading.hide();	
    	};
    }	
})();